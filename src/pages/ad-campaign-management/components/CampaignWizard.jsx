import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CampaignWizard = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    type: 'display',
    budget: '',
    duration: '30',
    frequency: '15',
    pricingTier: '2999',
    targetAudience: {
      ageRange: '25-45',
      gender: 'all',
      location: 'india',
      interests: []
    },
    creatives: []
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'Info' },
    { id: 2, title: 'Targeting', icon: 'Target' },
    { id: 3, title: 'Budget & Pricing', icon: 'DollarSign' },
    { id: 4, title: 'Creatives', icon: 'Image' },
    { id: 5, title: 'Review', icon: 'CheckCircle' }
  ];

  const campaignTypes = [
    { value: 'display', label: 'Display Ads' },
    { value: 'native', label: 'Native Ads' },
    { value: 'video', label: 'Video Ads' },
    { value: 'banner', label: 'Banner Ads' }
  ];

  const frequencyOptions = [
    { value: '15', label: '15 times per day' },
    { value: '20', label: '20 times per day' },
    { value: '30', label: '30 times per day' }
  ];

  const pricingTiers = [
    { value: '2999', label: 'Basic - ₹2,999', description: 'Standard targeting, basic analytics' },
    { value: '3999', label: 'Professional - ₹3,999', description: 'Advanced targeting, detailed analytics' },
    { value: '4599', label: 'Premium - ₹4,599', description: 'Premium targeting, real-time analytics' }
  ];

  const ageRanges = [
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55+', label: '55+ years' }
  ];

  const genderOptions = [
    { value: 'all', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const locationOptions = [
    { value: 'india', label: 'All India' },
    { value: 'metro', label: 'Metro Cities' },
    { value: 'tier1', label: 'Tier 1 Cities' },
    { value: 'tier2', label: 'Tier 2 Cities' }
  ];

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetingChange = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      targetAudience: {
        ...prev?.targetAudience,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave(campaignData);
    onClose();
    setCampaignData({
      name: '',
      type: 'display',
      budget: '',
      duration: '30',
      frequency: '15',
      pricingTier: '2999',
      targetAudience: {
        ageRange: '25-45',
        gender: 'all',
        location: 'india',
        interests: []
      },
      creatives: []
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Campaign Name"
              type="text"
              placeholder="Enter campaign name"
              value={campaignData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />
            <Select
              label="Campaign Type"
              options={campaignTypes}
              value={campaignData?.type}
              onChange={(value) => handleInputChange('type', value)}
            />
            <Input
              label="Campaign Duration (days)"
              type="number"
              placeholder="30"
              value={campaignData?.duration}
              onChange={(e) => handleInputChange('duration', e?.target?.value)}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Select
              label="Age Range"
              options={ageRanges}
              value={campaignData?.targetAudience?.ageRange}
              onChange={(value) => handleTargetingChange('ageRange', value)}
            />
            <Select
              label="Gender"
              options={genderOptions}
              value={campaignData?.targetAudience?.gender}
              onChange={(value) => handleTargetingChange('gender', value)}
            />
            <Select
              label="Location"
              options={locationOptions}
              value={campaignData?.targetAudience?.location}
              onChange={(value) => handleTargetingChange('location', value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Total Budget (₹)"
              type="number"
              placeholder="50000"
              value={campaignData?.budget}
              onChange={(e) => handleInputChange('budget', e?.target?.value)}
              required
            />
            <Select
              label="Ad Frequency"
              options={frequencyOptions}
              value={campaignData?.frequency}
              onChange={(value) => handleInputChange('frequency', value)}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Pricing Tier
              </label>
              <div className="space-y-3">
                {pricingTiers?.map((tier) => (
                  <div
                    key={tier?.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      campaignData?.pricingTier === tier?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('pricingTier', tier?.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{tier?.label}</h4>
                        <p className="text-sm text-muted-foreground">{tier?.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        campaignData?.pricingTier === tier?.value
                          ? 'border-primary bg-primary' :'border-gray-300'
                      }`}>
                        {campaignData?.pricingTier === tier?.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Upload Creative Assets</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your images, videos, or banners here
              </p>
              <Button variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Choose Files
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Supported formats: JPG, PNG, GIF, MP4, MOV</p>
              <p>Maximum file size: 10MB</p>
              <p>Recommended dimensions: 1200x628px for display ads</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Campaign Name</p>
                  <p className="font-medium text-foreground">{campaignData?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{campaignTypes?.find(t => t?.value === campaignData?.type)?.label}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium text-foreground">₹{new Intl.NumberFormat('en-IN')?.format(campaignData?.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">{campaignData?.duration} days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="font-medium text-foreground">{campaignData?.frequency} times per day</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pricing Tier</p>
                  <p className="font-medium text-foreground">{pricingTiers?.find(t => t?.value === campaignData?.pricingTier)?.label}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-prominent rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Create New Campaign</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step?.id
                    ? 'border-primary bg-primary text-white' :'border-gray-300 text-gray-500'
                }`}>
                  <Icon name={step?.icon} size={16} />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step?.id ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step?.title}
                  </p>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <Icon name="ChevronLeft" size={16} className="mr-2" />
              Previous
            </Button>

            <div className="flex space-x-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext}>
                  Next
                  <Icon name="ChevronRight" size={16} className="ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSave}>
                  <Icon name="Check" size={16} className="mr-2" />
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignWizard;