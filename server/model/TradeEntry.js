import mongoose from 'mongoose';

const tradeEntrySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    session: { type: String, required: true },
    pair: { type: String, required: true },
    direction: { type: String, enum: ['BUY', 'SELL'], required: true },
    setupType: { type: String },
    entryType: { type: String },
    timeFrameUsed: { type: String },
    entryPrice: { type: Number },
    exitPrice: { type: Number },
    pipsLC: { type: Number },
    pnl: { type: Number },
    riskPerTrade: { type: Number },
    rFactor: { type: Number },
    tradeType: { type: String },
    entryModel: { type: String },
    confluences: { type: String },
    rulesFollowed: { type: Boolean },
    trailWorked: { type: Boolean },
    imagePost: { type: String }, // Not sure yet about it guys!!
    notes: { type: String },
    actions: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('TradeEntry', tradeEntrySchema);
