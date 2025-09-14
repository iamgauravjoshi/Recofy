import React, { useState, useEffect } from "react";
import "./Features.css";
import Header from "components/Header";
import Footer from "components/Footer";

const featureCategories = [
  { id: "all", name: "All Features", icon: "🎯" },
  { id: "automation", name: "Automation", icon: "🤖" },
  { id: "management", name: "Management", icon: "🏦" },
  { id: "intelligence", name: "Intelligence", icon: "📊" },
  { id: "support", name: "Support", icon: "🛟" },
];

const detailedFeatures = [
  {
    id: 1,
    title: "Automatic Financial Recording",
    subtitle: "AI-Powered Transaction Processing",
    icon: "📊",
    category: "automation",
    description:
      "Transform your financial workflow with intelligent automation that understands your business patterns and applies proper accounting principles automatically.",
    keyHighlights: [
      "90% reduction in manual entry time",
      "Zero calculation errors",
      "Real-time report generation",
      "Multi-format journal support",
    ],
    details: [
      {
        step: "1",
        title: "Smart Input Processing",
        description:
          "Upload journal entries in any format - Excel, CSV, PDF, or manual entry. Our AI recognizes patterns and structures automatically.",
      },
      {
        step: "2",
        title: "Intelligent Categorization",
        description:
          "Advanced AI categorizes transactions, identifies correct accounts, and applies double-entry bookkeeping principles without manual intervention.",
      },
      {
        step: "3",
        title: "Instant Report Generation",
        description:
          "Get real-time Profit & Loss statements, Balance Sheets, and Cash Flow reports that update automatically with each transaction.",
      },
    ],
    benefits: [
      "Eliminates manual calculation errors completely",
      "Reduces accounting workload by up to 90%",
      "Ensures compliance with accounting standards",
      "Works with businesses of any size or complexity",
      "Supports multiple currencies and tax systems",
      "Provides audit trails for all transactions",
    ],
    technicalSpecs: [
      "Supports 50+ file formats for import",
      "Processes up to 10,000 transactions per minute",
      "99.9% accuracy in transaction categorization",
      "Real-time synchronization across all devices",
    ],
  },
  {
    id: 2,
    title: "Comprehensive Accounts Management",
    subtitle: "Multi-Profile Financial Control",
    icon: "🏦",
    category: "management",
    description:
      "Manage unlimited business entities and personal finances from a single, secure platform with enterprise-grade access controls.",
    keyHighlights: [
      "Unlimited account profiles",
      "Bank-level security",
      "Role-based access control",
      "Cross-device synchronization",
    ],
    details: [
      {
        step: "1",
        title: "Multi-Entity Setup",
        description:
          "Create unlimited business or personal profiles with customized chart of accounts, currencies, and fiscal year settings.",
      },
      {
        step: "2",
        title: "Advanced Security",
        description:
          "Role-based access control with secure authentication, data encryption, and detailed permission management for team collaboration.",
      },
      {
        step: "3",
        title: "Unified Dashboard",
        description:
          "Access all your accounts from a single dashboard with real-time data synchronization and cross-entity reporting capabilities.",
      },
    ],
    benefits: [
      "Manage multiple businesses from one platform",
      "Secure team collaboration with role permissions",
      "Consolidated reporting across all entities",
      "Automatic data backup and recovery",
      "Mobile and desktop synchronization",
      "Customizable chart of accounts per entity",
    ],
    technicalSpecs: [
      "256-bit SSL encryption for all data",
      "SOC 2 Type II compliance",
      "99.99% uptime guarantee",
      "Automatic daily backups with 30-day retention",
    ],
  },
  {
    id: 3,
    title: "Smart Editing & Adjustments",
    subtitle: "Intelligent Data Management",
    icon: "✏️",
    category: "automation",
    description:
      "Advanced editing tools with AI-powered suggestions and bulk operations for efficient financial data management and error correction.",
    keyHighlights: [
      "AI error detection",
      "Bulk editing capabilities",
      "Complete audit trails",
      "Smart correction suggestions",
    ],
    details: [
      {
        step: "1",
        title: "Intelligent Error Detection",
        description:
          "AI continuously monitors your financial data, identifying potential errors, inconsistencies, or unusual patterns that need attention.",
      },
      {
        step: "2",
        title: "Guided Correction Workflow",
        description:
          "Receive step-by-step guidance for corrections with explanations of accounting impact and suggested best practices.",
      },
      {
        step: "3",
        title: "Bulk Operations",
        description:
          "Make multiple adjustments simultaneously with advanced filtering, batch editing, and complete audit trail maintenance.",
      },
    ],
    benefits: [
      "Proactive error identification and prevention",
      "Guided correction workflows for accuracy",
      "Complete audit trail for all changes",
      "Bulk editing saves hours of manual work",
      "Version control for all financial data",
      "Compliance with auditing requirements",
    ],
    technicalSpecs: [
      "Real-time error detection algorithms",
      "Support for bulk operations up to 50,000 records",
      "Complete version history with rollback capability",
      "Advanced filtering and search functionality",
    ],
  },
  {
    id: 4,
    title: "Market Trends & Financial Intelligence",
    subtitle: "Real-time Business Insights",
    icon: "📈",
    category: "intelligence",
    description:
      "Stay informed with real-time market data, financial news, and AI-powered trend analysis for better business decision-making.",
    keyHighlights: [
      "Real-time market data",
      "Industry-specific insights",
      "Competitive analysis",
      "Predictive analytics",
    ],
    details: [
      {
        step: "1",
        title: "Market Intelligence Dashboard",
        description:
          "Track your favorite companies, stock prices, market indices, and economic indicators relevant to your business sector.",
      },
      {
        step: "2",
        title: "Curated Financial News",
        description:
          "AI-curated financial news feed tailored to your industry, business interests, and market segments for informed decision-making.",
      },
      {
        step: "3",
        title: "Predictive Analytics",
        description:
          "Advanced analytics comparing your business performance with market trends, providing insights and forecasting opportunities.",
      },
    ],
    benefits: [
      "Real-time access to market data and trends",
      "Industry-specific news and analysis",
      "Competitive benchmarking insights",
      "Predictive trend indicators for planning",
      "Economic impact analysis on your business",
      "Investment opportunity identification",
    ],
    technicalSpecs: [
      "Real-time data feeds from 50+ financial markets",
      "AI-powered news curation from 1000+ sources",
      "Advanced analytics with machine learning",
      "Custom alerts and notification system",
    ],
  },
  {
    id: 5,
    title: "Integrated Advertising Platform",
    subtitle: "Transparent Marketing Solutions",
    icon: "📢",
    category: "intelligence",
    description:
      "Connect businesses with their target audience through our affordable, transparent advertising ecosystem with detailed performance analytics.",
    keyHighlights: [
      "Transparent pricing",
      "Targeted advertising",
      "Performance analytics",
      "Native integration",
    ],
    details: [
      {
        step: "1",
        title: "Campaign Builder",
        description:
          "Create targeted ad campaigns with intuitive tools for audience selection, budget management, and creative asset optimization.",
      },
      {
        step: "2",
        title: "Native Ad Delivery",
        description:
          "Ads appear naturally within the app experience with smooth animations and non-intrusive placement for better user engagement.",
      },
      {
        step: "3",
        title: "Performance Analytics",
        description:
          "Comprehensive analytics dashboard with ROI measurement, audience insights, and optimization recommendations for campaign success.",
      },
    ],
    benefits: [
      "Transparent, affordable advertising rates",
      "Precise audience targeting capabilities",
      "Real-time campaign performance tracking",
      "Non-intrusive, native ad experience",
      "Detailed ROI and conversion analytics",
      "Flexible budget and scheduling options",
    ],
    technicalSpecs: [
      "Advanced audience targeting with 50+ parameters",
      "Real-time bidding and optimization",
      "Comprehensive analytics with 100+ metrics",
      "A/B testing capabilities for ad optimization",
    ],
  },
  {
    id: 6,
    title: "24/7 Help & Support System",
    subtitle: "Always-Available Assistance",
    icon: "🛟",
    category: "support",
    description:
      "Round-the-clock support through multiple channels with AI-powered assistance and expert consultation to ensure your success.",
    keyHighlights: [
      "24/7 availability",
      "Multi-channel support",
      "Expert consultations",
      "Comprehensive resources",
    ],
    details: [
      {
        step: "1",
        title: "Instant AI Support",
        description:
          "Get immediate help through our AI-powered chat system that understands financial terminology and can resolve common issues instantly.",
      },
      {
        step: "2",
        title: "Knowledge Base",
        description:
          "Access comprehensive documentation, video tutorials, step-by-step guides, and frequently asked questions for self-service support.",
      },
      {
        step: "3",
        title: "Expert Consultation",
        description:
          "Schedule calls with certified financial experts and accounting professionals for complex questions or business guidance.",
      },
    ],
    benefits: [
      "24/7 availability across all time zones",
      "Multi-channel support (chat, email, phone)",
      "Access to certified financial experts",
      "Comprehensive self-service resources",
      "Priority support for business users",
      "Community forums for peer assistance",
    ],
    technicalSpecs: [
      "Average response time under 30 seconds",
      "99.9% support system uptime",
      "Support in 15+ languages",
      "Integration with major help desk platforms",
    ],
  },
];

function FeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedFeature, setExpandedFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredFeatures =
    activeTab === "all"
      ? detailedFeatures
      : detailedFeatures.filter((feature) => feature.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  Comprehensive Feature Overview
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Powerful{" "}
                <span className="text-slate-600 text-gradient">Features</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                Discover every tool and capability that makes Recofy the most
                comprehensive financial management platform for businesses of
                all sizes.
                <span className="block mt-3 text-lg font-medium text-gray-700">
                  6 Core Modules • 50+ Features • 100% Free Access
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="pt-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {featureCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === category.id ? "tab-active" : "tab-inactive"
                } ${isVisible ? `fade-in stagger-${index + 1}` : "opacity-0"}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-card rounded-2xl bg-white overflow-hidden"
              >
                {/* Feature Header */}
                <div
                  onClick={() =>
                    setExpandedFeature(
                      expandedFeature === feature.id ? null : feature.id
                    )
                  }
                  className="p-8 border-b border-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6">
                      <div className="text-4xl">{feature.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-gray-500 mb-4">
                          {feature.subtitle}
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {feature.description}
                        </p>

                        {/* Key Highlights */}
                        <div className="flex flex-wrap gap-4">
                          {feature.keyHighlights.map(
                            (highlight, highlightIndex) => (
                              <div
                                key={highlightIndex}
                                className="bg-gray-50 w-fit text-center rounded-lg p-3 border border-gray-100"
                              >
                                <div className="text-sm font-medium text-gray-800">
                                  {highlight}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors ml-4">
                      <svg
                        className={`w-6 h-6 transition-transform ${
                          expandedFeature === feature.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedFeature === feature.id && (
                  <div className="feature-detail p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* How It Works */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">
                          How It Works
                        </h4>
                        <div className="space-y-6">
                          {feature.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-start space-x-4"
                            >
                              <div className="step-circle w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {detail.step}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-1">
                                  {detail.title}
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {detail.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">
                          Key Benefits
                        </h4>
                        <div className="space-y-3">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <div
                              key={benefitIndex}
                              className="benefit-item flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm leading-relaxed">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">
                          Technical Specifications
                        </h4>
                        <div className="space-y-4">
                          {feature.technicalSpecs.map((spec, specIndex) => (
                            <div
                              key={specIndex}
                              className="bg-white rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700 text-sm font-medium">
                                  {spec}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section
        id="comparison"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Recofy?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compare our comprehensive feature set with traditional financial
              management solutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                      Recofy
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Traditional Software
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Manual Methods
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">Cost</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        100% Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      $50-500/month
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Time intensive
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      AI Automation
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600">✓ Advanced</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Limited
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      None
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      Real-time Market Data
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600">✓ Included</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Extra cost
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Not available
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      24/7 Support
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600">✓ Free</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Premium only
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      None
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      Scalability
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600">✓ Unlimited</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Tier-based pricing
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Not scalable
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FeaturesPage;
