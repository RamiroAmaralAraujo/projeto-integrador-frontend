import React, { useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import BenefitsSection from './components/sections/BenefitsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CallToActionSection from './components/sections/CallToActionSection';
import { PopupWhatsapp } from '@/components/PopupWhatsapp';

const Home: React.FC = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CallToActionSection />
      <PopupWhatsapp />
    </div>
  );
};

export default Home;