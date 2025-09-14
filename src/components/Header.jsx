import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./AppIcon";
import Button from "./ui/Button";

const navigationItems = [
  { label: "Dashboard", path: "/main-dashboard", icon: "LayoutDashboard" },
  { label: "About Us", path: "/about-us", icon: "Building2" },
  { label: "Pricing", path: "/pricing", icon: "Receipt" },
  { label: "Features", path: "/features", icon: "TrendingUp" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => location?.pathname === path;

  return (
    <>
      <header className="bg-white shadow-sm md:shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-[#2675f4] rounded-md">
                <Icon name="DollarSign" size={20} color="white" className="" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">Recofy</h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/about-us"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  About
                </a>
                <a
                  href="/features"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Features
                </a>
                <a
                  href="/pricing"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Pricing
                </a>
                <a
                  href="/auth/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Get Started
                </a>
              </div>
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
                  className={`flex items-center space-x-3 p-4 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item?.path)
                      ? "bg-[#498efe] text-white"
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
    </>
  );
}

export default Header;
