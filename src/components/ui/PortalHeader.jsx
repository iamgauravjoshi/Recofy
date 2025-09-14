import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Dashboard", path: "/main-dashboard", icon: "LayoutDashboard" },
    { label: "Transactions", path: "/transaction-management", icon: "Receipt" },
    { label: "Reports", path: "/financial-reports", icon: "BarChart3" },
    { label: "Market", path: "/stock-market-tracker", icon: "TrendingUp" },
    {
      label: "Advertising",
      path: "/ad-campaign-management",
      icon: "Megaphone",
    },
  ];

  const secondaryItems = [
    { label: "Settings", path: "/account-settings", icon: "Settings" },
  ];

  const isActiveRoute = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // flex justify-between items-center h-16

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-[#1e40af] rounded-md">
                <Icon name="DollarSign" size={20} color="white" className="" />
              </div>
              <h1 className="text-2xl font-bold text-[#1e40af]">Recofy</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActiveRoute(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Settings - Desktop Only */}
              <Link
                to="/account-settings"
                className={`hidden lg:flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute("/account-settings")
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name="Settings" size={16} />
                <span>Settings</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon
                    name="ChevronDown"
                    className={`text-gray-600 ${
                      isProfileDropdownOpen && "rotate-180"
                    }`}
                    size={14}
                  />
                </Button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-moderate z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">
                          John Doe
                        </p>
                        <p className="text-xs text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                      <Link
                        to="/account-settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Icon name="User" size={14} />
                        <span>Profile</span>
                      </Link>
                      <a
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted text-left"
                        href="/auth/login"
                      >
                        <Icon name="LogOut" size={14} />
                        <span>Sign out</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="lg:hidden"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-prominent animate-slide-in-from-top">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item?.path)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {/* Click outside handler for profile dropdown */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
