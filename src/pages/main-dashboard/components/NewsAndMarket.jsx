import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsAndMarket = () => {
  const [activeTab, setActiveTab] = useState('news');

  const newsData = [
    {
      id: 1,
      title: "RBI Announces New Digital Payment Guidelines",
      summary: "Reserve Bank of India introduces enhanced security measures for digital transactions affecting small businesses.",
      time: "2 hours ago",
      category: "Banking",
      source: "Economic Times"
    },
    {
      id: 2,
      title: "GST Returns Filing Deadline Extended",
      summary: "Government extends GST filing deadline for Q2 2024-25, providing relief to small and medium enterprises.",
      time: "4 hours ago",
      category: "Tax",
      source: "Business Standard"
    },
    {
      id: 3,
      title: "Stock Market Hits New High",
      summary: "Sensex crosses 75,000 mark driven by strong quarterly results from banking and IT sectors.",
      time: "6 hours ago",
      category: "Markets",
      source: "Mint"
    },
    {
      id: 4,
      title: "New Accounting Standards for SMEs",
      summary: "ICAI releases simplified accounting standards specifically designed for small and medium enterprises.",
      time: "8 hours ago",
      category: "Accounting",
      source: "Financial Express"
    }
  ];

  const marketData = [
    {
      symbol: "SENSEX",
      value: "75,245.32",
      change: "+1.2%",
      changeType: "positive"
    },
    {
      symbol: "NIFTY 50",
      value: "22,789.45",
      change: "+0.8%",
      changeType: "positive"
    },
    {
      symbol: "BANK NIFTY",
      value: "48,567.23",
      change: "-0.3%",
      changeType: "negative"
    },
    {
      symbol: "USD/INR",
      value: "83.25",
      change: "+0.1%",
      changeType: "positive"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Market & News</h2>
          <Link to="/stock-market-tracker">
            <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'news' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Newspaper" size={16} className="inline mr-2" />
            News
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'market' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="TrendingUp" size={16} className="inline mr-2" />
            Market
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'news' ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {newsData?.map((news) => (
              <div key={news?.id} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {news?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{news?.time}</span>
                </div>
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                  {news?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {news?.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Source: {news?.source}
                  </span>
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {marketData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{item?.symbol}</h4>
                  <p className="text-lg font-bold text-foreground">{item?.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  item?.changeType === 'positive' ? 'text-accent' : 'text-error'
                }`}>
                  <Icon 
                    name={item?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                  />
                  <span className="font-medium">{item?.change}</span>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAndMarket;