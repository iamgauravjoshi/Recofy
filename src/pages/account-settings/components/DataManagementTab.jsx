import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagementTab = () => {
  const [exportSettings, setExportSettings] = useState({
    format: 'json',
    includeTransactions: true,
    includeReports: true,
    includeSettings: false,
    dateRange: 'all-time'
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'weekly',
    includeAttachments: true
  });

  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const exportFormatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'excel', label: 'Excel Format (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const dateRangeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'last-year', label: 'Last 12 Months' },
    { value: 'current-year', label: 'Current Financial Year' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleExportSettingChange = (field, value) => {
    setExportSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportCheckboxChange = (field, checked) => {
    setExportSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleBackupSettingChange = (field, value) => {
    setBackupSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackupCheckboxChange = (field, checked) => {
    setBackupSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock download
    const mockData = {
      exportDate: new Date()?.toISOString(),
      settings: exportSettings,
      message: "This is a mock export. In a real application, this would contain your actual data."
    };
    
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recofy-export-${new Date()?.toISOString()?.split('T')?.[0]}.${exportSettings?.format}`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    alert('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText === 'DELETE MY ACCOUNT') {
      alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.');
      setShowDeleteConfirmation(false);
      setDeleteConfirmationText('');
    } else {
      alert('Please type "DELETE MY ACCOUNT" exactly to confirm deletion.');
    }
  };

  const calculateDataSize = () => {
    // Mock calculation based on selected options
    let size = 0;
    if (exportSettings?.includeTransactions) size += 2.5;
    if (exportSettings?.includeReports) size += 1.2;
    if (exportSettings?.includeSettings) size += 0.1;
    return size?.toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Data Export Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Download" size={24} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
            <p className="text-sm text-muted-foreground">
              Download your account data in various formats
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Select
            label="Export Format"
            description="Choose the file format for export"
            options={exportFormatOptions}
            value={exportSettings?.format}
            onChange={(value) => handleExportSettingChange('format', value)}
          />

          <Select
            label="Date Range"
            description="Select data time period"
            options={dateRangeOptions}
            value={exportSettings?.dateRange}
            onChange={(value) => handleExportSettingChange('dateRange', value)}
          />
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="text-md font-medium text-foreground">Include in Export</h4>
          
          <Checkbox
            label="Transaction Data"
            description="All financial transactions and journal entries"
            checked={exportSettings?.includeTransactions}
            onChange={(e) => handleExportCheckboxChange('includeTransactions', e?.target?.checked)}
          />

          <Checkbox
            label="Financial Reports"
            description="Generated P&L statements and balance sheets"
            checked={exportSettings?.includeReports}
            onChange={(e) => handleExportCheckboxChange('includeReports', e?.target?.checked)}
          />

          <Checkbox
            label="Account Settings"
            description="User preferences and configuration data"
            checked={exportSettings?.includeSettings}
            onChange={(e) => handleExportCheckboxChange('includeSettings', e?.target?.checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-6">
          <div>
            <p className="text-sm font-medium text-foreground">Estimated Export Size</p>
            <p className="text-xs text-muted-foreground">Based on selected options</p>
          </div>
          <span className="text-lg font-semibold text-primary">{calculateDataSize()} MB</span>
        </div>

        <Button
          variant="default"
          onClick={handleExportData}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          fullWidth
        >
          {isExporting ? 'Preparing Export...' : 'Export Data'}
        </Button>
      </div>
      {/* Backup Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Shield" size={24} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Backup Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure automatic data backup preferences
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Checkbox
            label="Enable Automatic Backup"
            description="Automatically backup your data to secure cloud storage"
            checked={backupSettings?.autoBackup}
            onChange={(e) => handleBackupCheckboxChange('autoBackup', e?.target?.checked)}
          />

          {backupSettings?.autoBackup && (
            <div className="ml-6 space-y-4">
              <Select
                label="Backup Frequency"
                description="How often to create automatic backups"
                options={backupFrequencyOptions}
                value={backupSettings?.frequency}
                onChange={(value) => handleBackupSettingChange('frequency', value)}
              />

              <Checkbox
                label="Include File Attachments"
                description="Backup uploaded documents and receipts (increases backup size)"
                checked={backupSettings?.includeAttachments}
                onChange={(e) => handleBackupCheckboxChange('includeAttachments', e?.target?.checked)}
              />
            </div>
          )}

          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Last Backup</p>
                <p className="text-xs text-muted-foreground">
                  January 13, 2025 at 11:30 PM • Next backup: January 20, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Recovery */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="RefreshCw" size={24} className="text-secondary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Recovery</h3>
            <p className="text-sm text-muted-foreground">
              Restore data from previous backups
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Backup from January 13, 2025</p>
                <p className="text-xs text-muted-foreground">Size: 3.2 MB • Complete backup</p>
              </div>
              <Button variant="outline" size="sm" iconName="Download">
                Restore
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Backup from January 6, 2025</p>
                <p className="text-xs text-muted-foreground">Size: 2.8 MB • Complete backup</p>
              </div>
              <Button variant="outline" size="sm" iconName="Download">
                Restore
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-card border border-error/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="AlertTriangle" size={24} className="text-error" />
          <div>
            <h3 className="text-lg font-semibold text-error">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>

        {!showDeleteConfirmation ? (
          <div className="space-y-4">
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Before you delete:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Export your data if you want to keep it</li>
                <li>• Cancel any active subscriptions</li>
                <li>• This action cannot be undone</li>
                <li>• All data will be permanently deleted within 30 days</li>
              </ul>
            </div>

            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete My Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-foreground mb-2">
                Type <strong>"DELETE MY ACCOUNT"</strong> to confirm deletion:
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm"
                placeholder="Type DELETE MY ACCOUNT"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setDeleteConfirmationText('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText !== 'DELETE MY ACCOUNT'}
                iconName="Trash2"
                iconPosition="left"
              >
                Confirm Deletion
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagementTab;