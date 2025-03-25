import React, { useState, useEffect } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [errors, setErrors] = useState({
    loanAmount: false,
    interestRate: false,
    tenure: false
  });

  const calculateLoan = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPaymentValue = emiValue * months;
    const totalInterestValue = totalPaymentValue - loanAmount;
    
    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
  };

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (value === '') {
      setLoanAmount(100000);
      setErrors(prev => ({...prev, loanAmount: false}));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 100000 && numValue <= 10000000;
    setErrors(prev => ({...prev, loanAmount: !isValid}));
    setLoanAmount(numValue);
  };

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

  const formatAmount = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (!errors.loanAmount && !errors.interestRate && !errors.tenure) {
      calculateLoan();
    }
  }, [loanAmount, interestRate, tenure, errors]);

  return (
    <div className="calculator">
      <h3>Loan Calculator</h3>
      
      <div className="input-group">
        <label>Loan Amount (₹)</label>
        <div className="input-row">
          <input
            type="range"
            min="100000"
            max="10000000"
            step="10000"
            value={loanAmount > 10000000 ? 10000000 : loanAmount < 100000 ? 100000 : loanAmount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setLoanAmount(value);
              setErrors(prev => ({...prev, loanAmount: false}));
            }}
          />
          <div className={`number-input-wrapper ${errors.loanAmount ? 'error' : ''}`}>
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              onBlur={() => {
                setLoanAmount(prev => Math.min(Math.max(prev, 100000), 10000000));
                setErrors(prev => ({...prev, loanAmount: false}));
              }}
              min="100000"
              max="10000000"
              step="10000"
            />
          </div>
        </div>
        <span>₹ {formatAmount(loanAmount)}</span>
        {errors.loanAmount && <p className="error-message">Amount must be between ₹1,00,000 and ₹1,00,00,000</p>}
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
        {errors.interestRate && <p className="error-message">Rate must be between 1% and 20%</p>}
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
        {errors.tenure && <p className="error-message">Tenure must be between 1 and 30 years</p>}
      </div>
      
      {!errors.loanAmount && !errors.interestRate && !errors.tenure && (
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

export default LoanCalculator;