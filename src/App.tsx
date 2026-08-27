import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BmiCalculatorCard } from './components/BmiCalculatorCard';
import { UnderstandingBmiSection } from './components/UnderstandingBmiSection';
import { Footer } from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bmi_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bmi_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bmi_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-12 flex flex-col items-center">
        
        {/* Centered BMI Calculator Card */}
        <BmiCalculatorCard />

        {/* Informative Educational Section */}
        <UnderstandingBmiSection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
