import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecentTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      type: 'income',
      description: 'Product Sales - Online Store',
      amount: 25000,
      date: '2024-09-14',
      category: 'Sales',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'expense',
      description: 'Office Rent Payment',
      amount: 15000,
      date: '2024-09-13',
      category: 'Rent',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'income',
      description: 'Consulting Services',
      amount: 8500,
      date: '2024-09-13',
      category: 'Services',
      status: 'pending'
    },
    {
      id: 'TXN004',
      type: 'expense',
      description: 'Marketing Campaign',
      amount: 5000,
      date: '2024-09-12',
      category: 'Marketing',
      status: 'completed'
    },
    {
      id: 'TXN005',
      type: 'income',
      description: 'Freelance Project',
      amount: 12000,
      date: '2024-09-12',
      category: 'Services',
      status: 'completed'
    }
  ];

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch = transaction?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction?.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTransactionIcon = (type) => {
    return type === 'income' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const getTransactionColor = (type) => {
    return type === 'income' ? 'text-accent' : 'text-error';
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'completed') {
      return `${baseClasses} bg-accent/10 text-accent`;
    } else if (status === 'pending') {
      return `${baseClasses} bg-warning/10 text-warning`;
    }
    return `${baseClasses} bg-muted text-muted-foreground`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Recent Transactions</h2>
          <Link to="/transaction-management">
            <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredTransactions?.length > 0 ? (
            filteredTransactions?.map((transaction) => (
              <div key={transaction?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full bg-muted ${getTransactionColor(transaction?.type)}`}>
                    <Icon name={getTransactionIcon(transaction?.type)} size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground truncate">
                      {transaction?.description}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {transaction?.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(transaction.date)?.toLocaleDateString('en-IN')}
                      </span>
                      <span className={getStatusBadge(transaction?.status)}>
                        {transaction?.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getTransactionColor(transaction?.type)}`}>
                    {transaction?.type === 'income' ? '+' : '-'}₹{transaction?.amount?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {transaction?.id}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No transactions found matching your criteria</p>
            </div>
          )}
        </div>

        {filteredTransactions?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredTransactions?.length} of {transactions?.length} transactions
              </span>
              <Link to="/transaction-management">
                <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                  View Complete History
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;