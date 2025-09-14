import React from 'react';
import Icon from '../../../components/AppIcon';

const StockPriceDisplay = ({ stock }) => {
  if (!stock) return null;

  const isPositive = stock?.change >= 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{stock?.symbol}</h2>
          <p className="text-muted-foreground text-sm">{stock?.name}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground mb-1">
            ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center justify-end space-x-1 ${isPositive ? 'text-success' : 'text-error'}`}>
            <Icon 
              name={isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
            />
            <span className="font-medium">
              {isPositive ? '+' : ''}₹{stock?.change?.toFixed(2)} ({isPositive ? '+' : ''}{stock?.changePercent}%)
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-md p-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Market Cap</div>
          <div className="font-semibold text-foreground">{stock?.marketCap}</div>
        </div>
        <div className="bg-muted rounded-md p-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Volume</div>
          <div className="font-semibold text-foreground">12,45,678</div>
        </div>
        <div className="bg-muted rounded-md p-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">P/E Ratio</div>
          <div className="font-semibold text-foreground">24.56</div>
        </div>
        <div className="bg-muted rounded-md p-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">52W High</div>
          <div className="font-semibold text-foreground">₹{(stock?.price * 1.25)?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
};

export default StockPriceDisplay;