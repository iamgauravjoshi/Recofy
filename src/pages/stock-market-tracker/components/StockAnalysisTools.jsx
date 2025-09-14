import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockAnalysisTools = ({ stock }) => {
  const [activeAnalysis, setActiveAnalysis] = useState('ratios');

  const analysisTypes = [
    { id: 'ratios', label: 'Key Ratios', icon: 'Calculator' },
    { id: 'earnings', label: 'Earnings', icon: 'TrendingUp' },
    { id: 'peers', label: 'Peer Comparison', icon: 'BarChart3' }
  ];

  const mockRatios = [
    { name: 'P/E Ratio', value: 24.56, benchmark: 22.30, status: 'above' },
    { name: 'P/B Ratio', value: 3.45, benchmark: 2.80, status: 'above' },
    { name: 'ROE (%)', value: 18.2, benchmark: 15.5, status: 'above' },
    { name: 'ROA (%)', value: 12.8, benchmark: 10.2, status: 'above' },
    { name: 'Debt/Equity', value: 0.45, benchmark: 0.60, status: 'below' },
    { name: 'Current Ratio', value: 1.85, benchmark: 1.50, status: 'above' }
  ];

  const mockEarnings = [
    { quarter: 'Q1 2024', revenue: 1250, profit: 180, eps: 12.5 },
    { quarter: 'Q2 2024', revenue: 1320, profit: 195, eps: 13.2 },
    { quarter: 'Q3 2024', revenue: 1280, profit: 175, eps: 11.8 },
    { quarter: 'Q4 2024', revenue: 1450, profit: 220, eps: 14.8 }
  ];

  const mockPeers = [
    { name: stock?.symbol || 'Current', value: stock?.price || 2847, marketCap: 1923456 },
    { name: 'Peer 1', value: 2650, marketCap: 1756432 },
    { name: 'Peer 2', value: 3120, marketCap: 2134567 },
    { name: 'Peer 3', value: 2890, marketCap: 1987654 }
  ];

  const sectorAllocation = [
    { name: 'Energy', value: 35, color: '#1E40AF' },
    { name: 'Petrochemicals', value: 25, color: '#059669' },
    { name: 'Retail', value: 20, color: '#F59E0B' },
    { name: 'Digital Services', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#64748B' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-md p-3 shadow-moderate">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="font-semibold text-foreground">
              {entry?.name}: {typeof entry?.value === 'number' ? entry?.value?.toLocaleString('en-IN') : entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!stock) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
            <div className="text-lg font-medium mb-2">No Analysis Available</div>
            <div className="text-sm">Select a stock to view detailed analysis</div>
          </div>
        </div>
      </div>
    );
  }

  const renderRatiosAnalysis = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRatios?.map((ratio) => (
          <div key={ratio?.name} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{ratio?.name}</span>
              <Icon 
                name={ratio?.status === 'above' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={ratio?.status === 'above' ? 'text-success' : 'text-error'}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-foreground">{ratio?.value}</div>
                <div className="text-xs text-muted-foreground">Current</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{ratio?.benchmark}</div>
                <div className="text-xs text-muted-foreground">Industry Avg</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Business Segments</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorAllocation}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sectorAllocation?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {sectorAllocation?.map((segment) => (
            <div key={segment?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: segment?.color }}
              />
              <span className="text-xs text-foreground">{segment?.name} ({segment?.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEarningsAnalysis = () => (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="quarter" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="var(--color-primary)" name="Revenue (Cr)" />
            <Bar dataKey="profit" fill="var(--color-success)" name="Profit (Cr)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">₹5,300 Cr</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
          <div className="text-xs text-success mt-1">+12.5% YoY</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">₹770 Cr</div>
          <div className="text-sm text-muted-foreground">Net Profit</div>
          <div className="text-xs text-success mt-1">+15.2% YoY</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">₹52.3</div>
          <div className="text-sm text-muted-foreground">EPS (Annual)</div>
          <div className="text-xs text-success mt-1">+18.7% YoY</div>
        </div>
      </div>
    </div>
  );

  const renderPeerComparison = () => (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockPeers}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="var(--color-primary)" 
              name="Stock Price (₹)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Company</th>
              <th className="text-right py-2 text-muted-foreground">Price (₹)</th>
              <th className="text-right py-2 text-muted-foreground">Market Cap (Cr)</th>
              <th className="text-right py-2 text-muted-foreground">P/E Ratio</th>
            </tr>
          </thead>
          <tbody>
            {mockPeers?.map((peer, index) => (
              <tr key={peer?.name} className="border-b border-border">
                <td className="py-2 font-medium text-foreground">
                  {peer?.name}
                  {index === 0 && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Current</span>}
                </td>
                <td className="text-right py-2 text-foreground">
                  {peer?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="text-right py-2 text-foreground">
                  {peer?.marketCap?.toLocaleString('en-IN')}
                </td>
                <td className="text-right py-2 text-foreground">
                  {(Math.random() * 10 + 20)?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Stock Analysis</h3>
          <Icon name="Download" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors duration-200" />
        </div>
        
        <div className="flex space-x-1 overflow-x-auto">
          {analysisTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={activeAnalysis === type?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveAnalysis(type?.id)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {activeAnalysis === 'ratios' && renderRatiosAnalysis()}
        {activeAnalysis === 'earnings' && renderEarningsAnalysis()}
        {activeAnalysis === 'peers' && renderPeerComparison()}
      </div>
    </div>
  );
};

export default StockAnalysisTools;