import { useState } from "react";
import { Check, ArrowLeft, Star, Shield, Users } from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";

const PricingSection = () => {
  const [planType, setPlanType] = useState("personal");

  const plans = {
    personal: [
      {
        name: "Free",
        price: "0",
        description: "Explore how AI can help you with everyday tasks",
        features: [
          "Access to Lumin",
          "Standard voice chats",
          "Limited access to Lumin",
          "Limited access to file uploads, advanced data analysis, web browsing, and image generation",
        ],
        buttonText: "Your current plan",
        popular: false,
        disabled: true,
        icon: <Star className="w-6 h-6" />,
      },
      {
        name: "Plus",
        price: "180",
        description:
          "Level up productivity and creativity with expanded access",
        features: [
          "Everything in Free",
          "Extended limits on messaging, file uploads, advanced data analysis, and image generation",
          "Access to advanced voice and video inputs",
          "Limited access to Lumin",
          "Opportunities to test new features",
          "Create and use projects and custom Lumin",
          "Limited access to Lumin video generation",
        ],
        buttonText: "Get Plus",
        popular: true,
        tag: "POPULAR",
        icon: <Shield className="w-6 h-6" />,
      },
      {
        name: "Pro",
        price: "250",
        description: "Get the best of LuminAI with the highest level of access",
        features: [
          "Everything in Plus",
          "Unlimited access to Lumin and advanced voice",
          "Higher limits for video and screensharing in advanced voice",
          "Access to Lumin pro mode, which uses more compute for the best answers",
          "Extended access to Sora video generation",
        ],
        buttonText: "Get Pro",
        popular: false,
        icon: <Shield className="w-6 h-6" />,
      },
    ],
    business: [
      {
        name: "Starter",
        price: "300",
        description: "Perfect for small teams getting started with AI",
        features: [
          "5 team members included",
          "Advanced team management",
          "Shared workspace and resources",
          "Priority support",
          "Basic analytics dashboard",
        ],
        buttonText: "Start Trial",
        popular: false,
        icon: <Users className="w-6 h-6" />,
      },
      {
        name: "Business",
        price: "500",
        description: "Ideal for growing businesses requiring more capabilities",
        features: [
          "15 team members included",
          "Everything in Starter",
          "Advanced security features",
          "Custom integration options",
          "Advanced analytics and reporting",
          "24/7 premium support",
          "Team training sessions",
        ],
        buttonText: "Contact Sales",
        popular: true,
        tag: "RECOMMENDED",
        icon: <Shield className="w-6 h-6" />,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Custom solutions for large organizations",
        features: [
          "Unlimited team members",
          "Everything in Business",
          "Dedicated account manager",
          "Custom AI model training",
          "Enterprise-grade security",
          "API access",
          "Advanced compliance features",
        ],
        buttonText: "Contact Sales",
        popular: false,
        icon: <Shield className="w-6 h-6" />,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      <div className="container mx-auto px-4 max-w-7xl py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Choose Your Plan
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time with our flexible pricing options.
          </p>
        </div>

        {/* Plan Type Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-xl bg-slate-800/60 backdrop-blur-sm p-1.5 border border-slate-700/50">
            <button
              onClick={() => setPlanType("personal")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                planType === "personal"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setPlanType("business")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                planType === "business"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans[planType].map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? "border-2 border-blue-500/50 bg-slate-900/80 shadow-xl shadow-blue-500/20"
                  : "border border-slate-700/50 bg-slate-900/60 hover:border-slate-600/50"
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-4 right-8">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                    {plan.tag}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      plan.popular
                        ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-400"
                        : "bg-slate-800/60 text-slate-400"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="flex items-baseline mb-4">
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-slate-400">R</span>
                  )}
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-slate-400 ml-2">/month</span>
                  )}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl mb-8 font-medium transition-all duration-200 ${
                  plan.disabled
                    ? "bg-slate-800/60 text-slate-400 cursor-not-allowed border border-slate-700/50"
                    : plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-white hover:bg-slate-100 text-slate-900 font-semibold hover:shadow-lg"
                }`}
                disabled={plan.disabled}
              >
                {plan.buttonText}
              </button>

              {/* Features List */}
              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <div className="mt-0.5">
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              {index === plans[planType].length - 1 && (
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All plans are subject to our fair usage policy.{" "}
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-4">
            Need help choosing the right plan?
          </p>
          <button className="px-6 py-3 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
