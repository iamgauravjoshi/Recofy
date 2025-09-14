import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const StockSearchBar = ({ onStockSelect, selectedStock }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const mockStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2847.50, change: 45.20, changePercent: 1.61, marketCap: '19,23,456 Cr' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3654.80, change: -23.45, changePercent: -0.64, marketCap: '13,45,678 Cr' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1456.30, change: 12.75, changePercent: 0.88, marketCap: '6,12,345 Cr' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1678.90, change: -8.20, changePercent: -0.49, marketCap: '9,87,654 Cr' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: 1234.60, change: 18.45, changePercent: 1.52, marketCap: '8,65,432 Cr' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2456.75, change: -15.30, changePercent: -0.62, marketCap: '5,76,543 Cr' },
    { symbol: 'ITC', name: 'ITC Limited', price: 456.80, change: 3.25, changePercent: 0.72, marketCap: '5,67,890 Cr' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 678.45, change: 12.60, changePercent: 1.89, marketCap: '6,05,432 Cr' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', price: 1098.30, change: -5.75, changePercent: -0.52, marketCap: '6,23,456 Cr' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', price: 3245.60, change: 28.90, changePercent: 0.90, marketCap: '3,12,345 Cr' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);

    if (query?.length > 0) {
      const filtered = mockStocks?.filter(stock =>
        stock?.symbol?.toLowerCase()?.includes(query?.toLowerCase()) ||
        stock?.name?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleStockSelect = (stock) => {
    setSearchQuery(stock?.symbol);
    setShowSuggestions(false);
    onStockSelect(stock);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (suggestions?.length > 0) {
      handleStockSelect(suggestions?.[0]);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search stocks by symbol or company name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-3 text-base"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </form>
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-moderate z-50 max-h-64 overflow-y-auto">
          {suggestions?.map((stock) => (
            <button
              key={stock?.symbol}
              onClick={() => handleStockSelect(stock)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 border-b border-border last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{stock?.symbol}</div>
                  <div className="text-sm text-muted-foreground truncate">{stock?.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                  <div className={`text-sm ${stock?.change >= 0 ? 'text-success' : 'text-error'}`}>
                    {stock?.change >= 0 ? '+' : ''}₹{stock?.change?.toFixed(2)} ({stock?.changePercent >= 0 ? '+' : ''}{stock?.changePercent}%)
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearchBar;