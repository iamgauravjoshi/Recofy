import React, { useState } from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Icon from "../../components/AppIcon";
import PersonalInfoTab from "./components/PersonalInfoTab";
import BusinessProfilesTab from "./components/BusinessProfilesTab";
import SecurityTab from "./components/SecurityTab";
import PreferencesTab from "./components/PreferencesTab";
import DataManagementTab from "./components/DataManagementTab";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "personal",
      label: "Personal Info",
      icon: "User",
      component: PersonalInfoTab,
    },
    {
      id: "business",
      label: "Business Profiles",
      icon: "Building2",
      component: BusinessProfilesTab,
    },
    {
      id: "security",
      label: "Security",
      icon: "Shield",
      component: SecurityTab,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: "Settings",
      component: PreferencesTab,
    },
    {
      id: "data",
      label: "Data Management",
      icon: "Database",
      component: DataManagementTab,
    },
  ];

  const ActiveComponent = tabs?.find((tab) => tab?.id === activeTab)?.component;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Account Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your profile, security, and application preferences
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab?.id
                          ? "bg-primary text-primary-foreground shadow-subtle"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden">
              <div className="bg-card border border-border rounded-lg mb-6">
                <button
                  onClick={toggleMobileMenu}
                  className="w-full flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={tabs?.find((tab) => tab?.id === activeTab)?.icon}
                      size={20}
                    />
                    <span className="font-medium text-foreground">
                      {tabs?.find((tab) => tab?.id === activeTab)?.label}
                    </span>
                  </div>
                  <Icon
                    name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-muted-foreground"
                  />
                </button>

                {isMobileMenuOpen && (
                  <div className="border-t border-border">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => {
                          setActiveTab(tab?.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                          activeTab === tab?.id
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon name={tab?.icon} size={20} />
                        <span className="font-medium">{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AccountSettings;
