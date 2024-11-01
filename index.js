const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const dsaRoute = require('./routes/dsaRoute');
const debuggingRoute = require('./routes/debuggingRoute');
const sqlRoute = require('./routes/sqlRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/dsa', dsaRoute);
app.use('/api/debugging', debuggingRoute);
app.use('/api/sql', sqlRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
