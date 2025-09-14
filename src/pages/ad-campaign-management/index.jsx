import React, { useState } from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import CampaignTable from "./components/CampaignTable";
import CampaignWizard from "./components/CampaignWizard";
import AnalyticsPanel from "./components/AnalyticsPanel";
import RevenueTracker from "./components/RevenueTracker";

const AdCampaignManagement = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale Campaign",
      type: "Display Ads",
      status: "active",
      budget: 50000,
      spend: 32500,
      impressions: 125000,
      clicks: 3500,
      ctr: 2.8,
      startDate: "2024-09-01",
      endDate: "2024-09-30",
    },
    {
      id: 2,
      name: "Brand Awareness Drive",
      type: "Native Ads",
      status: "active",
      budget: 75000,
      spend: 45200,
      impressions: 180000,
      clicks: 4320,
      ctr: 2.4,
      startDate: "2024-08-15",
      endDate: "2024-09-15",
    },
    {
      id: 3,
      name: "Product Launch Promo",
      type: "Video Ads",
      status: "paused",
      budget: 100000,
      spend: 28900,
      impressions: 95000,
      clicks: 2375,
      ctr: 2.5,
      startDate: "2024-09-10",
      endDate: "2024-10-10",
    },
    {
      id: 4,
      name: "Holiday Special Offer",
      type: "Banner Ads",
      status: "draft",
      budget: 60000,
      spend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      startDate: "2024-10-01",
      endDate: "2024-10-31",
    },
    {
      id: 5,
      name: "Back to School Campaign",
      type: "Display Ads",
      status: "completed",
      budget: 40000,
      spend: 39800,
      impressions: 150000,
      clicks: 4200,
      ctr: 2.8,
      startDate: "2024-08-01",
      endDate: "2024-08-31",
    },
  ]);

  const tabs = [
    { id: "campaigns", label: "Campaigns", icon: "Megaphone" },
    { id: "revenue", label: "Revenue Tracking", icon: "DollarSign" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "completed", label: "Completed" },
    { value: "draft", label: "Draft" },
  ];

  const handleCreateCampaign = () => {
    setIsWizardOpen(true);
  };

  const handleSaveCampaign = (campaignData) => {
    const newCampaign = {
      id: campaigns?.length + 1,
      name: campaignData?.name,
      type: campaignData?.type,
      status: "draft",
      budget: parseInt(campaignData?.budget),
      spend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      startDate: new Date()?.toISOString()?.split("T")?.[0],
      endDate: new Date(
        Date.now() + parseInt(campaignData.duration) * 24 * 60 * 60 * 1000
      )
        ?.toISOString()
        ?.split("T")?.[0],
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsWizardOpen(true);
  };

  const handleViewAnalytics = (campaign) => {
    setSelectedCampaign(campaign);
    setIsAnalyticsOpen(true);
  };

  const handleToggleStatus = (campaign) => {
    setCampaigns(
      campaigns?.map((c) =>
        c?.id === campaign?.id
          ? { ...c, status: c?.status === "active" ? "paused" : "active" }
          : c
      )
    );
  };

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesStatus =
      filterStatus === "all" || campaign?.status === filterStatus;
    const matchesSearch =
      campaign?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      campaign?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN")?.format(num);
  };

  // Calculate summary stats
  const totalBudget = campaigns?.reduce(
    (sum, campaign) => sum + campaign?.budget,
    0
  );
  const totalSpend = campaigns?.reduce(
    (sum, campaign) => sum + campaign?.spend,
    0
  );
  const totalImpressions = campaigns?.reduce(
    (sum, campaign) => sum + campaign?.impressions,
    0
  );
  const totalClicks = campaigns?.reduce(
    (sum, campaign) => sum + campaign?.clicks,
    0
  );
  const averageCTR =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100)?.toFixed(2)
      : 0;

  const renderCampaignsTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
              <p className="text-2xl font-semibold text-foreground">
                {campaigns?.length}
              </p>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Megaphone" size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-semibold text-foreground">
                {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spend</p>
              <p className="text-2xl font-semibold text-foreground">
                {formatCurrency(totalSpend)}
              </p>
            </div>
            <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
              <p className="text-2xl font-semibold text-foreground">
                {formatNumber(totalImpressions)}
              </p>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average CTR</p>
              <p className="text-2xl font-semibold text-foreground">
                {averageCTR}%
              </p>
            </div>
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-40"
          />
        </div>
        <Button
          onClick={handleCreateCampaign}
          iconName="Plus"
          iconPosition="left"
        >
          New Campaign
        </Button>
      </div>

      {/* Campaign Table */}
      <CampaignTable
        campaigns={filteredCampaigns}
        onEditCampaign={handleEditCampaign}
        onViewAnalytics={handleViewAnalytics}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ad Campaign Management
            </h1>
            <p className="text-muted-foreground">
              Create, monitor, and optimize your advertising campaigns with
              comprehensive analytics
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab?.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "campaigns" && renderCampaignsTab()}
          {activeTab === "revenue" && <RevenueTracker />}
        </div>
      </main>
      {/* Campaign Wizard Modal */}
      <CampaignWizard
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setSelectedCampaign(null);
        }}
        onSave={handleSaveCampaign}
      />
      {/* Analytics Panel Modal */}
      <AnalyticsPanel
        selectedCampaign={selectedCampaign}
        onClose={() => {
          setIsAnalyticsOpen(false);
          setSelectedCampaign(null);
        }}
      />
    </div>
  );
};

export default AdCampaignManagement;
