import React, { useState, useEffect } from "react";
import "./about-us.css";
import Header from "components/Header";

const targetAudience = [
  {
    type: "Shopkeepers & Local Businesses",
    description:
      "Perfect for daily transaction recording, inventory management, and basic financial reporting.",
    needs: [
      "Simple transaction entry",
      "Daily sales tracking",
      "Basic profit calculations",
      "Tax preparation support",
    ],
  },
  {
    type: "Small & Medium Businesses",
    description:
      "Comprehensive financial management with advanced features for growing businesses.",
    needs: [
      "Multi-location accounting",
      "Employee expense tracking",
      "Advanced reporting",
      "Cash flow management",
    ],
  },
  {
    type: "Large Enterprises & MNCs",
    description:
      "Enterprise-grade features with unlimited scalability and advanced integrations.",
    needs: [
      "Multi-entity consolidation",
      "Advanced analytics",
      "Custom integrations",
      "Compliance reporting",
    ],
  },
];

function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 minimal-gradient">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Record Finance Smartly
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                About <span className="text-accent">Recofy</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                We're democratizing financial management by making
                enterprise-grade accounting tools accessible to everyone—from
                small shopkeepers to large corporations.
                <span className="block mt-3 text-lg font-medium text-gray-700">
                  100% Free Core Features • AI-Powered Automation •
                  Enterprise-Grade Security
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                The Problem We're Solving
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Small businesses face a critical challenge: expensive, complex
                  financial management tools that cost thousands monthly, making
                  professional accounting inaccessible to millions who need it
                  most.
                </p>
                <p>
                  Traditional solutions force business owners to choose between
                  expensive software or manual bookkeeping, while lacking access
                  to real-time market insights and affordable advertising
                  platforms.
                </p>
                <p>
                  This creates an unfair advantage for larger companies and
                  limits the growth potential of small businesses that form the
                  backbone of our economy.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Our Solution
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      100% Free Core Features
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Enterprise-grade accounting tools available to everyone at
                      no cost
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Transparent Advertising Revenue
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Sustainable business model through affordable, transparent
                      advertising
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Unlimited Scalability
                    </h4>
                    <p className="text-gray-600 text-sm">
                      From corner shops to multinational corporations, one
                      platform fits all
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Target Audience Section */}
      <section
        id="audience"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-slate-600">
              Recofy adapts to your business size and complexity, providing the
              right tools for every stage of growth.
            </p>
          </div>

          <div className="space-y-8">
            {targetAudience.map((audience, index) => (
              <div key={index} className="card-minimal bg-white rounded-xl p-8">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {audience.type}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">
                      Specific Needs We Address:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {audience.needs.map((need, needIndex) => (
                        <div
                          key={needIndex}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span className="text-slate-600 text-sm">{need}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Model Section */}
      <section id="revenue" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Sustainable Revenue Model
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We keep Recofy free for users by partnering with businesses
              through transparent, affordable advertising that benefits everyone
              in the ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                How It Works
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="step-number w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Users Get Free Access
                    </h4>
                    <p className="text-slate-600 text-sm">
                      All core financial management features remain completely
                      free for every user, forever.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="step-number w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Businesses Advertise Affordably
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Companies run targeted ads at transparent, affordable
                      rates with guaranteed frequency and performance tracking.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="step-number w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Everyone Benefits
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Users access professional tools, advertisers reach
                      targeted audiences, and we sustain platform development.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Advertising Benefits
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="font-semibold text-slate-800">
                      Native Integration
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">
                    Ads blend naturally with app content for better user
                    experience
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="font-semibold text-slate-800">
                      Targeted Delivery
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">
                    Reach the right audience based on business type and
                    interests
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="font-semibold text-slate-800">
                      Performance Analytics
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">
                    Real-time tracking and detailed campaign performance reports
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-6">
                Contact us for custom advertising packages tailored to your
                business needs and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Impact & Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm border border-purple-100">
                💪
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Economic Empowerment
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Democratizing financial management tools, enabling small
                businesses to compete with larger enterprises through
                professional-grade analytics and reporting.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm border border-purple-100">
                🎯
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Market Efficiency
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Creating direct advertising channels between businesses and
                target audiences, reducing marketing costs while improving
                campaign effectiveness.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm border border-purple-100">
                🚀
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Digital Transformation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accelerating digitization of traditional businesses with
                real-time market insights and financial trends that drive
                informed decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-gradient mb-4">
                Recofy
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simplifying financial management with AI-powered automation for
                modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; 2024 Recofy. All rights reserved. Record Finance Smartly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
