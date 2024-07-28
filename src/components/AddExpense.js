import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../actions/expenseActions';
import { addIncome } from '../actions/incomeActions';
import CloseIcon from '@mui/icons-material/Close';
import '../css/AddExpense.css';

const AddExpense = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { type } = useParams();
  const username = useSelector(state => state.user.username);

  const onSubmit = (data) => {
    if (type === "Expense") {
      const expense = {
        amount: parseFloat(data.amount),
        category: data.category,
        description: data.description,
        date: data.date,
      };
      dispatch(addExpense(username, expense));
    } else {
      const income = {
        amount: parseFloat(data.amount),
        category: data.category,
        description: data.description,
        date: data.date,
      };
      dispatch(addIncome(username, income));
    }
    navigate(-1);
  };

  return (
    <div className="add-details-overlay">
      <div className="add-details-container add-expense-container">
        <button className="add-close-button" onClick={() => navigate(-1)}>
          <CloseIcon />
        </button>
        <h3>{type === 'Income' ? 'Add New Income' : 'Add New Expense'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-form-group">
            <label htmlFor="amount">Amount</label>
            <input 
              {...register('amount', { 
                required: "Amount is required", 
                validate: value => (!isNaN(value) && value >= 0) || "Amount must be a non-negative number" 
              })} 
              id="amount"
              placeholder="Amount" 
              type='number' 
              min="0" 
            />
            {errors.amount && <p className="add-error-message">{errors.amount.message}</p>}
          </div>
          
          <div className="add-form-group">
            <label htmlFor="category">Category</label>
            <input 
              {...register('category', { required: "Category is required" })} 
              id="category"
              placeholder="Category" 
            />
            {errors.category && <p className="add-error-message">{errors.category.message}</p>}
          </div>
          
          <div className="add-form-group">
            <label htmlFor="description">Description</label>
            <input 
              {...register('description', { required: "Description is required" })} 
              id="description"
              placeholder="Description" 
            />
            {errors.description && <p className="add-error-message">{errors.description.message}</p>}
          </div>
          
          <div className="add-form-group">
            <label htmlFor="date">Date</label>
            <input 
              {...register('date', { 
                required: "Date is required",
                validate: value => {
                  const date = new Date(value);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return (
                    year >= 2000 && year <= 2030 &&
                    month >= 1 && month <= 12 &&
                    day >= 1 && day <= 31
                  ) || "Date must be between 01-01-2020 and 31-12-2030";
                }
              })} 
              id="date"
              type="date" 
            />
            {errors.date && <p className="add-error-message">{errors.date.message}</p>}
          </div>
          <button type="submit" className="add-submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
