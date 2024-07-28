import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import '../css/Details.css';

const Details = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const item = useSelector(state => {
    if (type === 'income') {
      return state.incomes.find(income => income.id === parseInt(id));
    } else {
      return state.expenses.find(expense => expense.id === parseInt(id));
    }
  });

  if (!item) {
    return <div>Item not found</div>;
  }
  else{
    console.log(item)
  }

  const formattedDate = new Date(item.date).toLocaleDateString();

  const storedUsername = localStorage.getItem('username');
  if (!storedUsername) {
    console.log("Please login to the site before you want to view the data...");
    navigate('/');
  }

  return (
    <div className="details-overlay">
    <div className="details-container">
      <button className="close-button" onClick={() => navigate(-1)}><CloseIcon /></button>
      <h2 className={type === 'income' ? 'income-header' : 'expense-header'}>
        {type === 'income' ? 'Income Details' : 'Expense Details'}
        {type === 'income' ? <TrendingUpIcon /> : <TrendingDownIcon />}
      </h2>
      <div className="details-content">
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Amount:</strong> ${formatNumberWithCommas(item.amount)}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
      </div>
    </div>
  </div>
  );
};

export default Details;

function formatNumberWithCommas(number) {
    return number ? number.toLocaleString() : '';
  }
  
