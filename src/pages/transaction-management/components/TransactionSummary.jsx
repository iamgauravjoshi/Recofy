import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionSummary = ({ transactions, filteredTransactions }) => {
  const calculateSummary = (transactionList) => {
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      netAmount: 0,
      transactionCount: transactionList?.length
    };

    transactionList?.forEach(transaction => {
      if (transaction?.type === 'credit') {
        summary.totalIncome += transaction?.amount;
      } else {
        summary.totalExpense += transaction?.amount;
      }
    });

    summary.netAmount = summary?.totalIncome - summary?.totalExpense;
    return summary;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const summary = calculateSummary(filteredTransactions);
  const isFiltered = filteredTransactions?.length !== transactions?.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Transactions */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-semibold text-foreground">{summary?.transactionCount}</p>
            {isFiltered && (
              <p className="text-xs text-muted-foreground">
                of {transactions?.length} total
              </p>
            )}
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
            <Icon name="Receipt" size={24} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Total Income */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-semibold text-success">{formatAmount(summary?.totalIncome)}</p>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions?.filter(t => t?.type === 'credit')?.length} transactions
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full">
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
        </div>
      </div>
      {/* Total Expenses */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-semibold text-error">{formatAmount(summary?.totalExpense)}</p>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions?.filter(t => t?.type === 'debit')?.length} transactions
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-full">
            <Icon name="TrendingDown" size={24} className="text-error" />
          </div>
        </div>
      </div>
      {/* Net Amount */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net Amount</p>
            <p className={`text-2xl font-semibold ${summary?.netAmount >= 0 ? 'text-success' : 'text-error'}`}>
              {formatAmount(summary?.netAmount)}
            </p>
            <p className="text-xs text-muted-foreground">
              {summary?.netAmount >= 0 ? 'Profit' : 'Loss'}
            </p>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
            summary?.netAmount >= 0 ? 'bg-success/10' : 'bg-error/10'
          }`}>
            <Icon 
              name={summary?.netAmount >= 0 ? 'PiggyBank' : 'AlertTriangle'} 
              size={24} 
              className={summary?.netAmount >= 0 ? 'text-success' : 'text-error'} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;