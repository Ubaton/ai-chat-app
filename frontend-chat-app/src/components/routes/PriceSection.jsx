import React, { useState } from "react";
import { Check, ArrowLeft } from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";

const PricingSection = () => {
  const [planType, setPlanType] = useState("personal");

  const plans = {
    // ... (previous plans object remains the same)
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
      },
    ],
  };

  return (
    <div className="bg-zinc-900 py-16 text-white min-h-screen relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-5">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>

        {/* Plan Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-zinc-800/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setPlanType("personal")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                planType === "personal"
                  ? "bg-violet-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setPlanType("business")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                planType === "business"
                  ? "bg-violet-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans[planType].map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-1 ${
                plan.popular
                  ? "border-2 border-violet-500 bg-zinc-900/90"
                  : "border border-zinc-800 bg-zinc-900/50"
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-4 right-8">
                  <span className="inline-block bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-lg">
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  {plan.price !== "Custom" && (
                    <span className="text-sm">R</span>
                  )}
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-zinc-400 ml-2">/month</span>
                  )}
                </div>
                <p className="text-zinc-400">{plan.description}</p>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg mb-8 font-medium transition-all duration-200 ${
                  plan.disabled
                    ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    : plan.popular
                      ? "bg-violet-500 hover:bg-violet-600 text-white shadow-lg"
                      : "bg-white hover:bg-zinc-100 text-black"
                }`}
                disabled={plan.disabled}
              >
                {plan.buttonText}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <Check className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {index === plans[planType].length - 1 && (
                <p className="text-xs text-zinc-500 mt-8">
                  All plans are subject to our fair usage policy.{" "}
                  <a
                    href="#"
                    className="text-violet-500 hover:text-violet-400 underline"
                  >
                    Learn more
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
