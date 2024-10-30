import express from 'express';
import cors from 'cors';
import validateRoute from './routes/validateRoute.js';

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.use('/api/validate', validateRoute);

app.get('/', (req, res) => {
    res.send("The Coding Auction!");
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
