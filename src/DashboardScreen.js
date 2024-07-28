import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './css/DashboardScreen.css';

const DashboardScreen = () => {
  // Retrieve budget details from Redux store
  const firstName = useSelector(state => state.user.firstName);
  const lastName = useSelector(state => state.user.lastName);
  const budget = useSelector(state => state.budget.total_budget);
  const expenses = useSelector(state => state.budget.total_expenses);
  const incomes = useSelector(state => state.budget.total_incomes);
  const loading = useSelector(state => state.user.loading); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/');
    }
  }, [navigate]);

  // Calculate remaining balance and percentage
  const remainingBalance = budget ? budget + incomes - expenses : 0;
  const remainingPercentage = budget ? Math.abs(((remainingBalance - budget) / budget) * 100) : 0;
  let percentageClass = 'percentage';

  if (remainingBalance - budget < 0) {
    percentageClass += ' red';
  } else if (remainingBalance - budget > 0) {
    percentageClass += ' green';
  } else {
    percentageClass += ' grey';
  }

  const arrowIcon = remainingBalance - budget > 0 ? '↗' : remainingBalance - budget < 0 ? '↘' : '';

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  const storedUsername = localStorage.getItem('username');
  if (!firstName || !storedUsername) {
    console.log("Please login to the site before you want to view the data...");
    navigate('/');
  }

  return (
    <div className="dashboard-main">
      <img src="/Images/RafaelLogo.jpg" alt="Rafael Logo" className="logo" />
      <div className="dashboard-container">
        <h1>Hello, {firstName} {lastName}</h1>
        <div className="dashboard-content">
          <h2>Original Budget: ${formatNumberWithCommas(budget)}</h2>
          <div className="budget-buttons">
            <div className="budget-item incomes" data-tooltip="Click to see Income details" onClick={() => navigate('/TableScreen')}>
              <div className="icon">💰</div>
              <h3>Total Incomes</h3>
              <p>${formatNumberWithCommas(incomes)}</p>
            </div>
            <div className="budget-item expenses" data-tooltip="Click to see Expense details" onClick={() => navigate('/TableScreen')}>
              <div className="icon">💳</div>
              <h3>Total Expenses</h3>
              <p>${formatNumberWithCommas(expenses)}</p>
            </div>
          </div>
          <div className="budget-item balance" data-tooltip="Remaining balance">
            <div className="icon">💼</div>
            <h3>Remaining Balance</h3>
            <p>${formatNumberWithCommas(remainingBalance)}</p>
            <div className={`${percentageClass}`}>
              {remainingPercentage.toFixed(2)}% {arrowIcon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;

function formatNumberWithCommas(number) {
  return number ? number.toLocaleString() : '';
}
