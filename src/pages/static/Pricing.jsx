import React from "react";
import Header from "components/Header";

const pricing = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for individuals and small projects",
    features: [
      "100 transactions per month",
      "Basic AI processing",
      "5 accounts maximum",
      "Email support",
      "Basic reports",
    ],
    buttonText: "Get Started",
    buttonStyle:
      "border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600",
  },
  {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "Ideal for growing businesses and teams",
    features: [
      "Unlimited transactions",
      "Advanced AI features",
      "Unlimited accounts",
      "Priority support",
      "Advanced reports",
      "Market analysis",
      "Bulk operations",
    ],
    buttonText: "Start Free Trial",
    buttonStyle: "btn-primary text-white",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For large organizations with complex needs",
    features: [
      "Everything in Professional",
      "Multi-company support",
      "Custom integrations",
      "Dedicated support manager",
      "Advanced analytics",
      "White-label options",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonStyle:
      "border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600",
  },
];

function Pricing() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main Section */}
      <section id="pricing" className="pt-28 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible pricing that grows with your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`card-hover bg-white rounded-2xl p-8 shadow-sm border-2 relative ${
                  plan.popular
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
