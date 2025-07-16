import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/database.js';
import tradeRoutes from './routes/trade.routes.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('the backend running!');
});
//route to create trade
app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running at localhost:${PORT}`));