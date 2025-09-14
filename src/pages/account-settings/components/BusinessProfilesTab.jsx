import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BusinessProfilesTab = () => {
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: "Tech Solutions Pvt Ltd",
      type: "Private Limited",
      gstNumber: "27AABCT1332L1ZZ",
      financialYear: "april-march",
      isActive: true,
      address: "123 Business Park, Mumbai, Maharashtra 400001"
    },
    {
      id: 2,
      name: "Retail Store",
      type: "Sole Proprietorship",
      gstNumber: "27AABCT1332L1ZY",
      financialYear: "april-march",
      isActive: false,
      address: "456 Market Street, Pune, Maharashtra 411001"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    gstNumber: "",
    financialYear: "april-march",
    address: ""
  });

  const businessTypes = [
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership" },
    { value: "private-limited", label: "Private Limited" },
    { value: "public-limited", label: "Public Limited" },
    { value: "llp", label: "Limited Liability Partnership" }
  ];

  const financialYearOptions = [
    { value: "april-march", label: "April - March (Indian Standard)" },
    { value: "january-december", label: "January - December" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBusiness = () => {
    setShowAddForm(true);
    setFormData({
      name: "",
      type: "",
      gstNumber: "",
      financialYear: "april-march",
      address: ""
    });
  };

  const handleEditBusiness = (business) => {
    setEditingBusiness(business?.id);
    setFormData({
      name: business?.name,
      type: business?.type?.toLowerCase()?.replace(' ', '-'),
      gstNumber: business?.gstNumber,
      financialYear: business?.financialYear,
      address: business?.address
    });
  };

  const handleSaveBusiness = () => {
    if (editingBusiness) {
      setBusinesses(prev => prev?.map(business => 
        business?.id === editingBusiness 
          ? { 
              ...business, 
              ...formData,
              type: businessTypes?.find(t => t?.value === formData?.type)?.label || formData?.type
            }
          : business
      ));
      setEditingBusiness(null);
    } else {
      const newBusiness = {
        id: Date.now(),
        ...formData,
        type: businessTypes?.find(t => t?.value === formData?.type)?.label || formData?.type,
        isActive: false
      };
      setBusinesses(prev => [...prev, newBusiness]);
      setShowAddForm(false);
    }
    
    setFormData({
      name: "",
      type: "",
      gstNumber: "",
      financialYear: "april-march",
      address: ""
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBusiness(null);
    setFormData({
      name: "",
      type: "",
      gstNumber: "",
      financialYear: "april-march",
      address: ""
    });
  };

  const handleSetActive = (businessId) => {
    setBusinesses(prev => prev?.map(business => ({
      ...business,
      isActive: business?.id === businessId
    })));
  };

  const handleDeleteBusiness = (businessId) => {
    if (window.confirm('Are you sure you want to delete this business profile?')) {
      setBusinesses(prev => prev?.filter(business => business?.id !== businessId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Business Profiles</h3>
          <p className="text-sm text-muted-foreground">
            Manage multiple business accounts and switch between them
          </p>
        </div>
        <Button
          variant="default"
          onClick={handleAddBusiness}
          iconName="Plus"
          iconPosition="left"
        >
          Add Business
        </Button>
      </div>
      {/* Add/Edit Form */}
      {(showAddForm || editingBusiness) && (
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <h4 className="text-md font-medium text-foreground mb-4">
            {editingBusiness ? 'Edit Business Profile' : 'Add New Business Profile'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Business Name"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              placeholder="Enter business name"
              required
            />

            <Select
              label="Business Type"
              options={businessTypes}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              placeholder="Select business type"
              required
            />

            <Input
              label="GST Number"
              type="text"
              value={formData?.gstNumber}
              onChange={(e) => handleInputChange('gstNumber', e?.target?.value)}
              placeholder="Enter GST number"
              description="15-digit GST identification number"
            />

            <Select
              label="Financial Year"
              options={financialYearOptions}
              value={formData?.financialYear}
              onChange={(value) => handleInputChange('financialYear', value)}
            />
          </div>

          <Input
            label="Business Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            placeholder="Enter complete business address"
            className="mb-6"
          />

          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSaveBusiness}
              iconName="Save"
              iconPosition="left"
            >
              {editingBusiness ? 'Update Business' : 'Add Business'}
            </Button>
          </div>
        </div>
      )}
      {/* Business List */}
      <div className="space-y-4">
        {businesses?.map((business) => (
          <div
            key={business?.id}
            className={`bg-card border rounded-lg p-6 transition-all duration-200 ${
              business?.isActive ? 'border-primary shadow-moderate' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-foreground">
                    {business?.name}
                  </h4>
                  {business?.isActive && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 text-foreground">{business?.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">GST:</span>
                    <span className="ml-2 text-foreground font-data">{business?.gstNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Financial Year:</span>
                    <span className="ml-2 text-foreground">
                      {financialYearOptions?.find(fy => fy?.value === business?.financialYear)?.label}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="text-muted-foreground text-sm">Address:</span>
                  <p className="text-foreground text-sm mt-1">{business?.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {!business?.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetActive(business?.id)}
                    iconName="CheckCircle"
                    iconPosition="left"
                  >
                    Set Active
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditBusiness(business)}
                  iconName="Edit"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteBusiness(business?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessProfilesTab;