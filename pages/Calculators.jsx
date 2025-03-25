import React, { useState } from 'react';
import EMICalculator from '../components/calculators/EMICalculator';
import SIPCalculator from '../components/calculators/SIPCalculator';
import LoanCalculator from '../components/calculators/LoanCalculator';
import LumpsumCalculator from '../components/calculators/LumpsumCalculator';
import '../styles/calculators.css';

const Calculators = () => {
  const [activeTab, setActiveTab] = useState('emi');

  return (
    <div className="calculators-page">
      <h2>Financial Calculators</h2>
      
      <div className="calculator-tabs">
        <button 
          className={activeTab === 'emi' ? 'active' : ''}
          onClick={() => setActiveTab('emi')}
        >
          EMI Calculator
        </button>
        <button 
          className={activeTab === 'sip' ? 'active' : ''}
          onClick={() => setActiveTab('sip')}
        >
          SIP Calculator
        </button>
        <button 
          className={activeTab === 'lumpsum' ? 'active' : ''}
          onClick={() => setActiveTab('lumpsum')}
        >
          Lumpsum Calculator
        </button>
        <button 
          className={activeTab === 'loan' ? 'active' : ''}
          onClick={() => setActiveTab('loan')}
        >
          Loan Calculator
        </button>
      </div>
      
      <div className="calculator-container">
        {activeTab === 'emi' && <EMICalculator />}
        {activeTab === 'sip' && <SIPCalculator />}
        {activeTab === 'lumpsum' && <LumpsumCalculator />}
        {activeTab === 'loan' && <LoanCalculator />}
      </div>
    </div>
  );
};

export default Calculators;