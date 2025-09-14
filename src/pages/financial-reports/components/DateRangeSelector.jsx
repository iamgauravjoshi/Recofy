import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DateRangeSelector = ({ 
  dateRange, 
  onDateRangeChange, 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  comparisonPeriod,
  onComparisonPeriodChange 
}) => {
  const dateRangeOptions = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'current-year', label: 'Current Financial Year' },
    { value: 'last-year', label: 'Last Financial Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const comparisonOptions = [
    { value: 'none', label: 'No Comparison' },
    { value: 'previous-period', label: 'Previous Period' },
    { value: 'previous-year', label: 'Previous Year' },
    { value: 'budget', label: 'Budget Comparison' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Report Period</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={onDateRangeChange}
        />
        
        {dateRange === 'custom' && (
          <>
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e?.target?.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e?.target?.value)}
            />
          </>
        )}
        
        <Select
          label="Comparison"
          options={comparisonOptions}
          value={comparisonPeriod}
          onChange={onComparisonPeriodChange}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;