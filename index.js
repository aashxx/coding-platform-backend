const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dsaRoute = require('./routes/dsaRoute');
const debuggingRoute = require('./routes/debuggingRoute');
const sqlRoute = require('./routes/sqlRoute');
const webRoute = require('./routes/webRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/dsa', dsaRoute);
app.use('/api/debugging', debuggingRoute);
app.use('/api/sql', sqlRoute);
app.use('/api/web', webRoute);

// Root endpoint
app.get('/', (req, res) => {
    res.send("Welcome to the Coding Platform Backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
