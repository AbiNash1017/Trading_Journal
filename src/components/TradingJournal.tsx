import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Download, Upload, Trash2, BarChart3, TrendingUp, Calculator, Save, CheckCircle, Brain } from 'lucide-react';
import { TradeEntry, DROPDOWN_OPTIONS } from '../types';
import { ExcelCell } from './ExcelCell';
import { ExcelRatingCell } from './ExcelRatingCell';
import { DateTimeCell } from './DateTimeCell';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialTrade: Omit<TradeEntry, 'id'> = {
  date: new Date().toISOString().split('T')[0], // Use ISO format for storage
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  session: '',
  pair: '',
  buySell: '',
  setupType: '',
  entryType: '',
  timeFrameUsed: '',
  trailWorked: '',
  imageOfPlay: '',
  linkToPlay: '',
  entryPrice: null,
  exitPrice: null,
  pipsLostCaught: null,
  pnl: null,
  riskPerTrade: null,
  rFactor: null,
  typeOfTrade: '',
  entryModel: '',
  confluences: '',
  rulesFollowed: '',
  tfUsed: '',
  fearToGreed: 5,
  fomoRating: 5,
  executionRating: 5,
  imagePosting: '',
  notes: ''
};

const COLUMN_FIELDS: (keyof TradeEntry)[] = [
  'date', 'time', 'session', 'pair', 'buySell', 'setupType', 'entryType', 'timeFrameUsed',
  'entryPrice', 'exitPrice', 'pipsLostCaught', 'pnl', 'riskPerTrade', 'rFactor',
  'typeOfTrade', 'entryModel', 'confluences', 'rulesFollowed', 'trailWorked',
  'imagePosting', 'notes'
];

