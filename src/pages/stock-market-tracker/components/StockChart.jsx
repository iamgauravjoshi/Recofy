import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const StockChart = ({ stock }) => {
  const [timeframe, setTimeframe] = useState('1D');

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' }
  ];

  // Generate mock chart data based on timeframe
  const generateChartData = (timeframe, basePrice) => {
    const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 365;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = basePrice * (1 + variation);
      
      let time;
      if (timeframe === '1D') {
        time = `${String(i)?.padStart(2, '0')}:00`;
      } else if (timeframe === '1W') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        time = days?.[i];
      } else if (timeframe === '1M') {
        time = `${i + 1}`;
      } else {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        time = months?.[Math.floor(i / 30)];
      }
      
      data?.push({
        time,
        price: parseFloat(price?.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
    }
    
    return data;
  };

  const chartData = stock ? generateChartData(timeframe, stock?.price) : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-md p-3 shadow-moderate">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-foreground">
            ₹{payload?.[0]?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
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
            <div className="text-lg font-medium mb-2">No Stock Selected</div>
            <div className="text-sm">Search and select a stock to view its chart</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Price Chart</h3>
        <div className="flex space-x-1">
          {timeframes?.map((tf) => (
            <Button
              key={tf?.value}
              variant={timeframe === tf?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf?.value)}
            >
              {tf?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `₹${value?.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--color-primary)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Day's Range</div>
          <div className="font-medium text-foreground">
            ₹{(stock?.price * 0.98)?.toFixed(2)} - ₹{(stock?.price * 1.02)?.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">Avg Volume</div>
          <div className="font-medium text-foreground">5,67,890</div>
        </div>
        <div>
          <div className="text-muted-foreground">Beta</div>
          <div className="font-medium text-foreground">1.23</div>
        </div>
        <div>
          <div className="text-muted-foreground">EPS</div>
          <div className="font-medium text-foreground">₹{(stock?.price * 0.04)?.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;