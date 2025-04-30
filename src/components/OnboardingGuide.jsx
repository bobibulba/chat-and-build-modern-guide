import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Welcome to ChatAndBuild",
    description: "Turn your ideas into reality with AI-powered app development.",
    image: "/images/welcome.svg",
  },
  {
    title: "Describe Your Idea",
    description: "Simply tell ChatAndBuild what you want to create in plain language.",
    image: "/images/describe.svg",
  },
  {
    title: "Watch It Build",
    description: "See your app come to life as ChatAndBuild writes the code in real-time.",
    image: "/images/build.svg",
  },
  {
    title: "Customize & Deploy",
    description: "Make adjustments and deploy your app with just a few clicks.",
    image: "/images/deploy.svg",
  }
];

export default function OnboardingGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  
  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted) {
      setShowGuide(false);
    }
  }, []);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowGuide(false);
  };
  
  const skipOnboarding = () => {
    completeOnboarding();
  };
  
  if (!showGuide) return null;
  
  return (
    <motion.div 
      className="onboarding-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="onboarding-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="onboarding-header">
          <div className="step-indicator">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <button className="skip-button" onClick={skipOnboarding}>Skip</button>
        </div>
        
        <div className="onboarding-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              className="step-content"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-image-container">
                <img src={steps[currentStep].image} alt={steps[currentStep].title} className="step-image" />
              </div>
              <h2>{steps[currentStep].title}</h2>
              <p>{steps[currentStep].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="onboarding-footer">
          {currentStep > 0 && (
            <button className="nav-button prev-button" onClick={prevStep}>
              Back
            </button>
          )}
          
          <button className="nav-button next-button" onClick={nextStep}>
            {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
