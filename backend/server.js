const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://fagaruu2.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Explicitly handle preflight for all routes
app.options('*', cors());

app.use(express.json());
app.use(morgan('dev'));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => { console.error('❌ MongoDB error:', err); process.exit(1); });

// ─── Routes ───────────────────────────────────────────────────────────────────
const responseRoutes = require('./routes/responseRoutes');
app.use('/api/responses', responseRoutes);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Serveur FAGARUU sur http://localhost:${PORT}`));
}

module.exports = app;
