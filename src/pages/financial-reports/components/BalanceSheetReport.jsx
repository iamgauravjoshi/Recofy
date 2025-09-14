import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BalanceSheetReport = ({ dateRange, comparisonPeriod }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const balanceSheetData = {
    assets: {
      currentAssets: {
        title: 'Current Assets',
        total: 1850000,
        comparison: 1650000,
        items: [
          { name: 'Cash and Cash Equivalents', current: 450000, previous: 380000 },
          { name: 'Accounts Receivable', current: 680000, previous: 620000 },
          { name: 'Inventory', current: 520000, previous: 480000 },
          { name: 'Prepaid Expenses', current: 200000, previous: 170000 }
        ]
      },
      fixedAssets: {
        title: 'Fixed Assets',
        total: 2850000,
        comparison: 2950000,
        items: [
          { name: 'Property, Plant & Equipment', current: 2200000, previous: 2300000 },
          { name: 'Less: Accumulated Depreciation', current: -450000, previous: -420000 },
          { name: 'Intangible Assets', current: 750000, previous: 780000 },
          { name: 'Investments', current: 350000, previous: 290000 }
        ]
      }
    },
    liabilities: {
      currentLiabilities: {
        title: 'Current Liabilities',
        total: 980000,
        comparison: 850000,
        items: [
          { name: 'Accounts Payable', current: 420000, previous: 380000 },
          { name: 'Short-term Loans', current: 250000, previous: 200000 },
          { name: 'Accrued Expenses', current: 180000, previous: 150000 },
          { name: 'Tax Payable', current: 130000, previous: 120000 }
        ]
      },
      longTermLiabilities: {
        title: 'Long-term Liabilities',
        total: 1450000,
        comparison: 1550000,
        items: [
          { name: 'Long-term Debt', current: 1200000, previous: 1300000 },
          { name: 'Deferred Tax Liability', current: 150000, previous: 160000 },
          { name: 'Other Long-term Liabilities', current: 100000, previous: 90000 }
        ]
      }
    },
    equity: {
      title: 'Shareholders\' Equity',
      total: 2270000,
      comparison: 2200000,
      items: [
        { name: 'Share Capital', current: 1000000, previous: 1000000 },
        { name: 'Retained Earnings', current: 1150000, previous: 1080000 },
        { name: 'Other Comprehensive Income', current: 120000, previous: 120000 }
      ]
    }
  };

  const totalAssets = balanceSheetData?.assets?.currentAssets?.total + balanceSheetData?.assets?.fixedAssets?.total;
  const totalAssetsComparison = balanceSheetData?.assets?.currentAssets?.comparison + balanceSheetData?.assets?.fixedAssets?.comparison;
  const totalLiabilities = balanceSheetData?.liabilities?.currentLiabilities?.total + balanceSheetData?.liabilities?.longTermLiabilities?.total;
  const totalLiabilitiesComparison = balanceSheetData?.liabilities?.currentLiabilities?.comparison + balanceSheetData?.liabilities?.longTermLiabilities?.comparison;
  const totalLiabilitiesAndEquity = totalLiabilities + balanceSheetData?.equity?.total;
  const totalLiabilitiesAndEquityComparison = totalLiabilitiesComparison + balanceSheetData?.equity?.comparison;

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

  const renderSection = (sectionKey, section, level = 0) => {
    const isExpanded = expandedSections?.[sectionKey];
    const variance = section?.total - section?.comparison;
    const variancePercentage = getVariancePercentage(section?.total, section?.comparison);
    const indentClass = level === 0 ? '' : 'pl-6';

    return (
      <div key={sectionKey} className={`border-b border-border last:border-b-0 ${indentClass}`}>
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
            <span className={`${level === 0 ? 'font-bold text-lg' : 'font-semibold'} text-foreground`}>
              {section?.title}
            </span>
          </div>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px]">
              <div className={`${level === 0 ? 'font-bold text-lg' : 'font-semibold'} text-foreground`}>
                {formatCurrency(section?.total)}
              </div>
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px] text-muted-foreground font-medium">
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
        {isExpanded && section?.items && (
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
          <h2 className="text-xl font-semibold text-foreground">Balance Sheet</h2>
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
        {/* Assets Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between py-3 bg-primary/10 px-4 -mx-4 mb-2 rounded">
            <span className="font-bold text-xl text-foreground">ASSETS</span>
            <div className="flex items-center space-x-6 text-right">
              <div className="min-w-[120px] font-bold text-xl text-foreground">
                {formatCurrency(totalAssets)}
              </div>
              {comparisonPeriod !== 'none' && (
                <>
                  <div className="min-w-[120px] text-muted-foreground font-bold">
                    {formatCurrency(totalAssetsComparison)}
                  </div>
                  <div className="min-w-[100px]">
                    <div className={`font-bold ${getVarianceColor(totalAssets, totalAssetsComparison)}`}>
                      {(totalAssets - totalAssetsComparison) >= 0 ? '+' : ''}{formatCurrency(totalAssets - totalAssetsComparison)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {renderSection('currentAssets', balanceSheetData?.assets?.currentAssets, 1)}
          {renderSection('fixedAssets', balanceSheetData?.assets?.fixedAssets, 1)}
        </div>

        {/* Liabilities Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between py-3 bg-warning/10 px-4 -mx-4 mb-2 rounded">
            <span className="font-bold text-xl text-foreground">LIABILITIES</span>
            <div className="flex items-center space-x-6 text-right">
              <div className="min-w-[120px] font-bold text-xl text-foreground">
                {formatCurrency(totalLiabilities)}
              </div>
              {comparisonPeriod !== 'none' && (
                <>
                  <div className="min-w-[120px] text-muted-foreground font-bold">
                    {formatCurrency(totalLiabilitiesComparison)}
                  </div>
                  <div className="min-w-[100px]">
                    <div className={`font-bold ${getVarianceColor(totalLiabilities, totalLiabilitiesComparison)}`}>
                      {(totalLiabilities - totalLiabilitiesComparison) >= 0 ? '+' : ''}{formatCurrency(totalLiabilities - totalLiabilitiesComparison)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {renderSection('currentLiabilities', balanceSheetData?.liabilities?.currentLiabilities, 1)}
          {renderSection('longTermLiabilities', balanceSheetData?.liabilities?.longTermLiabilities, 1)}
        </div>

        {/* Equity Section */}
        <div className="mb-6">
          {renderSection('equity', balanceSheetData?.equity)}
        </div>

        {/* Total Liabilities and Equity */}
        <div className="flex items-center justify-between py-4 bg-accent/10 px-4 -mx-4 rounded border-t-2 border-accent">
          <span className="font-bold text-xl text-foreground">TOTAL LIABILITIES & EQUITY</span>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px] font-bold text-xl text-foreground">
              {formatCurrency(totalLiabilitiesAndEquity)}
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className="min-w-[120px] text-muted-foreground font-bold">
                  {formatCurrency(totalLiabilitiesAndEquityComparison)}
                </div>
                <div className="min-w-[100px]">
                  <div className={`font-bold ${getVarianceColor(totalLiabilitiesAndEquity, totalLiabilitiesAndEquityComparison)}`}>
                    {(totalLiabilitiesAndEquity - totalLiabilitiesAndEquityComparison) >= 0 ? '+' : ''}{formatCurrency(totalLiabilitiesAndEquity - totalLiabilitiesAndEquityComparison)}
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

export default BalanceSheetReport;