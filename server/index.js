import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/database.js';

connectDB();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('the backend running!');
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running at localhost:${PORT}`));