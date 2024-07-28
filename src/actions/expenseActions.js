import axios from 'axios';

export const fetchExpenses = (username) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/expenses', { username });
    dispatch({ type: 'SET_EXPENSES', payload: response.data });
    dispatch(updateTotalExpenses());
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};

export const addExpense = (username, expense) => async (dispatch, getState) => {
  try {
    await axios.post('http://localhost:3001/add_expense', { username, ...expense });
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
    dispatch(updateTotalExpenses());
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};

export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    await axios.post('http://localhost:3001/delete_expense', { id });
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
    dispatch(updateTotalExpenses());
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};

export const updateExpense = (expense) => async (dispatch) => {
  try {
    await axios.put('http://localhost:3001/update_expense', expense);
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
    dispatch(updateTotalExpenses());
  } catch (error) {
    console.error('Error updating expense:', error);
  }
};

// פעולה לעדכון סכום ההוצאות הכולל
export const updateTotalExpenses = () => async (dispatch, getState) => {
  const state = getState();
  const { expenses } = state;
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  dispatch({ type: 'UPDATE_TOTAL_EXPENSES', payload: totalExpenses });
};


