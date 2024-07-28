import axios from 'axios';

export const fetchIncomes = (username) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/incomes', { username });
    dispatch({ type: 'SET_INCOMES', payload: response.data });
    dispatch(updateTotalIncomes());
  } catch (error) {
    console.error('Error fetching incomes:', error);
  }
};

export const addIncome = (username, income) => async (dispatch, getState) => {
  try {
    await axios.post('http://localhost:3001/add_income', { username, ...income });
    dispatch({ type: 'ADD_INCOME', payload: income });
    dispatch(updateTotalIncomes());
  } catch (error) {
    console.error('Error adding income:', error);
  }
};

export const deleteIncome = (id) => async (dispatch, getState) => {
  try {
    await axios.post('http://localhost:3001/delete_income', { id });
    dispatch({ type: 'DELETE_INCOME', payload: id });
    dispatch(updateTotalIncomes());
  } catch (error) {
    console.error('Error deleting income:', error);
  }
};

export const updateIncome = (income) => async (dispatch) => {
  try {
    await axios.put('http://localhost:3001/update_income', income);
    dispatch({ type: 'UPDATE_INCOME', payload: income });
    dispatch(updateTotalIncomes());
  } catch (error) {
    console.error('Error updating income:', error);
  }
};

export const updateTotalIncomes = () => async (dispatch, getState) => {
  const state = getState();
  const { incomes } = state;
  const totalIncomes = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
  dispatch({ type: 'UPDATE_TOTAL_INCOMES', payload: totalIncomes });
};


