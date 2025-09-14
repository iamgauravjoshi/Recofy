import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoTab = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...personalInfo });

  const handleInputChange = (field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPersonalInfo({ ...editedInfo });
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedInfo({ ...personalInfo });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedInfo(prev => ({
          ...prev,
          profilePhoto: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
            <Image
              src={isEditing ? editedInfo?.profilePhoto : personalInfo?.profilePhoto}
              alt="Profile Photo"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Photo</h3>
          <p className="text-sm text-muted-foreground">
            Upload a professional photo for your profile
          </p>
        </div>
      </div>
      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          value={isEditing ? editedInfo?.firstName : personalInfo?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Last Name"
          type="text"
          value={isEditing ? editedInfo?.lastName : personalInfo?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={isEditing ? editedInfo?.email : personalInfo?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          description="Used for login and notifications"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={isEditing ? editedInfo?.phone : personalInfo?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          description="For account security and support"
          required
        />
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
        {!isEditing ? (
          <Button
            variant="default"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoTab;