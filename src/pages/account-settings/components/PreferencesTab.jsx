import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'inr',
    dateFormat: 'dd-mm-yyyy',
    timeFormat: '12-hour',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    dashboard: {
      showWelcomeMessage: true,
      defaultView: 'overview',
      autoRefresh: true,
      compactMode: false
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' }
  ];

  const currencyOptions = [
    { value: 'inr', label: '₹ Indian Rupee (INR)' },
    { value: 'usd', label: '$ US Dollar (USD)' },
    { value: 'eur', label: '€ Euro (EUR)' }
  ];

  const dateFormatOptions = [
    { value: 'dd-mm-yyyy', label: 'DD/MM/YYYY (Indian Standard)' },
    { value: 'mm-dd-yyyy', label: 'MM/DD/YYYY (US Standard)' },
    { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD (ISO Standard)' }
  ];

  const timeFormatOptions = [
    { value: '12-hour', label: '12-hour (AM/PM)' },
    { value: '24-hour', label: '24-hour' }
  ];

  const dashboardViewOptions = [
    { value: 'overview', label: 'Overview Dashboard' },
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'transactions', label: 'Transactions Dashboard' }
  ];

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, checked) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [field]: checked
      }
    }));
  };

  const handleDashboardChange = (field, checked) => {
    setPreferences(prev => ({
      ...prev,
      dashboard: {
        ...prev?.dashboard,
        [field]: checked
      }
    }));
  };

  const handleDashboardSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      dashboard: {
        ...prev?.dashboard,
        [field]: value
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    alert('Preferences saved successfully!');
  };

  const handleResetToDefaults = () => {
    const confirmed = window.confirm('Are you sure you want to reset all preferences to default values?');
    if (confirmed) {
      const defaultPreferences = {
        language: 'en',
        currency: 'inr',
        dateFormat: 'dd-mm-yyyy',
        timeFormat: '12-hour',
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: false
        },
        dashboard: {
          showWelcomeMessage: true,
          defaultView: 'overview',
          autoRefresh: true,
          compactMode: false
        }
      };
      setPreferences(defaultPreferences);
      localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    }
  };

  return (
    <div className="space-y-8">
      {/* Language & Regional Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Language & Regional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Language"
            description="Choose your preferred language"
            options={languageOptions}
            value={preferences?.language}
            onChange={(value) => handleSelectChange('language', value)}
          />

          <Select
            label="Currency"
            description="Default currency for financial data"
            options={currencyOptions}
            value={preferences?.currency}
            onChange={(value) => handleSelectChange('currency', value)}
          />

          <Select
            label="Date Format"
            description="How dates are displayed"
            options={dateFormatOptions}
            value={preferences?.dateFormat}
            onChange={(value) => handleSelectChange('dateFormat', value)}
          />

          <Select
            label="Time Format"
            description="12-hour or 24-hour time display"
            options={timeFormatOptions}
            value={preferences?.timeFormat}
            onChange={(value) => handleSelectChange('timeFormat', value)}
          />
        </div>

        {/* Preview Section */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Date: {preferences?.dateFormat === 'dd-mm-yyyy' ? '14/01/2025' : preferences?.dateFormat === 'mm-dd-yyyy' ? '01/14/2025' : '2025-01-14'}</p>
            <p>Time: {preferences?.timeFormat === '12-hour' ? '10:30 AM' : '10:30'}</p>
            <p>Currency: {preferences?.currency === 'inr' ? '₹1,00,000.00' : preferences?.currency === 'usd' ? '$1,200.00' : '€1,050.00'}</p>
          </div>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Email Notifications"
            description="Receive important updates via email"
            checked={preferences?.notifications?.email}
            onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
          />

          <Checkbox
            label="SMS Notifications"
            description="Get alerts via text messages"
            checked={preferences?.notifications?.sms}
            onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
          />

          <Checkbox
            label="Push Notifications"
            description="Browser and mobile app notifications"
            checked={preferences?.notifications?.push}
            onChange={(e) => handleNotificationChange('push', e?.target?.checked)}
          />

          <Checkbox
            label="Marketing Communications"
            description="Receive promotional offers and updates"
            checked={preferences?.notifications?.marketing}
            onChange={(e) => handleNotificationChange('marketing', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Dashboard Customization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Dashboard Customization</h3>
        <div className="space-y-6">
          <Select
            label="Default Dashboard View"
            description="Choose which dashboard loads by default"
            options={dashboardViewOptions}
            value={preferences?.dashboard?.defaultView}
            onChange={(value) => handleDashboardSelectChange('defaultView', value)}
          />

          <div className="space-y-4">
            <Checkbox
              label="Show Welcome Message"
              description="Display personalized greeting on dashboard"
              checked={preferences?.dashboard?.showWelcomeMessage}
              onChange={(e) => handleDashboardChange('showWelcomeMessage', e?.target?.checked)}
            />

            <Checkbox
              label="Auto-refresh Data"
              description="Automatically update dashboard data every 5 minutes"
              checked={preferences?.dashboard?.autoRefresh}
              onChange={(e) => handleDashboardChange('autoRefresh', e?.target?.checked)}
            />

            <Checkbox
              label="Compact Mode"
              description="Show more information in less space"
              checked={preferences?.dashboard?.compactMode}
              onChange={(e) => handleDashboardChange('compactMode', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleResetToDefaults}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset to Defaults
        </Button>

        <Button
          variant="default"
          onClick={handleSavePreferences}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesTab;