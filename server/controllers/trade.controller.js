import TradeEntry from '../model/TradeEntry.js';

// Create new trade
export const createTrade = async (req, res) => {
  try {
    const trade = new TradeEntry(req.body);
    const savedTrade = await trade.save();
    res.status(201).json(savedTrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trades
export const getAllTrades = async (req, res) => {
  try {
    const trades = await TradeEntry.find().sort({ createdAt: -1 });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trade by ID
export const getTradeById = async (req, res) => {
  try {
    const trade = await TradeEntry.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a trade
export const updateTrade = async (req, res) => {
  try {
    const trade = await TradeEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a trade
export const deleteTrade = async (req, res) => {
  try {
    const trade = await TradeEntry.findByIdAndDelete(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    res.status(200).json({ message: 'Trade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
