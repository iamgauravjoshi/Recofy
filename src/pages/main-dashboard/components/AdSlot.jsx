import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdSlot = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const ads = [
    {
      id: 1,
      title: "Boost Your Business with Digital Marketing",
      description: "Reach more customers with our comprehensive digital marketing solutions. Get 30% off on your first campaign!",
      cta: "Learn More",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      advertiser: "MarketPro Solutions",
      category: "Marketing"
    },
    {
      id: 2,
      title: "Professional Accounting Software",
      description: "Streamline your financial management with our AI-powered accounting platform. Free 14-day trial available.",
      cta: "Start Free Trial",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_640.jpg",
      advertiser: "FinanceFlow",
      category: "Software"
    },
    {
      id: 3,
      title: "Business Insurance Made Simple",
      description: "Protect your business with comprehensive insurance coverage. Get instant quotes and save up to 25%.",
      cta: "Get Quote",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
      advertiser: "SecureShield Insurance",
      category: "Insurance"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads?.length);
        setIsVisible(true);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [ads?.length]);

  const currentAd = ads?.[currentAdIndex];

  const handleAdClick = () => {
    // Track ad click analytics
    console.log(`Ad clicked: ${currentAd?.title} by ${currentAd?.advertiser}`);
  };

  const handleCloseAd = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads?.length);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg shadow-subtle overflow-hidden transition-all duration-300 ${
      isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-2'
    }`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Sponsored
            </span>
            <span className="text-xs text-muted-foreground">
              {currentAd?.category}
            </span>
          </div>
          <button
            onClick={handleCloseAd}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
              <img
                src={currentAd?.image}
                alt={currentAd?.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
              {currentAd?.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {currentAd?.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                by {currentAd?.advertiser}
              </span>
              <Button
                variant="outline"
                size="xs"
                onClick={handleAdClick}
                className="text-xs"
              >
                {currentAd?.cta}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-1 mt-4">
          {ads?.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentAdIndex(index);
                  setIsVisible(true);
                }, 300);
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentAdIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdSlot;