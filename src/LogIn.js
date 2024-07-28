import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './css/LogIn.css';
import { fetchExpenses } from './actions/expenseActions';
import { fetchBudget, fetchSumExpenses, fetchSumIncomes } from './actions/budgetActions';
import { fetchPersonalDetails } from './actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogIn, setErrorLogIn] = useState('');

  const onSubmit = async (data) => {
    try {
      console.log('Sending data:', data);
      const response = await axios.post('http://localhost:3001/login', data);
      console.log(response.data);
      dispatch(fetchPersonalDetails(data.username));
      dispatch(fetchPersonalDetails(data.username));
      dispatch(fetchExpenses(data.username));
      dispatch(fetchBudget(data.username));
      dispatch(fetchSumExpenses(data.username));
      dispatch(fetchSumIncomes(data.username));
      localStorage.setItem('username', data.username);
      navigate('/DashboardScreen')
    } catch (error) {
      console.error('Login error:', error);
      setErrorLogIn(error.response?.data?.message || 'Login failed. Please try again.'); // הצגת הודעת שגיאה קריאה
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (errorLogIn) {
      const timer = setTimeout(() => {
        setErrorLogIn('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorLogIn]);

  return (
    <div className="login-form-container">
      <img src="/Images/RafaelLogo.jpg" alt="Rafael Logo" className="logo" />
      <div className='login-form-tittle'>
        <h1>Welcome to Budget Management Web</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>
        
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input 
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
            />
            <button type="button" className="password-toggle" onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        {errorLogIn && <p className="error-message">{errorLogIn}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
