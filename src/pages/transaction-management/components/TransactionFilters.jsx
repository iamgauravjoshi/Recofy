import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionFilters = ({ onFiltersChange, resultsCount }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: '',
    account: '',
    amountMin: '',
    amountMax: '',
    searchTerm: ''
  });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'investment', label: 'Investment' },
    { value: 'loan', label: 'Loan' },
    { value: 'tax', label: 'Tax' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'office', label: 'Office Supplies' },
    { value: 'travel', label: 'Travel' }
  ];

  const accountOptions = [
    { value: '', label: 'All Accounts' },
    { value: 'cash', label: 'Cash Account' },
    { value: 'bank-sbi', label: 'SBI Current Account' },
    { value: 'bank-hdfc', label: 'HDFC Savings Account' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'petty-cash', label: 'Petty Cash' },
    { value: 'investment', label: 'Investment Account' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      category: '',
      account: '',
      amountMin: '',
      amountMax: '',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Transactions</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <Select
          placeholder="Select category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        {/* Account Filter */}
        <Select
          placeholder="Select account"
          options={accountOptions}
          value={filters?.account}
          onChange={(value) => handleFilterChange('account', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date From */}
        <Input
          type="date"
          label="From Date"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />

        {/* Date To */}
        <Input
          type="date"
          label="To Date"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />

        {/* Amount Min */}
        <Input
          type="number"
          label="Min Amount (₹)"
          placeholder="0"
          value={filters?.amountMin}
          onChange={(e) => handleFilterChange('amountMin', e?.target?.value)}
        />

        {/* Amount Max */}
        <Input
          type="number"
          label="Max Amount (₹)"
          placeholder="100000"
          value={filters?.amountMax}
          onChange={(e) => handleFilterChange('amountMax', e?.target?.value)}
        />
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Search" size={16} />
          <span>
            {resultsCount !== null ? (
              <>Showing {resultsCount} transaction{resultsCount !== 1 ? 's' : ''}</>
            ) : (
              'Enter filters to search transactions'
            )}
          </span>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center space-x-1 text-xs text-primary">
            <Icon name="FilterX" size={14} />
            <span>Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;