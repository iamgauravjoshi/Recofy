import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainDashboard from "./pages/main-dashboard";
import AccountSettings from "./pages/account-settings";
import FinancialReports from "./pages/financial-reports";
import TransactionManagement from "./pages/transaction-management";
import AdCampaignManagement from "./pages/ad-campaign-management";
import StockMarketTracker from "./pages/stock-market-tracker";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Homepage from "./pages/homepage/Homepage";
import AboutUs from "pages/static/AboutUs";
import FeaturesPage from "pages/static/Features";
import Pricing from "pages/static/Pricing";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Register />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/" element={<MainDashboard />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          <Route
            path="/transaction-management"
            element={<TransactionManagement />}
          />
          <Route
            path="/ad-campaign-management"
            element={<AdCampaignManagement />}
          />
          <Route
            path="/stock-market-tracker"
            element={<StockMarketTracker />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
