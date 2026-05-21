/**
 * errorHandler — global Express error handler.
 * Register as the LAST middleware in server.js:
 *   app.use(errorHandler);
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ [ErrorHandler]', err.message || err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validation error', errors: messages });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ message: `${field} already exists` });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large' });
  }

  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
