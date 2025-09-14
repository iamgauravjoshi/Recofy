import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CashFlowReport = ({ dateRange, comparisonPeriod }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const cashFlowData = {
    operating: {
      title: 'Operating Activities',
      total: 485000,
      comparison: 420000,
      items: [
        { name: 'Net Income', current: 535000, previous: 505000 },
        { name: 'Depreciation & Amortization', current: 125000, previous: 115000 },
        { name: 'Changes in Accounts Receivable', current: -60000, previous: -45000 },
        { name: 'Changes in Inventory', current: -40000, previous: -35000 },
        { name: 'Changes in Accounts Payable', current: 40000, previous: 25000 },
        { name: 'Changes in Accrued Expenses', current: 30000, previous: 20000 },
        { name: 'Other Operating Activities', current: -145000, previous: -165000 }
      ]
    },
    investing: {
      title: 'Investing Activities',
      total: -285000,
      comparison: -320000,
      items: [
        { name: 'Purchase of Property & Equipment', current: -180000, previous: -220000 },
        { name: 'Purchase of Investments', current: -60000, previous: -50000 },
        { name: 'Sale of Equipment', current: 25000, previous: 15000 },
        { name: 'Other Investing Activities', current: -70000, previous: -65000 }
      ]
    },
    financing: {
      title: 'Financing Activities',
      total: -130000,
      comparison: -85000,
      items: [
        { name: 'Proceeds from Long-term Debt', current: 50000, previous: 100000 },
        { name: 'Repayment of Long-term Debt', current: -100000, previous: -120000 },
        { name: 'Proceeds from Short-term Borrowing', current: 50000, previous: 30000 },
        { name: 'Dividends Paid', current: -80000, previous: -70000 },
        { name: 'Other Financing Activities', current: -50000, previous: -25000 }
      ]
    }
  };

  const netCashFlow = cashFlowData?.operating?.total + cashFlowData?.investing?.total + cashFlowData?.financing?.total;
  const netCashFlowComparison = cashFlowData?.operating?.comparison + cashFlowData?.investing?.comparison + cashFlowData?.financing?.comparison;

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

  const renderSection = (sectionKey, section) => {
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
              <div className={`font-semibold ${section?.total >= 0 ? 'text-success' : 'text-error'}`}>
                {formatCurrency(section?.total)}
              </div>
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className={`min-w-[120px] ${section?.comparison >= 0 ? 'text-success' : 'text-error'} opacity-70`}>
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
                    <div className={`min-w-[120px] ${item?.current >= 0 ? 'text-foreground' : 'text-error'}`}>
                      {formatCurrency(item?.current)}
                    </div>
                    {comparisonPeriod !== 'none' && (
                      <>
                        <div className={`min-w-[120px] ${item?.previous >= 0 ? 'text-muted-foreground' : 'text-error'} opacity-70`}>
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
          <h2 className="text-xl font-semibold text-foreground">Cash Flow Statement</h2>
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
          <div>Cash Flow Category</div>
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
        {/* Operating Activities */}
        {renderSection('operating', cashFlowData?.operating)}
        
        {/* Investing Activities */}
        {renderSection('investing', cashFlowData?.investing)}
        
        {/* Financing Activities */}
        {renderSection('financing', cashFlowData?.financing)}
        
        {/* Net Cash Flow */}
        <div className="flex items-center justify-between py-4 bg-primary/10 px-4 -mx-4 mt-4 rounded border-t-2 border-primary">
          <span className="font-bold text-lg text-foreground">Net Change in Cash</span>
          <div className="flex items-center space-x-6 text-right">
            <div className="min-w-[120px]">
              <div className={`font-bold text-lg ${netCashFlow >= 0 ? 'text-success' : 'text-error'}`}>
                {formatCurrency(netCashFlow)}
              </div>
            </div>
            {comparisonPeriod !== 'none' && (
              <>
                <div className={`min-w-[120px] font-semibold ${netCashFlowComparison >= 0 ? 'text-success' : 'text-error'} opacity-70`}>
                  {formatCurrency(netCashFlowComparison)}
                </div>
                <div className="min-w-[100px]">
                  <div className={`font-bold ${getVarianceColor(netCashFlow, netCashFlowComparison)}`}>
                    {(netCashFlow - netCashFlowComparison) >= 0 ? '+' : ''}{formatCurrency(netCashFlow - netCashFlowComparison)}
                  </div>
                  <div className={`text-sm font-medium ${getVarianceColor(netCashFlow, netCashFlowComparison)}`}>
                    ({(netCashFlow - netCashFlowComparison) >= 0 ? '+' : ''}{getVariancePercentage(netCashFlow, netCashFlowComparison)}%)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cash Position Summary */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold text-foreground mb-3">Cash Position Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Beginning Cash Balance:</span>
              <div className="font-semibold text-foreground">{formatCurrency(380000)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Net Change in Cash:</span>
              <div className={`font-semibold ${netCashFlow >= 0 ? 'text-success' : 'text-error'}`}>
                {formatCurrency(netCashFlow)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Ending Cash Balance:</span>
              <div className="font-semibold text-foreground">{formatCurrency(380000 + netCashFlow)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowReport;