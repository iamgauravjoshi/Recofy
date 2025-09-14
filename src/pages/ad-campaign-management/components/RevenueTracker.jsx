import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const RevenueTracker = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Mock revenue data
  const revenueData = [
    { date: '14/09', revenue: 45000, advertisers: 12, campaigns: 28 },
    { date: '13/09', revenue: 52000, advertisers: 15, campaigns: 32 },
    { date: '12/09', revenue: 38000, advertisers: 10, campaigns: 24 },
    { date: '11/09', revenue: 48000, advertisers: 13, campaigns: 30 },
    { date: '10/09', revenue: 55000, advertisers: 16, campaigns: 35 },
    { date: '09/09', revenue: 42000, advertisers: 11, campaigns: 26 },
    { date: '08/09', revenue: 50000, advertisers: 14, campaigns: 31 }
  ];

  const pricingTierData = [
    { tier: 'Basic (₹2,999)', revenue: 180000, campaigns: 60, percentage: 35 },
    { tier: 'Professional (₹3,999)', revenue: 240000, campaigns: 60, percentage: 47 },
    { tier: 'Premium (₹4,599)', revenue: 92000, campaigns: 20, percentage: 18 }
  ];

  const monthlyTargets = {
    target: 800000,
    achieved: 512000,
    percentage: 64
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Revenue Tracking</h2>
          <p className="text-muted-foreground">Monitor advertising revenue and performance metrics</p>
        </div>
        <Select
          options={timeRangeOptions}
          value={timeRange}
          onChange={setTimeRange}
          className="w-40"
        />
      </div>
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(512000)}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+18.2% from last month</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Advertisers</p>
              <p className="text-2xl font-semibold text-foreground">87</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+12 new this month</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Running Campaigns</p>
              <p className="text-2xl font-semibold text-foreground">156</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Megaphone" size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+24 this week</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Campaign Value</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(3284)}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+5.8% increase</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1E40AF" 
                  fill="#1E40AF" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Target Progress */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Target Progress</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#1E40AF"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - monthlyTargets?.percentage / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{monthlyTargets?.percentage}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Achieved:</span>
                  <span className="font-medium text-foreground">{formatCurrency(monthlyTargets?.achieved)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-medium text-foreground">{formatCurrency(monthlyTargets?.target)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-medium text-orange-600">{formatCurrency(monthlyTargets?.target - monthlyTargets?.achieved)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Tier Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue by Pricing Tier</h3>
        <div className="space-y-4">
          {pricingTierData?.map((tier, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-foreground">{tier?.tier}</h4>
                  <p className="text-sm text-muted-foreground">{tier?.campaigns} campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatCurrency(tier?.revenue)}</p>
                <p className="text-sm text-muted-foreground">{tier?.percentage}% of total</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Advertiser Performance Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Advertiser Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="advertisers" fill="#1E40AF" name="Active Advertisers" />
              <Bar dataKey="campaigns" fill="#059669" name="New Campaigns" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueTracker;