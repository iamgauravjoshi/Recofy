import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FinancialNewsFeed = ({ selectedStock }) => {
  const [activeTab, setActiveTab] = useState('all');

  const mockNews = [
    {
      id: 1,
      title: "Reliance Industries Reports Strong Q3 Results with 15% Growth",
      summary: "Reliance Industries posted impressive quarterly results driven by strong performance in retail and digital services segments.",
      source: "Economic Times",
      timestamp: "2 hours ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      category: "earnings",
      relatedStocks: ["RELIANCE"]
    },
    {
      id: 2,
      title: "IT Sector Outlook: TCS and Infosys Lead Digital Transformation Wave",
      summary: "Leading IT companies are capitalizing on increased demand for digital transformation services across global markets.",
      source: "Business Standard",
      timestamp: "4 hours ago",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      category: "sector",
      relatedStocks: ["TCS", "INFY"]
    },
    {
      id: 3,
      title: "Banking Sector Sees Mixed Performance Amid Interest Rate Changes",
      summary: "HDFC Bank and ICICI Bank show divergent trends as the sector adapts to changing monetary policy landscape.",
      source: "Mint",
      timestamp: "6 hours ago",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      category: "banking",
      relatedStocks: ["HDFCBANK", "ICICIBANK"]
    },
    {
      id: 4,
      title: "Market Analysis: Nifty 50 Reaches New Highs on Strong FII Inflows",
      summary: "Indian equity markets continue their upward trajectory supported by robust foreign institutional investor participation.",
      source: "CNBC TV18",
      timestamp: "8 hours ago",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop",
      category: "market",
      relatedStocks: []
    },
    {
      id: 5,
      title: "Asian Paints Announces Expansion Plans for Rural Markets",
      summary: "The paint manufacturer unveils strategic initiatives to capture growing demand in tier-2 and tier-3 cities.",
      source: "Financial Express",
      timestamp: "12 hours ago",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=200&fit=crop",
      category: "corporate",
      relatedStocks: ["ASIANPAINT"]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All News', icon: 'Newspaper' },
    { id: 'earnings', label: 'Earnings', icon: 'TrendingUp' },
    { id: 'market', label: 'Market', icon: 'BarChart3' },
    { id: 'sector', label: 'Sector', icon: 'Building' }
  ];

  const filteredNews = activeTab === 'all' 
    ? mockNews 
    : mockNews?.filter(news => news?.category === activeTab);

  const getRelevantNews = () => {
    if (selectedStock) {
      return mockNews?.filter(news => 
        news?.relatedStocks?.includes(selectedStock?.symbol) ||
        news?.title?.toLowerCase()?.includes(selectedStock?.name?.toLowerCase()) ||
        news?.summary?.toLowerCase()?.includes(selectedStock?.name?.toLowerCase())
      );
    }
    return filteredNews;
  };

  const newsToShow = selectedStock ? getRelevantNews() : filteredNews;

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {selectedStock ? `${selectedStock?.symbol} News` : 'Financial News'}
          </h3>
          <Icon name="RefreshCw" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors duration-200" />
        </div>

        {!selectedStock && (
          <div className="flex space-x-1 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={14} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {newsToShow?.length > 0 ? (
          <div className="divide-y divide-border">
            {newsToShow?.map((article) => (
              <div key={article?.id} className="p-4 hover:bg-muted transition-colors duration-200 cursor-pointer">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={article?.image}
                      alt={article?.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {article?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {article?.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article?.source}</span>
                      <span>{article?.timestamp}</span>
                    </div>
                    {article?.relatedStocks?.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        {article?.relatedStocks?.map((stock) => (
                          <span
                            key={stock}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                          >
                            {stock}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Newspaper" size={48} className="mx-auto mb-4 opacity-50" />
            <div className="text-sm">
              {selectedStock 
                ? `No recent news found for ${selectedStock?.symbol}`
                : 'No news available for this category'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialNewsFeed;