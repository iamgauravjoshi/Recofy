import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AdSlot = ({ position = 'sidebar' }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const mockAds = [
    {
      id: 1,
      title: "Invest Smart with Zero Brokerage",
      description: "Start your investment journey with India\'s most trusted platform. Get expert advice and portfolio management.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
      cta: "Start Investing",
      brand: "InvestPro",
      category: "financial-services"
    },
    {
      id: 2,
      title: "Mutual Fund SIP Starting ₹500",
      description: "Build wealth systematically with our curated mutual fund portfolio. Expert-picked funds for maximum returns.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      cta: "Explore SIPs",
      brand: "WealthBuilder",
      category: "mutual-funds"
    },
    {
      id: 3,
      title: "Trade Options & Futures",
      description: "Advanced trading platform with real-time analytics. Perfect for experienced traders looking for better tools.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      cta: "Start Trading",
      brand: "TradeMax",
      category: "trading-platform"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % mockAds?.length);
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, [mockAds?.length]);

  const currentAd = mockAds?.[currentAdIndex];

  const handleAdClick = () => {
    // Track ad click analytics
    console.log(`Ad clicked: ${currentAd?.brand} - ${currentAd?.title}`);
  };

  const handleCloseAd = () => {
    setIsVisible(false);
    // Track ad close analytics
    console.log(`Ad closed: ${currentAd?.brand}`);
  };

  if (!isVisible) return null;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  if (position === 'banner') {
    return (
      <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden mb-6">
        <div className="flex items-center justify-between p-2 bg-muted border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Megaphone" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Sponsored</span>
          </div>
          <button
            onClick={handleCloseAd}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
        <AnimatePresence mode="wait" custom={currentAdIndex}>
          <motion.div
            key={currentAdIndex}
            custom={currentAdIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onClick={handleAdClick}
            className="cursor-pointer"
          >
            <div className="flex items-center space-x-4 p-4">
              <Image
                src={currentAd?.image}
                alt={currentAd?.title}
                className="w-20 h-20 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                  {currentAd?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {currentAd?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">{currentAd?.brand}</span>
                  <Button variant="outline" size="xs">
                    {currentAd?.cta}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-muted border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Megaphone" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Sponsored</span>
        </div>
        <button
          onClick={handleCloseAd}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="X" size={14} />
        </button>
      </div>
      <AnimatePresence mode="wait" custom={currentAdIndex}>
        <motion.div
          key={currentAdIndex}
          custom={currentAdIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          onClick={handleAdClick}
          className="cursor-pointer p-4"
        >
          <Image
            src={currentAd?.image}
            alt={currentAd?.title}
            className="w-full h-32 rounded-md object-cover mb-3"
          />
          <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
            {currentAd?.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
            {currentAd?.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary font-medium">{currentAd?.brand}</span>
            <Button variant="default" size="xs" fullWidth className="ml-2">
              {currentAd?.cta}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center space-x-1 p-2 bg-muted">
        {mockAds?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAdIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentAdIndex ? 'bg-primary' : 'bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSlot;