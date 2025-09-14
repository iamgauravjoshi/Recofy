import React from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import MetricsCard from "./components/MetricsCard";
import FinancialChart from "./components/FinancialChart";
import QuickActions from "./components/QuickActions";
import NewsAndMarket from "./components/NewsAndMarket";
import RecentTransactions from "./components/RecentTransactions";
import AdSlot from "./components/AdSlot";

const MainDashboard = () => {
  const metricsData = [
    {
      title: "Current Balance",
      value: "₹2,45,680",
      change: "+12.5%",
      changeType: "positive",
      icon: "Wallet",
      color: "primary",
    },
    {
      title: "Monthly Revenue",
      value: "₹67,000",
      change: "+8.2%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success",
    },
    {
      title: "Monthly Expenses",
      value: "₹41,000",
      change: "-3.1%",
      changeType: "positive",
      icon: "TrendingDown",
      color: "error",
    },
    {
      title: "Net Profit",
      value: "₹26,000",
      change: "+15.7%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today,{" "}
              {new Date()?.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Financial Chart - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <FinancialChart />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Transactions - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>

            {/* News and Market */}
            <div className="lg:col-span-1">
              <NewsAndMarket />
            </div>
          </div>

          {/* Advertisement Slot */}
          <div className="mb-8">
            <AdSlot />
          </div>

          {/* Footer Summary */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Total Transactions
                </h3>
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Active Accounts
                </h3>
                <p className="text-2xl font-bold text-accent">8</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Reports Generated
                </h3>
                <p className="text-2xl font-bold text-secondary">23</p>
                <p className="text-sm text-muted-foreground">This quarter</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
