"use client";

import { Calculator } from '../components/cards/calculator';
import { QuestionBodyContent } from '../components/cards/questionContent';
import { ExamHeader } from '../components/header';
import { ExamSidebar } from '../components/sidebar';
import { useState } from 'react';

export const ExamContent = () => {
  const [isQuestionNavigationOpen, setIsQuestionNavigationOpen] = useState(false);
  const [ isCalculatorOpen, setIsCalculatorOpen ] = useState(false);
  const handleQuestionNavigationToggle = () => {
    setIsQuestionNavigationOpen(!isQuestionNavigationOpen);
  };

  const handleCalculatorToggle = () => {
    setIsCalculatorOpen(!isCalculatorOpen)
  }

  return (
    <main>
      <ExamHeader />
      <div className='flex flex-col items-center justify-between w-screen p-4'>
        <QuestionBodyContent 
          onToggleSidebar={handleQuestionNavigationToggle}
          onToggleCalculator={handleCalculatorToggle}
        />
      </div>
      <ExamSidebar
        isOpen={isQuestionNavigationOpen}
        onToggle={handleQuestionNavigationToggle}
      />
      <Calculator
        isOpen={isCalculatorOpen}
        onToggle={handleCalculatorToggle}
      />
    </main>
  );
};
