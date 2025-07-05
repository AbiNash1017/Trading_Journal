import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Percent,
  DollarSign,
  Activity,
  Brain,
  CalendarDays,
  UserCheck,
} from 'lucide-react';

const allTrades = [
  { id: 1, user: 'me', pnl: 300 },
  { id: 2, user: 'other', pnl: -200 },
  { id: 3, user: 'me', pnl: 150 },
  { id: 4, user: 'me', pnl: -100 },
];

const Dashboard: React.FC = () => {
  const [showMyTrades, setShowMyTrades] = React.useState(false);

  const filteredTrades = showMyTrades
    ? allTrades.filter((t) => t.user === 'me')
    : allTrades;

  const totalPnL = filteredTrades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate =
    filteredTrades.length > 0
      ? (filteredTrades.filter((t) => t.pnl > 0).length /
          filteredTrades.length) *
        100
      : 0;
  const avgRFactor = (totalPnL / filteredTrades.length).toFixed(2);

  const stats = [
    {
      label: 'Total Trades',
      value: filteredTrades.length,
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-800 to-blue-900',
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      icon: <Percent className="w-6 h-6 text-green-400" />,
      color: 'from-green-800 to-green-900',
    },
    {
      label: 'Net PnL',
      value: `$${totalPnL >= 0 ? '+' : ''}${totalPnL}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-800 to-emerald-900',
    },
    {
      label: 'Avg. R-Factor',
      value: avgRFactor,
      icon: <Activity className="w-6 h-6 text-yellow-400" />,
      color: 'from-yellow-800 to-yellow-900',
    },
  ];

  const psychologyFlags = [
    { label: 'FOMO', status: 'Low', color: 'bg-green-600' },
    { label: 'Fear/Greed', status: 'Moderate', color: 'bg-yellow-600' },
    { label: 'Execution Discipline', status: 'Needs Work', color: 'bg-red-600' },
  ];

  return (
    <div className="w-full px-6 py-8 text-white min-h-screen bg-gradient-to-tr from-slate-950 to-slate-900">
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-7 h-7 text-sky-400" />
        <h1 className="text-3xl font-bold tracking-tight">Trade Log Dashboard</h1>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center p-5 rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} border border-slate-800 transition-all hover:scale-[1.02]`}
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="mb-10 flex gap-4 flex-wrap items-center">
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
          <CalendarDays className="w-4 h-4 text-blue-300" />
          <span className="text-sm">Last 30 Days</span>
        </div>
        <div
          onClick={() => setShowMyTrades(!showMyTrades)}
          className={`flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2 cursor-pointer
          transition hover:bg-slate-700 hover:shadow-md
          ${showMyTrades ? 'ring-2 ring-green-400 bg-slate-700' : ''}`}
        >
          <UserCheck className="w-4 h-4 text-green-300" />
          <span className="text-sm">My Trades</span>
        </div>
      </section>

      {/* Psychology Flags */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Brain className="w-5 h-5 text-pink-400 mr-2" />
          <h2 className="text-xl font-semibold">Trading Psychology</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {psychologyFlags.map((flag) => (
            <div
              key={flag.label}
              className={`rounded-xl p-5 ${flag.color} bg-opacity-90 border border-slate-700 transition hover:scale-[1.01] hover:shadow`}
            >
              <div className="font-semibold text-lg">{flag.label}</div>
              <div className="text-sm opacity-90">{flag.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for upcoming features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
          <h3 className="text-xl font-semibold mb-2">PnL Chart (Coming Soon)</h3>
          <p className="text-sm opacity-75">Visualize your net profit & loss over time.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Trade Tags (Coming Soon)</h3>
          <p className="text-sm opacity-75">Categorize and filter your trades by strategy.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Trade Journal (Coming Soon)</h3>
          <p className="text-sm opacity-75">Write notes and review your emotions after trades.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
