import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkOperationsToolbar = ({ 
  selectedCount, 
  onBulkEdit, 
  onBulkDelete, 
  onBulkCategorize,
  onClearSelection 
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categoryOptions = [
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

  const handleBulkCategorize = () => {
    if (bulkCategory) {
      onBulkCategorize(bulkCategory);
      setBulkCategory('');
      setShowBulkActions(false);
    }
  };

  const handleBulkDelete = () => {
    onBulkDelete();
    setShowDeleteConfirm(false);
    setShowBulkActions(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} transaction{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {!showBulkActions && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(true)}
                iconName="Settings"
                iconPosition="left"
              >
                Bulk Actions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                iconName="X"
                iconPosition="left"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        {showBulkActions && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Select
                placeholder="Change category"
                options={categoryOptions}
                value={bulkCategory}
                onChange={setBulkCategory}
                className="w-48"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkCategorize}
                disabled={!bulkCategory}
                iconName="Tag"
              >
                Apply
              </Button>
            </div>

            <div className="h-4 w-px bg-border" />

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkEdit}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Selected
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Selected
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBulkActions(false)}
              iconName="X"
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-card border border-border rounded-lg shadow-prominent p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-full">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}?
                </p>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm text-warning">
                  This action cannot be undone. The selected transactions will be permanently removed from your records.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete {selectedCount} Transaction{selectedCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperationsToolbar;