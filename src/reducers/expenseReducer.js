// src/reducers/expenseReducer.js
const initialState = [];

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return action.payload;
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'DELETE_EXPENSE':
      return state.filter(expense => expense.id !== action.payload);
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense => 
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    default:
      return state;
  }
};

export default expenseReducer;



