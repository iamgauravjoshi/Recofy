import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportVisualization = ({ activeTab, dateRange, comparisonPeriod }) => {
  const profitLossChartData = [
    { month: 'Apr', revenue: 2850000, expenses: 2315000, profit: 535000 },
    { month: 'May', revenue: 2920000, expenses: 2380000, profit: 540000 },
    { month: 'Jun', revenue: 2780000, expenses: 2290000, profit: 490000 },
    { month: 'Jul', revenue: 3100000, expenses: 2520000, profit: 580000 },
    { month: 'Aug', revenue: 2950000, expenses: 2410000, profit: 540000 },
    { month: 'Sep', revenue: 3200000, expenses: 2650000, profit: 550000 }
  ];

  const balanceSheetTrendData = [
    { month: 'Apr', assets: 4700000, liabilities: 2430000, equity: 2270000 },
    { month: 'May', assets: 4750000, liabilities: 2450000, equity: 2300000 },
    { month: 'Jun', assets: 4680000, liabilities: 2420000, equity: 2260000 },
    { month: 'Jul', assets: 4820000, liabilities: 2480000, equity: 2340000 },
    { month: 'Aug', assets: 4780000, liabilities: 2460000, equity: 2320000 },
    { month: 'Sep', assets: 4850000, liabilities: 2490000, equity: 2360000 }
  ];

  const cashFlowTrendData = [
    { month: 'Apr', operating: 485000, investing: -285000, financing: -130000, net: 70000 },
    { month: 'May', operating: 520000, investing: -180000, financing: -90000, net: 250000 },
    { month: 'Jun', operating: 450000, investing: -320000, financing: -80000, net: 50000 },
    { month: 'Jul', operating: 580000, investing: -220000, financing: -150000, net: 210000 },
    { month: 'Aug', operating: 510000, investing: -190000, financing: -100000, net: 220000 },
    { month: 'Sep', operating: 485000, investing: -285000, financing: -130000, net: 70000 }
  ];

  const assetBreakdownData = [
    { name: 'Current Assets', value: 1850000, color: '#1E40AF' },
    { name: 'Fixed Assets', value: 2850000, color: '#059669' },
    { name: 'Investments', value: 350000, color: '#F59E0B' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-moderate">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {formatCurrency(entry?.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderProfitLossChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profitLossChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#1E40AF" name="Revenue" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderBalanceSheetChart = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Assets vs Liabilities Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceSheetTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="assets" stroke="#1E40AF" strokeWidth={3} name="Total Assets" />
              <Line type="monotone" dataKey="liabilities" stroke="#EF4444" strokeWidth={3} name="Total Liabilities" />
              <Line type="monotone" dataKey="equity" stroke="#059669" strokeWidth={3} name="Equity" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Asset Composition</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetBreakdownData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderCashFlowChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Cash Flow Activities Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="operating" fill="#059669" name="Operating" />
            <Bar dataKey="investing" fill="#EF4444" name="Investing" />
            <Bar dataKey="financing" fill="#F59E0B" name="Financing" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">Financial Analysis & Trends</h2>
      
      {activeTab === 'pl' && renderProfitLossChart()}
      {activeTab === 'balance' && renderBalanceSheetChart()}
      {activeTab === 'cashflow' && renderCashFlowChart()}
    </div>
  );
};

export default ReportVisualization;