import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTable = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  selectedTransactions, 
  onSelectionChange,
  sortConfig,
  onSort 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      income: 'TrendingUp',
      expense: 'TrendingDown',
      transfer: 'ArrowRightLeft',
      investment: 'PiggyBank',
      loan: 'CreditCard',
      tax: 'Receipt',
      utilities: 'Zap',
      marketing: 'Megaphone',
      office: 'Building',
      travel: 'Plane'
    };
    return iconMap?.[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      income: 'text-success',
      expense: 'text-error',
      transfer: 'text-primary',
      investment: 'text-accent',
      loan: 'text-warning',
      tax: 'text-secondary',
      utilities: 'text-blue-600',
      marketing: 'text-purple-600',
      office: 'text-gray-600',
      travel: 'text-green-600'
    };
    return colorMap?.[category] || 'text-muted-foreground';
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(transactions?.map(t => t?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectTransaction = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedTransactions, id]);
    } else {
      onSelectionChange(selectedTransactions?.filter(tid => tid !== id));
    }
  };

  const startEdit = (transaction) => {
    setEditingId(transaction?.id);
    setEditData({
      description: transaction?.description,
      amount: Math.abs(transaction?.amount),
      category: transaction?.category
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = (id) => {
    onEdit(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = transactions?.length > 0 && selectedTransactions?.length === transactions?.length;
  const isIndeterminate = selectedTransactions?.length > 0 && selectedTransactions?.length < transactions?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('date')}
                  iconName={getSortIcon('date')}
                  iconPosition="right"
                  className="font-semibold text-foreground"
                >
                  Date
                </Button>
              </th>
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('description')}
                  iconName={getSortIcon('description')}
                  iconPosition="right"
                  className="font-semibold text-foreground"
                >
                  Description
                </Button>
              </th>
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('category')}
                  iconName={getSortIcon('category')}
                  iconPosition="right"
                  className="font-semibold text-foreground"
                >
                  Category
                </Button>
              </th>
              <th className="px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('account')}
                  iconName={getSortIcon('account')}
                  iconPosition="right"
                  className="font-semibold text-foreground"
                >
                  Account
                </Button>
              </th>
              <th className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('amount')}
                  iconName={getSortIcon('amount')}
                  iconPosition="right"
                  className="font-semibold text-foreground"
                >
                  Amount
                </Button>
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr key={transaction?.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={(e) => handleSelectTransaction(transaction?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {formatDate(transaction?.date)}
                </td>
                <td className="px-4 py-3">
                  {editingId === transaction?.id ? (
                    <input
                      type="text"
                      value={editData?.description}
                      onChange={(e) => setEditData({...editData, description: e?.target?.value})}
                      className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-foreground">{transaction?.description}</div>
                      {transaction?.reference && (
                        <div className="text-xs text-muted-foreground">Ref: {transaction?.reference}</div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getCategoryIcon(transaction?.category)} 
                      size={16} 
                      className={getCategoryColor(transaction?.category)}
                    />
                    <span className="text-sm text-foreground capitalize">
                      {transaction?.category?.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {transaction?.account}
                </td>
                <td className="px-4 py-3 text-right">
                  {editingId === transaction?.id ? (
                    <input
                      type="number"
                      value={editData?.amount}
                      onChange={(e) => setEditData({...editData, amount: e?.target?.value})}
                      className="w-24 px-2 py-1 text-sm text-right border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <span className={`text-sm font-medium ${transaction?.type === 'credit' ? 'text-success' : 'text-error'}`}>
                      {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-2">
                    {editingId === transaction?.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => saveEdit(transaction?.id)}
                          iconName="Check"
                          className="text-success hover:text-success"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={cancelEdit}
                          iconName="X"
                          className="text-error hover:text-error"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(transaction)}
                          iconName="Edit"
                          className="text-primary hover:text-primary"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(transaction?.id)}
                          iconName="Trash2"
                          className="text-error hover:text-error"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {transactions?.map((transaction) => (
          <div key={transaction?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.includes(transaction?.id)}
                  onChange={(e) => handleSelectTransaction(transaction?.id, e?.target?.checked)}
                  className="rounded border-border"
                />
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getCategoryIcon(transaction?.category)} 
                    size={16} 
                    className={getCategoryColor(transaction?.category)}
                  />
                  <span className="text-sm font-medium text-foreground capitalize">
                    {transaction?.category?.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <span className={`text-sm font-semibold ${transaction?.type === 'credit' ? 'text-success' : 'text-error'}`}>
                {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="text-sm font-medium text-foreground mb-1">{transaction?.description}</div>
              <div className="text-xs text-muted-foreground">
                {formatDate(transaction?.date)} • {transaction?.account}
              </div>
              {transaction?.reference && (
                <div className="text-xs text-muted-foreground">Ref: {transaction?.reference}</div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEdit(transaction)}
                iconName="Edit"
                className="text-primary"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(transaction?.id)}
                iconName="Trash2"
                className="text-error"
              />
            </div>
          </div>
        ))}
      </div>
      {transactions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add a new transaction.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;