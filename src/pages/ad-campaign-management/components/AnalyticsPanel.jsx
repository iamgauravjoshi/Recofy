import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsPanel = ({ selectedCampaign, onClose }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'audience', label: 'Audience', icon: 'Users' },
    { id: 'creative', label: 'Creative', icon: 'Image' }
  ];

  // Mock analytics data
  const impressionData = [
    { date: '14/09', impressions: 12500, clicks: 340 },
    { date: '13/09', impressions: 15200, clicks: 420 },
    { date: '12/09', impressions: 11800, clicks: 290 },
    { date: '11/09', impressions: 14600, clicks: 380 },
    { date: '10/09', impressions: 13200, clicks: 350 },
    { date: '09/09', impressions: 16800, clicks: 450 },
    { date: '08/09', impressions: 14200, clicks: 390 }
  ];

  const performanceData = [
    { metric: 'CTR', value: 2.8, change: '+0.3' },
    { metric: 'CPC', value: 12.50, change: '-1.20' },
    { metric: 'CPM', value: 350, change: '+25' },
    { metric: 'ROAS', value: 4.2, change: '+0.8' }
  ];

  const audienceData = [
    { name: '25-34', value: 35, color: '#1E40AF' },
    { name: '35-44', value: 28, color: '#059669' },
    { name: '45-54', value: 22, color: '#F59E0B' },
    { name: '18-24', value: 15, color: '#EF4444' }
  ];

  const deviceData = [
    { device: 'Mobile', sessions: 65, color: '#1E40AF' },
    { device: 'Desktop', sessions: 25, color: '#059669' },
    { device: 'Tablet', sessions: 10, color: '#F59E0B' }
  ];

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

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
              <p className="text-2xl font-semibold text-foreground">{formatNumber(selectedCampaign?.impressions || 0)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+12.5%</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-semibold text-foreground">{formatNumber(selectedCampaign?.clicks || 0)}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="MousePointer" size={24} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+8.3%</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CTR</p>
              <p className="text-2xl font-semibold text-foreground">{selectedCampaign?.ctr || 0}%</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingUp" size={14} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+0.3%</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spend</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(selectedCampaign?.spend || 0)}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <Icon name="TrendingDown" size={14} className="text-red-500 mr-1" />
            <span className="text-sm text-red-500">-2.1%</span>
          </div>
        </div>
      </div>

      {/* Impressions & Clicks Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Impressions & Clicks Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="impressions" stroke="#1E40AF" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceData?.map((metric) => (
          <div key={metric?.metric} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric?.metric}</p>
                <p className="text-2xl font-semibold text-foreground">
                  {metric?.metric === 'CPC' || metric?.metric === 'CPM' ? '₹' : ''}{metric?.value}
                  {metric?.metric === 'CTR' ? '%' : ''}
                  {metric?.metric === 'ROAS' ? 'x' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Icon 
                name={metric?.change?.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={metric?.change?.startsWith('+') ? 'text-green-500 mr-1' : 'text-red-500 mr-1'} 
              />
              <span className={`text-sm ${metric?.change?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric?.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#1E40AF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Age Demographics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {audienceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {deviceData?.map((device) => (
              <div key={device?.device} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: device?.color }}
                  ></div>
                  <span className="text-foreground">{device?.device}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-foreground font-medium mr-2">{device?.sessions}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${device?.sessions}%`,
                        backgroundColor: device?.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreativeTab = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Creative Performance</h3>
        <div className="text-center py-12">
          <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Creative analytics will be available once ads are running</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'performance':
        return renderPerformanceTab();
      case 'audience':
        return renderAudienceTab();
      case 'creative':
        return renderCreativeTab();
      default:
        return renderOverviewTab();
    }
  };

  if (!selectedCampaign) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-background shadow-prominent rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{selectedCampaign?.name} Analytics</h2>
              <p className="text-muted-foreground">Campaign performance insights and metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                options={timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                className="w-40"
              />
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-h-[70vh] overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;