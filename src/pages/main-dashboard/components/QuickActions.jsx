import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Transaction",
      description: "Record new income or expense",
      icon: "Plus",
      color: "default",
      path: "/transaction-management",
    },
    {
      title: "Generate Report",
      description: "Create financial statements",
      icon: "FileText",
      color: "outline",
      path: "/financial-reports",
    },
    {
      title: "View Journal",
      description: "Access journal entries",
      icon: "BookOpen",
      color: "outline",
      path: "/transaction-management",
    },
    {
      title: "Stock Tracker",
      description: "Monitor market trends",
      icon: "TrendingUp",
      color: "outline",
      path: "/stock-market-tracker",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-subtle">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path} className="block">
            <div className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer group">
              <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={action?.icon}
                    className="text-primary hover:text-primary h-5 w-5"
                  />
                  <h3 className=" font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground ">
                  {action?.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
