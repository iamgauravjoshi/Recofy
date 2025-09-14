import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date()?.toISOString()?.split('T')?.[0],
    description: '',
    amount: '',
    type: 'debit',
    category: '',
    account: '',
    reference: '',
    attachment: null
  });

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const accountOptions = [
    { value: 'cash', label: 'Cash Account' },
    { value: 'bank-sbi', label: 'SBI Current Account' },
    { value: 'bank-hdfc', label: 'HDFC Savings Account' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'petty-cash', label: 'Petty Cash' },
    { value: 'investment', label: 'Investment Account' }
  ];

  const typeOptions = [
    { value: 'debit', label: 'Debit (Expense)' },
    { value: 'credit', label: 'Credit (Income)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // AI-powered suggestions based on description
    if (field === 'description' && value?.length > 3) {
      generateAISuggestions(value);
    }
  };

  const generateAISuggestions = (description) => {
    setIsProcessing(true);
    
    // Mock AI suggestions based on description keywords
    setTimeout(() => {
      const suggestions = [];
      const desc = description?.toLowerCase();
      
      if (desc?.includes('salary') || desc?.includes('payment received')) {
        suggestions?.push({
          category: 'income',
          account: 'bank-sbi',
          type: 'credit'
        });
      } else if (desc?.includes('office') || desc?.includes('supplies')) {
        suggestions?.push({
          category: 'office',
          account: 'petty-cash',
          type: 'debit'
        });
      } else if (desc?.includes('travel') || desc?.includes('transport')) {
        suggestions?.push({
          category: 'travel',
          account: 'credit-card',
          type: 'debit'
        });
      } else if (desc?.includes('electricity') || desc?.includes('water') || desc?.includes('internet')) {
        suggestions?.push({
          category: 'utilities',
          account: 'bank-hdfc',
          type: 'debit'
        });
      } else if (desc?.includes('marketing') || desc?.includes('advertisement')) {
        suggestions?.push({
          category: 'marketing',
          account: 'bank-sbi',
          type: 'debit'
        });
      }
      
      setAiSuggestions(suggestions);
      setIsProcessing(false);
    }, 1000);
  };

  const applySuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      category: suggestion?.category,
      account: suggestion?.account,
      type: suggestion?.type
    }));
    setAiSuggestions([]);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const transaction = {
      id: Date.now(),
      date: formData?.date,
      description: formData?.description,
      amount: parseFloat(formData?.amount),
      type: formData?.type,
      category: formData?.category,
      account: accountOptions?.find(acc => acc?.value === formData?.account)?.label || formData?.account,
      reference: formData?.reference,
      attachment: formData?.attachment,
      createdAt: new Date()?.toISOString()
    };
    
    onAdd(transaction);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      date: new Date()?.toISOString()?.split('T')?.[0],
      description: '',
      amount: '',
      type: 'debit',
      category: '',
      account: '',
      reference: '',
      attachment: null
    });
    setAiSuggestions([]);
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, attachment: file }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-prominent w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Plus" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Add New Transaction</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Transaction Date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              required
            />

            <Select
              label="Transaction Type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />
          </div>

          <Input
            type="text"
            label="Description"
            placeholder="Enter transaction description..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            required
          />

          {/* AI Suggestions */}
          {aiSuggestions?.length > 0 && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">AI Suggestions</span>
              </div>
              {aiSuggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full text-left p-3 bg-card border border-border rounded-md hover:bg-muted transition-colors mb-2 last:mb-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground capitalize">
                        {suggestion?.category?.replace('-', ' ')} • {suggestion?.type === 'credit' ? 'Income' : 'Expense'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Account: {accountOptions?.find(acc => acc?.value === suggestion?.account)?.label}
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Processing AI suggestions...</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Amount (₹)"
              placeholder="0.00"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              required
              min="0"
              step="0.01"
            />

            <Select
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
          </div>

          <Select
            label="Account"
            placeholder="Select account"
            options={accountOptions}
            value={formData?.account}
            onChange={(value) => handleInputChange('account', value)}
            required
          />

          <Input
            type="text"
            label="Reference Number (Optional)"
            placeholder="Transaction reference or invoice number"
            value={formData?.reference}
            onChange={(e) => handleInputChange('reference', e?.target?.value)}
          />

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="Upload" size={24} className="text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload receipt or invoice
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG, DOC (Max 5MB)
                </span>
              </label>
              {formData?.attachment && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-foreground">
                  <Icon name="File" size={16} />
                  <span>{formData?.attachment?.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                    iconName="X"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" iconName="Plus" iconPosition="left">
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;