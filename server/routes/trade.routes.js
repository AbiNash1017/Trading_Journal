import express from 'express'
import {
    createTrade, 
    getAllTrades,
    getTradeById,
    updateTrade,
    deleteTrade
} from '../controllers/trade.controller.js'


const tradeRouter = express.Router();

tradeRouter.post('/create-trade', createTrade);

tradeRouter.get('/get-all-trades', getAllTrades);

tradeRouter.get('/get-trade/:id', getTradeById);

tradeRouter.put('/update-trade/:id', updateTrade);

tradeRouter.delete('/delete/:id', deleteTrade);

export default tradeRouter;
