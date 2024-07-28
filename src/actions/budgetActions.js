import axios from 'axios';

export const fetchBudget = (username) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/budget', { username });
    dispatch({ type: 'SET_BUDGET', payload: response.data });
  } catch (error) {
    console.error('Error fetching budget:', error);
  }
};

export const fetchSumExpenses = (username) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/total_expenses', { username });
      dispatch({ type: 'SET_SUM_EXPENSES', payload: response.data });
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  export const fetchSumIncomes = (username) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/total_incomes', { username });
      dispatch({ type: 'SET_SUM_INCOMES', payload: response.data });
    } catch (error) {
      console.error('Error fetching total incomes:', error);
    }
  };