export const TradingJournal: React.FC = () => {
  // Use local storage hook for persistent data
  const [trades, setTrades] = useLocalStorage<TradeEntry[]>('trading-journal-trades', []);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [psychTrade, setPsychTrade] = useState<TradeEntry | null>(null);

  // Show save indicator whenever trades change
  useEffect(() => {
    if (trades.length > 0) {
      setLastSaved(new Date());
      setShowSaveIndicator(true);
      
      // Hide the indicator after 2 seconds
      const timer = setTimeout(() => {
        setShowSaveIndicator(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [trades]);

  const addNewTrade = () => {
    const newTrade: TradeEntry = {
      ...initialTrade,
      id: Date.now().toString()
    };
    setTrades([...trades, newTrade]);
  };

  const updateTrade = useCallback((id: string, field: keyof TradeEntry, value: any) => {
    setTrades(trades => trades.map(trade => 
      trade.id === id ? { ...trade, [field]: value } : trade
    ));
  }, [setTrades]);

  const deleteTrade = (id: string) => {
    setTrades(trades.filter(trade => trade.id !== id));
    setSelectedCell(null);
    setEditingCell(null);
  };

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell(null);
  };

  const handleStartEdit = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell({ row, col });
  };

  const handleStopEdit = () => {
    setEditingCell(null);
  };

  const handleNavigate = useCallback((direction: 'up' | 'down' | 'left' | 'right' | 'tab' | 'enter') => {
    if (!selectedCell) return;

    let newRow = selectedCell.row;
    let newCol = selectedCell.col;

    switch (direction) {
      case 'up':
        newRow = Math.max(0, selectedCell.row - 1);
        break;
      case 'down':
      case 'enter':
        newRow = Math.min(trades.length - 1, selectedCell.row + 1);
        break;
      case 'left':
        newCol = Math.max(0, selectedCell.col - 1);
        break;
      case 'right':
      case 'tab':
        newCol = Math.min(COLUMN_FIELDS.length - 1, selectedCell.col + 1);
        break;
    }

    setSelectedCell({ row: newRow, col: newCol });
    setEditingCell(null);
  }, [selectedCell, trades.length]);

  // Global keyboard handler
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      // Only handle if not focused on an input
      if (document.activeElement?.tagName === 'INPUT') return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          const trade = trades[selectedCell.row];
          const field = COLUMN_FIELDS[selectedCell.col];
          if (trade && field !== 'id') {
            updateTrade(trade.id, field, field.includes('Rating') || field === 'fearToGreed' ? 5 : null);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedCell, trades, updateTrade]);

  const getCellType = (field: keyof TradeEntry): 'text' | 'number' | 'dropdown' | 'date' | 'time' => {
    if (field === 'date') return 'date';
    if (field === 'time') return 'time';
    if (['entryPrice', 'exitPrice', 'pipsLostCaught', 'pnl', 'riskPerTrade', 'rFactor'].includes(field)) {
      return 'number';
    }
    if (['session', 'pair', 'buySell', 'setupType', 'entryType', 'timeFrameUsed', 'trailWorked', 'typeOfTrade', 'entryModel', 'rulesFollowed', 'imagePosting'].includes(field)) {
      return 'dropdown';
    }
    return 'text';
  };

  const getDropdownOptions = (field: keyof TradeEntry): string[] => {
    switch (field) {
      case 'session': return DROPDOWN_OPTIONS.sessions;
      case 'pair': return DROPDOWN_OPTIONS.pairs;
      case 'buySell': return DROPDOWN_OPTIONS.buySell;
      case 'setupType': return DROPDOWN_OPTIONS.setupTypes;
      case 'entryType': return DROPDOWN_OPTIONS.entryTypes;
      case 'timeFrameUsed': return DROPDOWN_OPTIONS.timeFrames;
      case 'trailWorked': return DROPDOWN_OPTIONS.trailWorked;
      case 'typeOfTrade': return DROPDOWN_OPTIONS.typeOfTrade;
      case 'entryModel': return DROPDOWN_OPTIONS.entryModels;
      case 'rulesFollowed': return DROPDOWN_OPTIONS.rulesFollowed;
      case 'imagePosting': return DROPDOWN_OPTIONS.imagePosting;
      default: return [];
    }
  };

  const getColumnHeader = (field: keyof TradeEntry): string => {
    const headers: Record<keyof TradeEntry, string> = {
      id: 'ID',
      date: 'Date',
      time: 'Time',
      session: 'Session',
      pair: 'Pair',
      buySell: 'Buy/Sell',
      setupType: 'Setup Type',
      entryType: 'Entry Type',
      timeFrameUsed: 'TF Used',
      trailWorked: 'Trail Worked',
      imageOfPlay: 'Image of Play',
      linkToPlay: 'Link to Play',
      entryPrice: 'Entry Price',
      exitPrice: 'Exit Price',
      pipsLostCaught: 'Pips L/C',
      pnl: 'PnL',
      riskPerTrade: 'Risk/Trade',
      rFactor: 'R Factor',
      typeOfTrade: 'Trade Type',
      entryModel: 'Entry Model',
      confluences: 'Confluences',
      rulesFollowed: 'Rules Followed',
      tfUsed: 'TF Used',
      fearToGreed: 'Fear/Greed',
      fomoRating: 'FOMO',
      executionRating: 'Execution',
      imagePosting: 'Image Post',
      notes: 'Notes'
    };
    return headers[field];
  };

  // Auto-select session based on time
  const handleTimeChange = (tradeId: string, session: string) => {
    updateTrade(tradeId, 'session', session);
  };

  // Export data to JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(trades, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `trading-journal-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import data from JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedData)) {
            setTrades(importedData);
          } else {
            alert('Invalid file format. Please select a valid trading journal JSON file.');
          }
        } catch (error) {
          alert('Error reading file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  const totalPnL = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const winningTrades = trades.filter(t => t.pnl && t.pnl > 0).length;
  const totalTradesWithPnL = trades.filter(t => t.pnl !== null).length;
  const winRate = totalTradesWithPnL > 0 ? (winningTrades / totalTradesWithPnL) * 100 : 0;
  const avgRFactor = trades.filter(t => t.rFactor).length > 0 
    ? trades.reduce((sum, t) => sum + (t.rFactor || 0), 0) / trades.filter(t => t.rFactor).length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-blue-900 text-blue-100">
      {/* Excel-like Toolbar */}
      <div className="excel-toolbar border-b">
        <div className="flex items-center justify-between max-w-full px-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-800">Trading Journal</h1>
            </div>
            <div className="text-xs text-gray-600">
              Full Risk = 1-2% of account size
            </div>
            {/* Auto-save indicator */}
            {showSaveIndicator && (
              <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <CheckCircle className="w-3 h-3" />
                <span>Auto-saved</span>
              </div>
            )}
            {lastSaved && !showSaveIndicator && (
              <div className="text-xs text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <label className="excel-button flex items-center space-x-1 cursor-pointer">
              <Upload className="w-3 h-3" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className="excel-button flex items-center space-x-1"
              disabled={trades.length === 0}
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
            <button
              onClick={addNewTrade}
              className="excel-button flex items-center space-x-1 bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            >
              <Plus className="w-3 h-3" />
              <span>Add Trade</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      {trades.length > 0 && (
        <div className="bg-gradient-to-b from-blue-900 to-black border-b border-blue-800 px-4 py-3">
          <div className="flex items-center space-x-8 text-xs">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Total Trades:</span>
              <span className="font-semibold text-blue-600">{trades.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Win Rate:</span>
              <span className={`font-semibold ${winRate >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                {winRate.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Total PnL:</span>
              <span className={`font-semibold ${totalPnL >= 0 ? 'excel-positive' : 'excel-negative'}`}>
                {totalPnL.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Avg R-Factor:</span>
              <span className="font-semibold text-purple-600">{avgRFactor.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Save className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500">Auto-save enabled</span>
            </div>
          </div>
        </div>
      )}

      {/* Excel-like Spreadsheet */}
      <div className="bg-transparent">
        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <table className="border-collapse" style={{ minWidth: '3000px' }}>
            <thead className="sticky top-0 z-20">
              <tr>
                {COLUMN_FIELDS.map((field, colIndex) => (
                  <th
                    key={field}
                    className={`
                      px-2 py-2 text-left text-xs font-normal text-gray-700 uppercase tracking-wider
                      border border-gray-300 select-none
                      ${colIndex === 0 ? 'sticky left-0 z-30 freeze-pane' : ''}
                    `}
                    style={{ 
                      width: field === 'notes' ? '200px' : 
                             field === 'confluences' ? '150px' :
                             ['fearToGreed', 'fomoRating', 'executionRating'].includes(field) ? '120px' : '100px'
                    }}
                  >
                    {getColumnHeader(field)}
                  </th>
                ))}
                <th className="px-2 py-2 text-left text-xs font-normal text-gray-700 uppercase tracking-wider border border-gray-300 w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, rowIndex) => (
                <tr key={trade.id} className="hover:bg-gray-50 smooth-transition">
                  {COLUMN_FIELDS.map((field, colIndex) => (
                    <td
                      key={`${trade.id}-${field}`}
                      className={`
                        p-0 border border-gray-300
                        ${colIndex === 0 ? 'sticky left-0 z-10 bg-white freeze-pane' : ''}
                      `}
                      style={{ 
                        width: field === 'notes' ? '200px' : 
                               field === 'confluences' ? '150px' :
                               ['fearToGreed', 'fomoRating', 'executionRating'].includes(field) ? '120px' : '100px'
                      }}
                    >
                      {field === 'date' || field === 'time' ? (
                        <DateTimeCell
                          value={trade[field] as string}
                          onChange={(value) => updateTrade(trade.id, field, value)}
                          onTimeChange={field === 'time' ? (session) => handleTimeChange(trade.id, session) : undefined}
                          type={field as 'date' | 'time'}
                          isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                          isEditing={editingCell?.row === rowIndex && editingCell?.col === colIndex}
                          onSelect={() => handleCellSelect(rowIndex, colIndex)}
                          onStartEdit={() => handleStartEdit(rowIndex, colIndex)}
                          onStopEdit={handleStopEdit}
                          onNavigate={handleNavigate}
                        />
                      ) : (
                        <ExcelCell
                          value={trade[field] as string | number | null}
                          onChange={(value) => updateTrade(trade.id, field, value)}
                          type={getCellType(field) as 'text' | 'number' | 'dropdown'}
                          options={getDropdownOptions(field)}
                          isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                          isEditing={editingCell?.row === rowIndex && editingCell?.col === colIndex}
                          onSelect={() => handleCellSelect(rowIndex, colIndex)}
                          onStartEdit={() => handleStartEdit(rowIndex, colIndex)}
                          onStopEdit={handleStopEdit}
                          onNavigate={handleNavigate}
                          placeholder={getColumnHeader(field)}
                          className={
                            field === 'pnl' && trade.pnl 
                              ? (trade.pnl > 0 ? 'excel-positive' : 'excel-negative')
                              : getCellType(field) === 'number' ? 'excel-number' : ''
                          }
                        />
                      )}
                    </td>
                  ))}
                  <td className="p-0 border border-gray-300 w-16">
                    <div className="h-5 flex items-center justify-center">
                      <button
                        onClick={() => setPsychTrade(trade)}
                        className="text-blue-400 hover:text-blue-600 p-1 rounded transition-colors mr-1"
                        title="Psychology"
                      >
                        <Brain className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteTrade(trade.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        title="Delete trade"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={COLUMN_FIELDS.length + 1} className="px-6 py-16 text-center text-gray-500 border border-gray-300">
                    <div className="flex flex-col items-center space-y-4">
                      <BarChart3 className="w-12 h-12 text-gray-300" />
                      <div className="text-lg font-medium text-gray-400">No trades recorded yet</div>
                      <div className="text-sm text-gray-400">Click "Add Trade" to start tracking your trades</div>
                      <div className="text-xs text-gray-400 mt-2">
                        <Save className="w-4 h-4 inline mr-1" />
                        Your trades will be automatically saved to your browser
                      </div>
                      <button
                        onClick={addNewTrade}
                        className="excel-button bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 mt-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Trade
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {psychTrade && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-blue-900 to-black p-6 rounded-lg border border-blue-700 w-72">
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Psychology</h3>
            <div className="space-y-4">
              {(['fearToGreed','fomoRating','executionRating'] as (keyof TradeEntry)[]).map((field) => (
                <div key={field}>
                  <label className="text-xs capitalize text-blue-200 mb-1 inline-block">{getColumnHeader(field)}</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={psychTrade[field] as number}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    updateTrade(psychTrade!.id, field, val);
                    setPsychTrade({ ...psychTrade!, [field]: val });
                  }}
                    className="w-full slider"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setPsychTrade(null)}
              className="mt-6 w-full excel-button bg-blue-800 border-blue-600 text-blue-100 hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};