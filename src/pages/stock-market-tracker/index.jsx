import React, { useState } from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import StockSearchBar from "./components/StockSearchBar";
import StockPriceDisplay from "./components/StockPriceDisplay";
import StockChart from "./components/StockChart";
import WatchlistPanel from "./components/WatchlistPanel";
import FinancialNewsFeed from "./components/FinancialNewsFeed";
import StockAnalysisTools from "./components/StockAnalysisTools";
import AdSlot from "./components/AdSlot";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const StockMarketTracker = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "chart", label: "Chart", icon: "TrendingUp" },
    { id: "analysis", label: "Analysis", icon: "Calculator" },
    { id: "news", label: "News", icon: "Newspaper" },
  ];

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setActiveTab("overview");
  };

  const marketIndices = [
    { name: "NIFTY 50", value: 21847.9, change: 156.35, changePercent: 0.72 },
    { name: "SENSEX", value: 72186.45, change: 445.87, changePercent: 0.62 },
    {
      name: "NIFTY BANK",
      value: 46234.8,
      change: -234.56,
      changePercent: -0.51,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Stock Market Tracker
              </h1>
              <p className="text-muted-foreground">
                Monitor, analyze, and track your favorite stocks with real-time
                data and insights
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Add to Watchlist
              </Button>
            </div>
          </div>

          {/* Market Indices Banner */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-subtle">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Market Indices</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketIndices?.map((index) => (
                <div
                  key={index?.name}
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                >
                  <div>
                    <div className="font-medium text-foreground">
                      {index?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {index?.value?.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div
                    className={`text-right ${
                      index?.change >= 0 ? "text-success" : "text-error"
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon
                        name={
                          index?.change >= 0 ? "TrendingUp" : "TrendingDown"
                        }
                        size={14}
                      />
                      <span className="text-sm font-medium">
                        {index?.change >= 0 ? "+" : ""}
                        {index?.change?.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs">
                      ({index?.changePercent >= 0 ? "+" : ""}
                      {index?.changePercent}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Banner */}
          <AdSlot position="banner" />

          {/* Search Section */}
          <div className="mb-6">
            <StockSearchBar
              onStockSelect={handleStockSelect}
              selectedStock={selectedStock}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stock Price Display */}
              {selectedStock && <StockPriceDisplay stock={selectedStock} />}

              {/* Mobile Tabs */}
              <div className="lg:hidden">
                <div className="flex space-x-1 overflow-x-auto mb-4">
                  {tabs?.map((tab) => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab(tab?.id)}
                      iconName={tab?.icon}
                      iconPosition="left"
                      className="whitespace-nowrap"
                    >
                      {tab?.label}
                    </Button>
                  ))}
                </div>

                {/* Mobile Tab Content */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <StockChart stock={selectedStock} />
                    <FinancialNewsFeed selectedStock={selectedStock} />
                  </div>
                )}
                {activeTab === "chart" && <StockChart stock={selectedStock} />}
                {activeTab === "analysis" && (
                  <StockAnalysisTools stock={selectedStock} />
                )}
                {activeTab === "news" && (
                  <FinancialNewsFeed selectedStock={selectedStock} />
                )}
              </div>

              {/* Desktop Content */}
              <div className="hidden lg:block space-y-6">
                <StockChart stock={selectedStock} />
                <StockAnalysisTools stock={selectedStock} />
                <FinancialNewsFeed selectedStock={selectedStock} />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <WatchlistPanel onStockSelect={handleStockSelect} />
              <AdSlot position="sidebar" />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Set Price Alert
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share Analysis
                  </Button>
                </div>
              </div>

              {/* Market Status */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">
                    Market Status
                  </h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success font-medium">
                      OPEN
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Opens:</span>
                    <span className="text-foreground">9:15 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Market Closes:
                    </span>
                    <span className="text-foreground">3:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Time to Close:
                    </span>
                    <span className="text-foreground">2h 45m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockMarketTracker;
