const express = require('express');
const cors = require('cors');
const dsaRoute = require('./routes/dsaRoute');
const debuggingRoute = require('./routes/debuggingRoute');
const sqlRoute = require('./routes/sqlRoute');

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());

app.use('/api/dsa', dsaRoute);
app.use('/api/debugging', debuggingRoute);
app.use('/api/sql', sqlRoute);

app.get('/', (req, res) => {
  res.send("Welcome to the Coding Platform API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
