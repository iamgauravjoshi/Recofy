import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WatchlistPanel = ({ onStockSelect }) => {
  const [watchlist, setWatchlist] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2847.50, change: 45.20, changePercent: 1.61 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3654.80, change: -23.45, changePercent: -0.64 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1456.30, change: 12.75, changePercent: 0.88 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1678.90, change: -8.20, changePercent: -0.49 }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, symbol: 'RELIANCE', type: 'above', price: 2900, active: true },
    { id: 2, symbol: 'TCS', type: 'below', price: 3600, active: true }
  ]);

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev?.filter(stock => stock?.symbol !== symbol));
  };

  const toggleAlert = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId ? { ...alert, active: !alert?.active } : alert
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Watchlist</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Stock
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {watchlist?.map((stock) => (
          <div key={stock?.symbol} className="p-4 hover:bg-muted transition-colors duration-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onStockSelect(stock)}
                className="flex-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{stock?.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-32">
                      {stock?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs ${stock?.change >= 0 ? 'text-success' : 'text-error'}`}>
                      {stock?.change >= 0 ? '+' : ''}₹{stock?.change?.toFixed(2)} ({stock?.changePercent >= 0 ? '+' : ''}{stock?.changePercent}%)
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => removeFromWatchlist(stock?.symbol)}
                className="ml-2 p-1 text-muted-foreground hover:text-error transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Price Alerts</h4>
        <div className="space-y-2">
          {alerts?.map((alert) => (
            <div key={alert?.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAlert(alert?.id)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    alert?.active 
                      ? 'bg-primary border-primary' :'border-muted-foreground'
                  }`}
                >
                  {alert?.active && <Icon name="Check" size={12} color="white" />}
                </button>
                <div className="text-xs">
                  <div className="font-medium text-foreground">{alert?.symbol}</div>
                  <div className="text-muted-foreground">
                    {alert?.type} ₹{alert?.price?.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              <Icon 
                name={alert?.type === 'above' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={alert?.type === 'above' ? 'text-success' : 'text-error'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPanel;