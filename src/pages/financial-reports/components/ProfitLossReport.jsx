import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfitLossReport = ({ dateRange, comparisonPeriod }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const plData = {
    revenue: {
      title: 'Revenue',
      total: 2850000,
      comparison: 2650000,
      items: [
        { name: 'Product Sales', current: 2200000, previous: 2100000 },
        { name: 'Service Revenue', current: 450000, previous: 380000 },
        { name: 'Other Income', current: 200000, previous: 170000 }
      ]
    },
    cogs: {
      title: 'Cost of Goods Sold',
      total: 1425000,
      comparison: 1325000,
      items: [
        { name: 'Raw Materials', current: 850000, previous: 800000 },
        { name: 'Direct Labor', current: 375000, previous: 350000 },
        { name: 'Manufacturing Overhead', current: 200000, previous: 175000 }
      ]
    },
    expenses: {
      title: 'Operating Expenses',
      total: 890000,
      comparison: 820000,
      items: [
        { name: 'Salaries & Benefits', current: 450000, previous: 420000 },
        { name: 'Rent & Utilities', current: 180000, previous: 175000 },
        { name: 'Marketing & Advertising', current: 120000, previous: 100000 },
        { name: 'Professional Services', current: 85000, previous: 80000 },
        { name: 'Other Expenses', current: 55000, previous: 45000 }
      ]
    }
  };

  const grossProfit = plData?.revenue?.total - plData?.cogs?.total;
  const grossProfitComparison = plData?.revenue?.comparison - plData?.cogs?.comparison;
  const netIncome = grossProfit - plData?.expenses?.total;
  const netIncomeComparison = grossProfitComparison - plData?.expenses?.comparison;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getVarianceColor = (current, previous) => {
    const variance = current - previous;
    if (variance > 0) return 'text-success';
    if (variance < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getVariancePercentage = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100)?.toFixed(1);
  };

  const renderSection = (sectionKey, section, isExpense = false) => {
    const isExpanded = expandedSections?.[sectionKey];
    const variance = section?.total - section?.comparison;
    const variancePercentage = getVariancePercentage(section?.total, section?.comparison);

    return (
      <div key={sectionKey} className="border-b border-border last:border-b-0">
        <div 
          className="flex items-center justify-between py-3 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="flex items-center space-x-2">
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-muted-foreground" 
            />
            <span className="font-semibold text-foreground">{section?.title}</span>
          </div>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px]">
              <div className="font-semibold text-foreground">
                {formatCurrency(section?.total)}
              </div>
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px] text-muted-foreground">
                  {formatCurrency(section?.comparison)}
                </div>
                <div className="min-w-[100px]">
                  <div className={`font-medium ${getVarianceColor(section?.total, section?.comparison)}`}>
                    {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                  </div>
                  <div className={`text-xs ${getVarianceColor(section?.total, section?.comparison)}`}>
                    ({variance >= 0 ? '+' : ''}{variancePercentage}%)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="pl-6 pb-3">
            {section?.items?.map((item, index) => {
              const itemVariance = item?.current - item?.previous;
              const itemVariancePercentage = getVariancePercentage(item?.current, item?.previous);
              
              return (
                <div key={index} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-muted-foreground">{item?.name}</span>
                  <div className="flex items-center space-x-6 text-right">
                    <div className="min-w-[120px] text-foreground">
                      {formatCurrency(item?.current)}
                    </div>
                    {comparisonPeriod !== 'none' && (
                      <>
                        <div className="min-w-[120px] text-muted-foreground">
                          {formatCurrency(item?.previous)}
                        </div>
                        <div className="min-w-[100px]">
                          <div className={`${getVarianceColor(item?.current, item?.previous)}`}>
                            {itemVariance >= 0 ? '+' : ''}{formatCurrency(itemVariance)}
                          </div>
                          <div className={`text-xs ${getVarianceColor(item?.current, item?.previous)}`}>
                            ({itemVariance >= 0 ? '+' : ''}{itemVariancePercentage}%)
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Profit & Loss Statement</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export PDF
            </Button>
            <Button variant="outline" size="sm" iconName="FileSpreadsheet">
              Export Excel
            </Button>
          </div>
        </div>
        
        {/* Header Row */}
        <div className="flex items-center justify-between py-2 border-b border-border font-semibold text-sm text-muted-foreground">
          <div>Account</div>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px]">Current Period</div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px]">Previous Period</div>
                <div className="min-w-[100px]">Variance</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Revenue Section */}
        {renderSection('revenue', plData?.revenue)}
        
        {/* Gross Profit */}
        <div className="flex items-center justify-between py-3 bg-muted/30 px-4 -mx-4 my-2 rounded">
          <span className="font-semibold text-foreground">Gross Profit</span>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px] font-semibold text-foreground">
              {formatCurrency(grossProfit)}
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px] text-muted-foreground">
                  {formatCurrency(grossProfitComparison)}
                </div>
                <div className="min-w-[100px]">
                  <div className={`font-medium ${getVarianceColor(grossProfit, grossProfitComparison)}`}>
                    {(grossProfit - grossProfitComparison) >= 0 ? '+' : ''}{formatCurrency(grossProfit - grossProfitComparison)}
                  </div>
                  <div className={`text-xs ${getVarianceColor(grossProfit, grossProfitComparison)}`}>
                    ({(grossProfit - grossProfitComparison) >= 0 ? '+' : ''}{getVariancePercentage(grossProfit, grossProfitComparison)}%)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* COGS Section */}
        {renderSection('cogs', plData?.cogs, true)}
        
        {/* Operating Expenses Section */}
        {renderSection('expenses', plData?.expenses, true)}
        
        {/* Net Income */}
        <div className="flex items-center justify-between py-4 bg-primary/10 px-4 -mx-4 mt-4 rounded border-t-2 border-primary">
          <span className="font-bold text-lg text-foreground">Net Income</span>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px] font-bold text-lg text-foreground">
              {formatCurrency(netIncome)}
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px] text-muted-foreground font-semibold">
                  {formatCurrency(netIncomeComparison)}
                </div>
                <div className="min-w-[100px]">
                  <div className={`font-bold ${getVarianceColor(netIncome, netIncomeComparison)}`}>
                    {(netIncome - netIncomeComparison) >= 0 ? '+' : ''}{formatCurrency(netIncome - netIncomeComparison)}
                  </div>
                  <div className={`text-sm font-medium ${getVarianceColor(netIncome, netIncomeComparison)}`}>
                    ({(netIncome - netIncomeComparison) >= 0 ? '+' : ''}{getVariancePercentage(netIncome, netIncomeComparison)}%)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;