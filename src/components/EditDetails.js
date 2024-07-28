import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateExpense, fetchExpenses } from '../actions/expenseActions';
import { updateIncome, fetchIncomes } from '../actions/incomeActions';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import '../css/Details.css';

const EditDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);

  const item = useSelector(state => {
    if (type === 'income') {
      return state.incomes.find(income => income.id === parseInt(id));
    } else {
      return state.expenses.find(expense => expense.id === parseInt(id));
    }
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (item) {
      setValue('category', item.category);
      setValue('amount', item.amount);
      setValue('description', item.description);
      
      // Converting manually to date - not manually was a problem (day before)
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setValue('date', `${year}-${month}-${day}`);
    }
  }, [item, setValue]);

  const onSubmit = (data) => {
    if (type === 'income') {
      dispatch(updateIncome({ ...item, ...data }));
      dispatch(fetchIncomes(username));
    } else {
      dispatch(updateExpense({ ...item, ...data }));
      dispatch(fetchExpenses(username));
    }
    navigate(-1); // Go back after submitting the form
  };

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="details-overlay">
      <div className="details-container">
        <button className="close-button" onClick={() => navigate(-1)}><CloseIcon /></button>
        <h2 className={type === 'income' ? 'income-header' : 'expense-header'}>
          {type === 'income' ? 'Edit Income' : 'Edit Expense'}
          {type === 'income' ? <TrendingUpIcon /> : <TrendingDownIcon />}
        </h2>
        <form className="details-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Category:</label>
            <input {...register('category', { required: "Category is required" })} />
            {errors.category && <p className="error-message">{errors.category.message}</p>}
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input 
              {...register('amount', { 
                required: "Amount is required", 
                validate: value => (!isNaN(value) && value >= 0) || "Amount must be a non-negative number" 
              })} 
              type="number" 
            />
            {errors.amount && <p className="error-message">{errors.amount.message}</p>}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea {...register('description', { required: "Description is required" })} />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>
          <div className="form-group">
            <label>Date:</label>
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
                  ) || "Date must be between 01-01-2000 and 31-12-2030";
                }
              })} 
              type="date" 
            />
            {errors.date && <p className="error-message">{errors.date.message}</p>}
          </div>
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
