import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const SecurityTab = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [loginHistory] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Mumbai, Maharashtra",
      ipAddress: "192.168.1.100",
      timestamp: "2025-01-14 10:30 AM",
      isCurrentSession: true
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, Maharashtra",
      ipAddress: "192.168.1.101",
      timestamp: "2025-01-13 08:45 PM",
      isCurrentSession: false
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "Pune, Maharashtra",
      ipAddress: "192.168.2.50",
      timestamp: "2025-01-12 02:15 PM",
      isCurrentSession: false
    }
  ]);

  const [activeSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Mumbai, Maharashtra",
      lastActive: "Active now",
      isCurrentSession: true
    },
    {
      id: 2,
      device: "Mobile App on iPhone",
      location: "Mumbai, Maharashtra",
      lastActive: "2 hours ago",
      isCurrentSession: false
    }
  ]);

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = async () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    alert('Password changed successfully');
  };

  const handleToggle2FA = async () => {
    if (!twoFactorEnabled) {
      // Simulate 2FA setup
      const confirmed = window.confirm('This will enable two-factor authentication. You will receive a setup code via email. Continue?');
      if (confirmed) {
        setTwoFactorEnabled(true);
        alert('Two-factor authentication has been enabled. Check your email for setup instructions.');
      }
    } else {
      const confirmed = window.confirm('Are you sure you want to disable two-factor authentication?');
      if (confirmed) {
        setTwoFactorEnabled(false);
        alert('Two-factor authentication has been disabled.');
      }
    }
  };

  const handleTerminateSession = (sessionId) => {
    const confirmed = window.confirm('Are you sure you want to terminate this session?');
    if (confirmed) {
      alert('Session terminated successfully');
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your account password
            </p>
          </div>
          <Button
            variant={showPasswordForm ? "outline" : "default"}
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            iconName={showPasswordForm ? "X" : "Key"}
            iconPosition="left"
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </Button>
        </div>

        {showPasswordForm && (
          <div className="space-y-4 pt-4 border-t border-border">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordInputChange('currentPassword', e?.target?.value)}
              placeholder="Enter current password"
              required
            />

            <Input
              label="New Password"
              type="password"
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordInputChange('newPassword', e?.target?.value)}
              placeholder="Enter new password"
              description="Must be at least 8 characters long"
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordInputChange('confirmPassword', e?.target?.value)}
              placeholder="Confirm new password"
              required
            />

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handlePasswordChange}
                loading={isChangingPassword}
                iconName="Save"
                iconPosition="left"
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${twoFactorEnabled ? 'text-accent' : 'text-muted-foreground'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Button
              variant={twoFactorEnabled ? "destructive" : "default"}
              onClick={handleToggle2FA}
              iconName={twoFactorEnabled ? "ShieldOff" : "Shield"}
              iconPosition="left"
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>
        </div>
      </div>
      {/* Login History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Login History</h3>
        <div className="space-y-4">
          {loginHistory?.map((login) => (
            <div
              key={login?.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Monitor" size={20} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {login?.device}
                    {login?.isCurrentSession && (
                      <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {login?.location} • {login?.ipAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">{login?.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div
              key={session?.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Smartphone" size={20} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {session?.device}
                    {session?.isCurrentSession && (
                      <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        This device
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.location} • {session?.lastActive}
                  </p>
                </div>
              </div>
              {!session?.isCurrentSession && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleTerminateSession(session?.id)}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;