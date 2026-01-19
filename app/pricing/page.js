"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const PricingPage = () => {
  const router = useRouter();
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 Basic Resume Template",
        "ATS Scanner (1/month)",
        "Basic PDF Export",
        "Limited Storage",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      features: [
        "All Basic Features",
        "10+ Premium Templates",
        "Unlimited ATS Scans",
        "Priority Support",
        "Advanced PDF Export",
        "Cover Letter Builder",
      ],
      buttonText: "Go Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per month",
      features: [
        "All Pro Features",
        "Custom Branding",
        "Team Management",
        "API Access",
        "Dedicated Support",
        "Advanced Analytics",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto relative z-10">
      <div className="flex items-center justify-between mb-16">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group relative px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 ease-in-out"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Back</span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your resume needs
          </p>
        </div>
        <div className="w-[100px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <Card
            key={index}
            className={`p-8 rounded-lg ${
              tier.popular ? "border-primary border-2" : "border"
            }`}
          >
            {tier.popular && (
              <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold">{tier.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold">{tier.price}</span>
              <span className="ml-2 text-muted-foreground">/{tier.period}</span>
            </div>
            <ul className="mt-8 space-y-4">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              variant={tier.popular ? "default" : "outline"}
            >
              {tier.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-muted-foreground">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
