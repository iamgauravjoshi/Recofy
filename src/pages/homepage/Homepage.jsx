import React, { useState, useEffect } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";

const demoCards = [
  {
    title: "AI Transaction Recording",
    input: "Sold products for 25,000 cash",
    output: { debit: "Cash: ₹25,000", credit: "Sales: ₹25,000" },
  },
  {
    title: "Account Balance Update",
    input: "Current account balances",
    output: { cash: "₹45,000", sales: "₹125,000" },
  },
  {
    title: "Market Data Integration",
    input: "Live stock prices",
    output: { aapl: "$175.43 (+2.34%)", googl: "$2,847 (-0.53%)" },
  },
];

const features = [
  {
    title: "Automatic Recording",
    description:
      "Just pass the journal, and Recofy automatically records all accounts and prepares P&L statements and Balance Sheets.",
    icon: "🤖",
    iconBg: "bg-indigo-100",
    color: "bg-blue-50 border-blue-100",
  },
  {
    title: "Account Management",
    description:
      "Create accounts, login/logout, view accounts anytime, and manage multiple personal or business profiles easily.",
    icon: "👤",
    iconBg: "bg-green-100",
    color: "bg-green-50 border-green-100",
  },
  {
    title: "Easy Editing",
    description:
      "Comprehensive data editing tools to adjust and modify your accounts whenever needed.",
    icon: "✏️",
    iconBg: "bg-yellow-100",
    color: "bg-purple-50 border-purple-100",
  },
  {
    title: "Market Trend Analysis",
    description:
      "Dashboard with trend analysis, stock market insights, and all the financial news you need to know.",
    icon: "📈",
    iconBg: "bg-purple-100",
    color: "bg-orange-50 border-orange-100",
  },
  {
    title: "Ad Integration",
    description:
      "Native ad placement with sliding effects, real-time analytics, and targeted delivery system.",
    icon: "📢",
    iconBg: "bg-red-100",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock problem-solving tools and support to help you whenever you need assistance.",
    icon: "🆘",
    iconBg: "bg-blue-100",
    color: "bg-red-50 border-red-100",
  },
];

function homepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Smooth scrolling for navigation links
    const smoothScrollHandler = (e) => {
      const target = document.querySelector(e.target.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Attach smooth scrolling event listeners
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", smoothScrollHandler);
    });

    // Scroll effect for navigation background
    const scrollHandler = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 100) {
        nav.classList.add("bg-white/95", "backdrop-blur-sm");
      } else {
        nav.classList.remove("bg-white/95", "backdrop-blur-sm");
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", scrollHandler);

    // Clean up event listeners on component unmount
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", smoothScrollHandler);
      });
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="bg-gray-50 homepage">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  AI-Powered Financial Management
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Simplify Your
                <span className="block text-gradient">Financial Workflow</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform complex accounting tasks into simple conversations.
                Our AI understands natural language and automates your financial
                management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/main-dashboard")}
                  className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
              <div className="demo-card rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Live Demo
                  </h3>
                  <div className="flex space-x-2">
                    {demoCards.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          activeDemo === index ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">
                      {demoCards[activeDemo].title}
                    </div>
                    <div className="font-medium text-gray-900">
                      {demoCards[activeDemo].input}
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-2">AI Result</div>
                    <div className="space-y-2">
                      {Object.entries(demoCards[activeDemo].output).map(
                        ([key, value], index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-700 capitalize">
                              {key}:
                            </span>
                            <span className="font-medium text-gray-900">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Target Users */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From corner shops to multinational corporations
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Shopkeepers
              </h3>
              <p className="text-gray-600">
                Simple tools for daily transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Small Businesses
              </h3>
              <p className="text-gray-600">Professional accounting made easy</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏭</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Medium Enterprises
              </h3>
              <p className="text-gray-600">Scalable financial management</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Large Corporates
              </h3>
              <p className="text-gray-600">Enterprise-grade features</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center bg-white">
        <div className="flex gap-1">
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financial management application designed to streamline your
              workflow and boost productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card-hover bg-white rounded-xl p-8 shadow-sm border-2 ${feature.color}`}
              >
                {/* <div className="w-16 h-16 feature-icon rounded-xl flex items-center justify-center text-3xl mb-6">
                  {feature.icon}
                </div> */}
                <div
                  className={`w-14 h-14 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center bg-white">
        <div className="flex gap-1">
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
          <span className="h-2 w-2 bg-blue-100 rounded-full"></span>
        </div>
      </div>

      {/*  Impact & Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Market Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming financial management for businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Economic Empowerment
              </h3>
              <p className="text-gray-500 text-base">
                Democratizes financial management tools, enabling small
                businesses to compete with larger enterprises through
                professional-grade analytics.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Market Efficiency
              </h3>
              <p className="text-gray-500 text-base">
                Creates direct advertising channels between businesses and
                target audiences, reducing marketing costs while improving
                campaign effectiveness.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Digital Transformation
              </h3>
              <p className="text-gray-500 text-base">
                Accelerates digitization of traditional businesses, providing
                real-time market insights and financial trends for informed
                decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Financial Management?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of businesses already using Recofy to manage their
              finances smartly and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/auth/login")}
                className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-colors">
                Contact Sales
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default homepage;
