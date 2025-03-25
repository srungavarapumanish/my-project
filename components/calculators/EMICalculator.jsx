import React, { useState, useEffect } from 'react';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [errors, setErrors] = useState({
    principal: false,
    interestRate: false,
    tenure: false
  });

  // Calculation function
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPaymentValue = emiValue * months;
    const totalInterestValue = totalPaymentValue - principal;
    
    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
  };

  // Handle principal change with validation
  const handlePrincipalChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (value === '') {
      setPrincipal(10000);
      setErrors(prev => ({...prev, principal: false}));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 10000 && numValue <= 10000000;
    setErrors(prev => ({...prev, principal: !isValid}));
    setPrincipal(numValue);
  };

  // Handle interest rate change with validation
  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setInterestRate(1);
      setErrors(prev => ({...prev, interestRate: false}));
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 1 && numValue <= 20;
    setErrors(prev => ({...prev, interestRate: !isValid}));
    setInterestRate(numValue);
  };

  // Handle tenure change with validation
  const handleTenureChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setTenure(1);
      setErrors(prev => ({...prev, tenure: false}));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 1 && numValue <= 30;
    setErrors(prev => ({...prev, tenure: !isValid}));
    setTenure(numValue);
  };

  // Format numbers with commas
  const formatAmount = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Recalculate when valid inputs change
  useEffect(() => {
    if (!errors.principal && !errors.interestRate && !errors.tenure) {
      calculateEMI();
    }
  }, [principal, interestRate, tenure, errors]);

  return (
    <div className="calculator">
      <h3>EMI Calculator</h3>
      
      <div className="input-group">
        <label>Loan Amount (₹)</label>
        <div className="input-row">
          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={principal > 10000000 ? 10000000 : principal < 10000 ? 10000 : principal}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setPrincipal(value);
              setErrors(prev => ({...prev, principal: false}));
            }}
          />
          <div className={`number-input-wrapper ${errors.principal ? 'error' : ''}`}>
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={principal}
              onChange={handlePrincipalChange}
              onBlur={() => {
                setPrincipal(prev => Math.min(Math.max(prev, 10000), 10000000));
                setErrors(prev => ({...prev, principal: false}));
              }}
              min="10000"
              max="10000000"
              step="10000"
            />
          </div>
        </div>
        <span>₹ {formatAmount(principal)}</span>
        {errors.principal && (
          <p className="error-message">Amount must be between ₹10,000 and ₹1,00,00,000</p>
        )}
      </div>
      
      <div className="input-group">
        <label>Interest Rate (% p.a.)</label>
        <div className="input-row">
          <input
            type="range"
            min="1"
            max="20"
            step="0.1"
            value={interestRate > 20 ? 20 : interestRate < 1 ? 1 : interestRate}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setInterestRate(value);
              setErrors(prev => ({...prev, interestRate: false}));
            }}
          />
          <input
            type="number"
            value={interestRate}
            onChange={handleInterestChange}
            onBlur={() => {
              setInterestRate(prev => parseFloat(Math.min(Math.max(prev, 1), 20).toFixed(1)));
              setErrors(prev => ({...prev, interestRate: false}));
            }}
            min="1"
            max="20"
            step="0.1"
            className={errors.interestRate ? 'error' : ''}
          />
        </div>
        <span>{interestRate}%</span>
        {errors.interestRate && (
          <p className="error-message">Rate must be between 1% and 20%</p>
        )}
      </div>
      
      <div className="input-group">
        <label>Loan Tenure (years)</label>
        <div className="input-row">
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure > 30 ? 30 : tenure < 1 ? 1 : tenure}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTenure(value);
              setErrors(prev => ({...prev, tenure: false}));
            }}
          />
          <input
            type="number"
            value={tenure}
            onChange={handleTenureChange}
            onBlur={() => {
              setTenure(prev => Math.min(Math.max(prev, 1), 30));
              setErrors(prev => ({...prev, tenure: false}));
            }}
            min="1"
            max="30"
            className={errors.tenure ? 'error' : ''}
          />
        </div>
        <span>{tenure} years</span>
        {errors.tenure && (
          <p className="error-message">Tenure must be between 1 and 30 years</p>
        )}
      </div>
      
      {!errors.principal && !errors.interestRate && !errors.tenure && (
        <div className="results">
          <div className="result-item">
            <span>Monthly EMI:</span>
            <span>₹ {emi}</span>
          </div>
          <div className="result-item">
            <span>Total Interest:</span>
            <span>₹ {totalInterest}</span>
          </div>
          <div className="result-item">
            <span>Total Payment:</span>
            <span>₹ {totalPayment}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;