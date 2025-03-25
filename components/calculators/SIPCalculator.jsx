import React, { useState, useEffect } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [errors, setErrors] = useState({
    monthlyInvestment: false,
    expectedReturn: false,
    timePeriod: false
  });

  const calculateSIP = () => {
    const months = timePeriod * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    const futureValue = monthlyInvestment * 
                      (Math.pow(1 + monthlyRate, months) - 1) * 
                      (1 + monthlyRate) / monthlyRate;
    
    const totalInvested = monthlyInvestment * months;
    const returns = futureValue - totalInvested;
    
    setInvestedAmount(totalInvested.toFixed(2));
    setEstimatedReturns(returns.toFixed(2));
    setTotalValue(futureValue.toFixed(2));
  };

  const handleInvestmentChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (value === '') {
      setMonthlyInvestment(500);
      setErrors(prev => ({...prev, monthlyInvestment: false}));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 500 && numValue <= 100000;
    setErrors(prev => ({...prev, monthlyInvestment: !isValid}));
    setMonthlyInvestment(numValue);
  };

  const handleReturnChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setExpectedReturn(1);
      setErrors(prev => ({...prev, expectedReturn: false}));
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 1 && numValue <= 30;
    setErrors(prev => ({...prev, expectedReturn: !isValid}));
    setExpectedReturn(numValue);
  };

  const handleTimePeriodChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setTimePeriod(1);
      setErrors(prev => ({...prev, timePeriod: false}));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 1 && numValue <= 40;
    setErrors(prev => ({...prev, timePeriod: !isValid}));
    setTimePeriod(numValue);
  };

  const formatAmount = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (!errors.monthlyInvestment && !errors.expectedReturn && !errors.timePeriod) {
      calculateSIP();
    }
  }, [monthlyInvestment, expectedReturn, timePeriod, errors]);

  return (
    <div className="calculator">
      <h3>SIP Calculator</h3>
      
      <div className="input-group">
        <label>Monthly Investment (₹)</label>
        <div className="input-row">
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvestment > 100000 ? 100000 : monthlyInvestment < 500 ? 500 : monthlyInvestment}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setMonthlyInvestment(value);
              setErrors(prev => ({...prev, monthlyInvestment: false}));
            }}
          />
          <div className={`number-input-wrapper ${errors.monthlyInvestment ? 'error' : ''}`}>
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={handleInvestmentChange}
              onBlur={() => {
                setMonthlyInvestment(prev => Math.min(Math.max(prev, 500), 100000));
                setErrors(prev => ({...prev, monthlyInvestment: false}));
              }}
              min="500"
              max="100000"
              step="500"
            />
          </div>
        </div>
        <span>₹ {formatAmount(monthlyInvestment)}</span>
        {errors.monthlyInvestment && <p className="error-message">Investment must be between ₹500 and ₹1,00,000</p>}
      </div>
      
      <div className="input-group">
        <label>Expected Return Rate (% p.a.)</label>
        <div className="input-row">
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn > 30 ? 30 : expectedReturn < 1 ? 1 : expectedReturn}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setExpectedReturn(value);
              setErrors(prev => ({...prev, expectedReturn: false}));
            }}
          />
          <input
            type="number"
            value={expectedReturn}
            onChange={handleReturnChange}
            onBlur={() => {
              setExpectedReturn(prev => parseFloat(Math.min(Math.max(prev, 1), 30).toFixed(1)));
              setErrors(prev => ({...prev, expectedReturn: false}));
            }}
            min="1"
            max="30"
            step="0.5"
            className={errors.expectedReturn ? 'error' : ''}
          />
        </div>
        <span>{expectedReturn}%</span>
        {errors.expectedReturn && <p className="error-message">Rate must be between 1% and 30%</p>}
      </div>
      
      <div className="input-group">
        <label>Time Period (years)</label>
        <div className="input-row">
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={timePeriod > 40 ? 40 : timePeriod < 1 ? 1 : timePeriod}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTimePeriod(value);
              setErrors(prev => ({...prev, timePeriod: false}));
            }}
          />
          <input
            type="number"
            value={timePeriod}
            onChange={handleTimePeriodChange}
            onBlur={() => {
              setTimePeriod(prev => Math.min(Math.max(prev, 1), 40));
              setErrors(prev => ({...prev, timePeriod: false}));
            }}
            min="1"
            max="40"
            className={errors.timePeriod ? 'error' : ''}
          />
        </div>
        <span>{timePeriod} years</span>
        {errors.timePeriod && <p className="error-message">Period must be between 1 and 40 years</p>}
      </div>
      
      {!errors.monthlyInvestment && !errors.expectedReturn && !errors.timePeriod && (
        <div className="results">
          <div className="result-item">
            <span>Invested Amount:</span>
            <span>₹ {investedAmount}</span>
          </div>
          <div className="result-item">
            <span>Estimated Returns:</span>
            <span>₹ {estimatedReturns}</span>
          </div>
          <div className="result-item">
            <span>Total Value:</span>
            <span>₹ {totalValue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;