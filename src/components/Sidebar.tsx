import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  NotebookPen,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const linkClass = (isActive: boolean, isCollapsed: boolean) =>
  `flex items-center space-x-${isCollapsed ? '0' : '3'} px-4 py-2 rounded-lg font-medium transition-colors text-sm tracking-wide hover:bg-blue-800 hover:text-white ${
    isActive ? 'bg-blue-800 text-white' : 'text-blue-300'
  } ${isCollapsed ? 'justify-center' : ''}`;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-60'
      } bg-gradient-to-b from-blue-950 to-black text-blue-100 flex flex-col p-4 min-h-screen border-r border-blue-800 shadow-xl transition-all duration-300 ease-in-out`}
    >
      <div className={`flex items-center justify-between ${collapsed ? 'px-2' : 'px-4'} mb-8`}>
        {!collapsed && (
          <div className="text-center">
            <h1 className="text-xl font-extrabold tracking-tight text-blue-200">TradeLog</h1>
            <p className="text-xs text-blue-400">Your Trading Companion</p>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="text-blue-400 hover:text-blue-200 p-1 rounded-full"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => linkClass(isActive, collapsed)}>
          <BarChart3 className="w-5 h-5" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/journal" className={({ isActive }) => linkClass(isActive, collapsed)}>
          <NotebookPen className="w-5 h-5" />
          {!collapsed && <span>Trade Journal</span>}
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => linkClass(isActive, collapsed)}>
          <User className="w-5 h-5" />
          {!collapsed && <span>Profile</span>}
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => linkClass(isActive, collapsed)}>
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      <div className="mt-auto pt-6 text-center text-xs text-blue-500 border-t border-blue-800">
        {!collapsed && (
          <>
            <p>© {new Date().getFullYear()} TradeLog</p>
            <p className="text-[10px] mt-1">All rights reserved</p>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;