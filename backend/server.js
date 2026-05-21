/**
 * CodeDNA
 * server.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const initSocket = require('./sockets');
const { initCleanupJob } = require('./utils/cleanup');
const errorHandler = require('./middleware/errorHandler');
const { authLimiter, apiLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');
const notificationRoutes = require('./routes/notifications');
const storyRoutes = require('./routes/stories');
const groupRoutes = require('./routes/groups');
const eventRoutes = require('./routes/events');
const searchRoutes = require('./routes/search');
const reelRoutes = require('./routes/reels');

const app = express();
const server = require('http').createServer(app);
const io = initSocket(server);

app.set('io', io);

connectDB();
initCleanupJob();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(apiLimiter);

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));
console.log(`📂 Serving static files from: ${uploadsPath}`);

const conversationRoutes = require('./routes/conversations');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');
const aiRoutes = require('./routes/ai');
const mindbotRoutes = require('./routes/mindbot');
const highlightRoutes = require('./routes/highlights');
const discussionRoutes = require('./routes/discussions');
const anonymousRoutes = require('./routes/anonymous');
const articleRoutes = require('./routes/articles');
const playlistRoutes = require('./routes/playlists');
const giftRoutes = require('./routes/gifts');
const challengeRoutes = require('./routes/challenges');
const memoryRoutes = require('./routes/memories');
const analyticsRoutes = require('./routes/analytics');


app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mindbot', mindbotRoutes);
app.use('/api/anonymous', anonymousRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/data-export', require('./routes/dataExport'));
app.use('/api/analytics', analyticsRoutes);
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/reels', reelRoutes);
app.use('/api/wallet', require('./routes/wallet'));


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MindBook API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n🚀 MindBook API Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
