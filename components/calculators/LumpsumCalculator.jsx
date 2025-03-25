import React, { useState, useEffect } from 'react';
import  '../../styles/calculators.css'; // Make sure to include the CSS

const LumpsumCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(5);
  const [futureValue, setFutureValue] = useState(0);
  const [wealthGain, setWealthGain] = useState(0);
  const [errors, setErrors] = useState({
    principal: false,
    expectedReturn: false,
    timePeriod: false
  });

  const calculateLumpsum = () => {
    const returnRate = expectedReturn / 100;
    const fv = principal * Math.pow(1 + returnRate, timePeriod);
    const gain = fv - principal;
    
    setFutureValue(fv.toFixed(2));
    setWealthGain(gain.toFixed(2));
  };

  const handlePrincipalChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setPrincipal(1000);
      setErrors(prev => ({...prev, principal: false}));
      return;
    }
    
    const numValue = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(numValue)) return;
    
    const isValid = numValue >= 1000 && numValue <= 10000000;
    setErrors(prev => ({...prev, principal: !isValid}));
    
    setPrincipal(numValue); // Always set the value to show user input
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

  const formatDisplayAmount = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (!errors.principal && !errors.expectedReturn && !errors.timePeriod) {
      calculateLumpsum();
    }
  }, [principal, expectedReturn, timePeriod, errors]);

  return (
    <div className="calculator">
      <h3>Lumpsum Investment Calculator</h3>
      <p>Calculate the future value of a one-time investment</p>
      
      <div className="input-group">
        <label>Investment Amount (₹)</label>
        <div className="input-row">
          <input
            type="range"
            min="1000"
            max="10000000"
            step="1000"
            value={principal > 10000000 ? 10000000 : principal < 1000 ? 1000 : principal}
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
              onBlur={(e) => {
                if (e.target.value === '') {
                  setPrincipal(1000);
                }
                // Clamp the value on blur
                setPrincipal(prev => Math.min(Math.max(prev, 1000), 10000000));
                setErrors(prev => ({...prev, principal: false}));
              }}
              min="1000"
              max="10000000"
              step="1000"
              className="amount-input"
            />
          </div>
        </div>
        <span>₹ {formatDisplayAmount(principal)}</span>
        {errors.principal && (
          <p className="error-message">Amount must be between ₹1,000 and ₹1,00,00,000</p>
        )}
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
            onBlur={(e) => {
              if (e.target.value === '') {
                setExpectedReturn(1);
              }
              // Clamp the value on blur
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
        {errors.expectedReturn && (
          <p className="error-message">Rate must be between 1% and 30%</p>
        )}
      </div>
      
      <div className="input-group">
        <label>Investment Period (years)</label>
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
            onBlur={(e) => {
              if (e.target.value === '') {
                setTimePeriod(1);
              }
              // Clamp the value on blur
              setTimePeriod(prev => Math.min(Math.max(prev, 1), 40));
              setErrors(prev => ({...prev, timePeriod: false}));
            }}
            min="1"
            max="40"
            className={errors.timePeriod ? 'error' : ''}
          />
        </div>
        <span>{timePeriod} years</span>
        {errors.timePeriod && (
          <p className="error-message">Period must be between 1 and 40 years</p>
        )}
      </div>
      
      {!errors.principal && !errors.expectedReturn && !errors.timePeriod && (
        <div className="results">
          <div className="result-item">
            <span>Invested Amount:</span>
            <span>₹ {formatDisplayAmount(principal)}</span>
          </div>
          <div className="result-item">
            <span>Estimated Returns:</span>
            <span>₹ {formatDisplayAmount(wealthGain)}</span>
          </div>
          <div className="result-item highlight">
            <span>Total Future Value:</span>
            <span>₹ {formatDisplayAmount(futureValue)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LumpsumCalculator;