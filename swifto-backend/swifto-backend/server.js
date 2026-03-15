require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const http       = require('http');
const { Server } = require('socket.io');
const connectDB  = require('./config/db');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

connectDB();

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/drivers',  require('./routes/drivers'));
app.use('/api/tracking', require('./routes/tracking'));
app.use('/api/admin',    require('./routes/admin'));

app.get('/', (req, res) => {
  res.json({ message: 'SWIFTO API is live!', version: '1.0.0' });
});

// Socket.io — Live GPS Tracking
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Driver location bhejta hai
  socket.on('driver:location', (data) => {
    const { trackingId, lat, lng, address } = data;
    console.log(`Location update — ${trackingId}:`, lat, lng);
    // Saare customers ko broadcast karo jo ye tracking dekh rahe hain
    io.emit(`tracking:${trackingId}`, { lat, lng, address, time: new Date() });
  });

  // Driver tracking room join karta hai
  socket.on('join:tracking', (trackingId) => {
    socket.join(trackingId);
    console.log(`Joined tracking room: ${trackingId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// io ko routes mein use karne ke liye
app.set('io', io);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on port ' + PORT));