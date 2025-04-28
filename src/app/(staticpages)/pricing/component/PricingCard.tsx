import React from "react";
import { Button } from "@/components/ui/button";
import { LuChartBar } from "react-icons/lu";
import { Check, CircleDollarSign, FileText, Search, Key } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionItem {
  title: string;
  features: string[];
}

interface PricingCardProps {
  className?: string;
  makePayment: ()=> void;
}

const PricingCard: React.FC<PricingCardProps> = ({ className, makePayment }) => {
  const sections: SectionItem[] = [
    {
      title: "Technical SEO",
      features: [
        "Full site audit",
        "On-page pages crawled: 10,000 pages",
        "Non-indexable pages: 10,000 pages",
        "Downloadable reports"
      ]
    },
    {
      title: "Rank Tracker",
      features: [
        "Google ranked keywords: 5,000 keywords",
        "Bing ranked keywords: 5,000 keywords",
        "Keywords for site: 5,000 keywords",
        "Downloadable reports"
      ]
    },
    {
      title: "Keyword Explorer",
      features: [
        "Google search volume: 5,000 keywords",
        "Bing search volume: 5,000 keywords",
        "Clickstream data: 5,000 keywords",
        "Keyword ideas: 5,000 keywords",
        "Downloadable reports"
      ]
    },
    {
      title: "Content Analysis",
      features: [
        "Content search: 5,000 rows",
        "Content summary: 5,000 rows"
      ]
    },
    {
      title: "Competitor Analysis",
      features: [
        "Domain intersection: 5,000 keywords",
        "Competitor backlinks: 5,000 backlinks"
      ]
    }
  ];

  const getIconForSection = (title: string) => {
    switch(title) {
      case "Technical SEO":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "Rank Tracker":
        return <LuChartBar className="w-4 h-4 text-blue-500" />;
      case "Keyword Explorer":
        return <Search className="w-4 h-4 text-blue-500" />;
      case "Content Analysis":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "Competitor Analysis":
        return <Key className="w-4 h-4 text-blue-500" />;
      default:
        return <Check className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className={cn("max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100", className)}>
      {/* Card Header */}
      <div className="px-8 pt-8 pb-4 text-center border-b border-gray-100">
        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
          <CircleDollarSign className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-600 mb-1">Standard Plan</h2>
        <p className="text-sm text-gray-600 mb-4">For agencies and businesses</p>
        
        <div className="flex items-center justify-center mb-1">
          <span className="text-4xl font-bold text-gray-900">$20</span>
          <span className="text-gray-600 ml-1">/month</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-gray-700">Unlimited projects</span>
        </div>
      </div>
      
      {/* Features List */}
      <div className="p-8 grid grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              {getIconForSection(section.title)}
              <h3 className="font-semibold text-gray-900 ml-2">{section.title}</h3>
            </div>
            <ul className="space-y-3">
              {section.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700 ml-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Card Footer */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all" onClick={makePayment}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;