import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReportCustomization = ({ activeTab, onCustomizationChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customization, setCustomization] = useState({
    grouping: 'standard',
    showComparisons: true,
    showPercentages: true,
    showVariances: true,
    includeNotes: false,
    exportFormat: 'pdf',
    template: 'professional'
  });

  const groupingOptions = [
    { value: 'standard', label: 'Standard Grouping' },
    { value: 'detailed', label: 'Detailed Breakdown' },
    { value: 'summary', label: 'Summary View' },
    { value: 'custom', label: 'Custom Categories' }
  ];

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' },
    { value: 'json', label: 'JSON Data' }
  ];

  const templateOptions = [
    { value: 'professional', label: 'Professional Template' },
    { value: 'modern', label: 'Modern Template' },
    { value: 'classic', label: 'Classic Template' },
    { value: 'minimal', label: 'Minimal Template' }
  ];

  const handleCustomizationChange = (key, value) => {
    const newCustomization = { ...customization, [key]: value };
    setCustomization(newCustomization);
    onCustomizationChange?.(newCustomization);
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting ${activeTab} report as ${format}`);
    // In a real application, this would trigger the actual export
  };

  const handleScheduleReport = () => {
    // Mock schedule functionality
    console.log('Scheduling report generation');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Report Customization</h3>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-border">
          <div className="space-y-6">
            {/* Display Options */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Display Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Account Grouping"
                  options={groupingOptions}
                  value={customization?.grouping}
                  onChange={(value) => handleCustomizationChange('grouping', value)}
                />
                
                <Select
                  label="Report Template"
                  options={templateOptions}
                  value={customization?.template}
                  onChange={(value) => handleCustomizationChange('template', value)}
                />
              </div>
              
              <div className="mt-4 space-y-3">
                <Checkbox
                  label="Show comparison data"
                  description="Include previous period comparisons"
                  checked={customization?.showComparisons}
                  onChange={(e) => handleCustomizationChange('showComparisons', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show percentage changes"
                  description="Display percentage variance calculations"
                  checked={customization?.showPercentages}
                  onChange={(e) => handleCustomizationChange('showPercentages', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show variance analysis"
                  description="Include variance columns and analysis"
                  checked={customization?.showVariances}
                  onChange={(e) => handleCustomizationChange('showVariances', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include explanatory notes"
                  description="Add footnotes and accounting method explanations"
                  checked={customization?.includeNotes}
                  onChange={(e) => handleCustomizationChange('includeNotes', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Export Options */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-foreground mb-3">Export & Sharing</h4>
              
              <div className="mb-4">
                <Select
                  label="Export Format"
                  options={exportFormatOptions}
                  value={customization?.exportFormat}
                  onChange={(value) => handleCustomizationChange('exportFormat', value)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleExport(customization?.exportFormat)}
                >
                  Export Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                >
                  Email Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={handleScheduleReport}
                >
                  Schedule Auto-Generation
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Link
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  className="justify-start"
                >
                  Save Template
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  className="justify-start"
                >
                  Duplicate Report
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Printer"
                  iconPosition="left"
                  className="justify-start"
                >
                  Print Preview
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  className="justify-start"
                >
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Report Notes */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-foreground mb-3">Report Information</h4>
              <div className="bg-muted/30 rounded-lg p-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">Last Updated:</span>
                    <div className="font-medium text-foreground">
                      {new Date()?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Data Source:</span>
                    <div className="font-medium text-foreground">Transaction Management System</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Report Type:</span>
                    <div className="font-medium text-foreground">
                      {activeTab === 'pl' && 'Profit & Loss Statement'}
                      {activeTab === 'balance' && 'Balance Sheet'}
                      {activeTab === 'cashflow' && 'Cash Flow Statement'}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Currency:</span>
                    <div className="font-medium text-foreground">Indian Rupee (₹)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCustomization;