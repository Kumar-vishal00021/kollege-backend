const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend.vercel.app'  // Restrict to your frontend URL in prod
    : '*',  // Allow all in dev
  methods: ['GET'],  // Only GET needed for these APIs
}));
app.use(morgan('dev'));  // Logging
app.use(express.json());  // Parse JSON bodies if needed in future

// Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Root Route for Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});