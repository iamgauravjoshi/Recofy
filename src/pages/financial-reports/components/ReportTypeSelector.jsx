import React from 'react';
import Button from '../../../components/ui/Button';

const ReportTypeSelector = ({ activeTab, onTabChange }) => {
  const reportTypes = [
    { id: 'pl', label: 'P&L Statement', icon: 'TrendingUp' },
    { id: 'balance', label: 'Balance Sheet', icon: 'Scale' },
    { id: 'cashflow', label: 'Cash Flow', icon: 'ArrowUpDown' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {reportTypes?.map((type) => (
        <Button
          key={type?.id}
          variant={activeTab === type?.id ? 'default' : 'outline'}
          onClick={() => onTabChange(type?.id)}
          iconName={type?.icon}
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          {type?.label}
        </Button>
      ))}
    </div>
  );
};

export default ReportTypeSelector;