export interface TradeEntry {
  id: string;
  date: string;
  time: string;
  session: string;
  pair: string;
  buySell: string;
  setupType: string;
  entryType: string;
  timeFrameUsed: string;
  trailWorked: string;
  imageOfPlay: string;
  linkToPlay: string;
  entryPrice: number | null;
  exitPrice: number | null;
  pipsLostCaught: number | null;
  pnl: number | null;
  riskPerTrade: number | null;
  rFactor: number | null;
  typeOfTrade: string;
  entryModel: string;
  confluences: string;
  rulesFollowed: string;
  tfUsed: string;
  fearToGreed: number;
  fomoRating: number;
  executionRating: number;
  imagePosting: string;
  notes: string;
}

export const DROPDOWN_OPTIONS = {
  sessions: ['NY', 'London', 'Pre NY', 'Asian', 'Frankfurt'],
  pairs: ['GBP/JPY', 'EUR/USD', 'USD/JPY', 'GBP/USD', 'EUR/GBP', 'AUD/USD', 'USD/CAD', 'NZD/USD'],
  buySell: ['Buy', 'Sell'],
  setupTypes: ['BO and Retest', 'Fast Trap', 'Double Top', 'Double Bottom', 'Fast Trap O', 'Trend Continuation', 'Reversal'],
  entryTypes: ['Current H/L', 'Previous H/L', 'Market', 'Limit'],
  timeFrames: ['Big C', 'DCC', '15M', '5M', '1M', 'H1', 'H4', 'D1'],
  trailWorked: ['YES', 'NO', 'Partial'],
  typeOfTrade: ['Scalp', 'Swing', 'Position', 'Day Trade'],
  entryModels: ['Breakout', 'Pullback', 'Reversal', 'Momentum'],
  rulesFollowed: ['All', 'Partial', 'None', 'Modified'],
  imagePosting: ['Posted', 'Not Posted', 'Pending']
};