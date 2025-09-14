import React, { useState, useEffect } from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ReportTypeSelector from "./components/ReportTypeSelector";
import DateRangeSelector from "./components/DateRangeSelector";
import ProfitLossReport from "./components/ProfitLossReport";
import BalanceSheetReport from "./components/BalanceSheetReport";
import CashFlowReport from "./components/CashFlowReport";
import ReportVisualization from "./components/ReportVisualization";
import ReportCustomization from "./components/ReportCustomization";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState("pl");
  const [dateRange, setDateRange] = useState("current-month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comparisonPeriod, setComparisonPeriod] = useState("previous-period");
  const [isLoading, setIsLoading] = useState(false);
  const [customization, setCustomization] = useState({});

  useEffect(() => {
    // Set default dates based on current date
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    setStartDate(firstDayOfMonth?.toISOString()?.split("T")?.[0]);
    setEndDate(lastDayOfMonth?.toISOString()?.split("T")?.[0]);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);

    // Auto-set dates based on selection
    const today = new Date();
    let start, end;

    switch (range) {
      case "current-month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "last-month":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "current-quarter":
        const quarterStart = Math.floor(today?.getMonth() / 3) * 3;
        start = new Date(today.getFullYear(), quarterStart, 1);
        end = new Date(today.getFullYear(), quarterStart + 3, 0);
        break;
      case "current-year":
        start = new Date(today.getFullYear(), 3, 1); // Indian financial year starts in April
        end = new Date(today.getFullYear() + 1, 2, 31);
        break;
      default:
        return; // For custom range, don't auto-set dates
    }

    if (start && end) {
      setStartDate(start?.toISOString()?.split("T")?.[0]);
      setEndDate(end?.toISOString()?.split("T")?.[0]);
    }
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleCustomizationChange = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const renderActiveReport = () => {
    const commonProps = {
      dateRange,
      comparisonPeriod,
      startDate,
      endDate,
    };

    switch (activeTab) {
      case "pl":
        return <ProfitLossReport {...commonProps} />;
      case "balance":
        return <BalanceSheetReport {...commonProps} />;
      case "cashflow":
        return <CashFlowReport {...commonProps} />;
      default:
        return <ProfitLossReport {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Financial Reports
              </h1>
              <p className="text-muted-foreground">
                Generate comprehensive financial statements with interactive
                analysis and customizable formats
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                loading={isLoading}
                onClick={handleRefreshData}
              >
                Refresh Data
              </Button>

              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
              >
                New Report
              </Button>
            </div>
          </div>

          {/* Report Type Selector */}
          <ReportTypeSelector
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Date Range Selector */}
          <DateRangeSelector
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            comparisonPeriod={comparisonPeriod}
            onComparisonPeriodChange={setComparisonPeriod}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Loader2"
                  size={24}
                  className="animate-spin text-primary"
                />
                <span className="text-muted-foreground">
                  Generating financial report...
                </span>
              </div>
            </div>
          )}

          {/* Report Content */}
          {!isLoading && (
            <div className="space-y-8">
              {/* Main Report */}
              {renderActiveReport()}

              {/* Report Visualization */}
              <ReportVisualization
                activeTab={activeTab}
                dateRange={dateRange}
                comparisonPeriod={comparisonPeriod}
              />

              {/* Report Customization Panel */}
              <ReportCustomization
                activeTab={activeTab}
                onCustomizationChange={handleCustomizationChange}
              />
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Icon name="HelpCircle" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Need Help Understanding Your Reports?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our financial reports follow Indian accounting standards and
                  provide comprehensive insights into your business performance.
                  Click on any line item to drill down into transaction details,
                  or hover over terms for explanations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" iconName="BookOpen">
                    View Guide
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="Video">
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialReports;
