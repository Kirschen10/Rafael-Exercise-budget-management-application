const initialState = {
  total_budget: 0,
  total_expenses: 0,
  total_incomes: 0,
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUDGET':
      return {
        ...state,
        total_budget: action.payload.total_budget
      };
    case 'SET_SUM_EXPENSES':
      return {
        ...state,
        total_expenses: action.payload.total_expenses
      };
    case 'SET_SUM_INCOMES':
      return {
        ...state,
        total_incomes: action.payload.total_incomes
      };
    case 'UPDATE_TOTAL_EXPENSES':
      return {
        ...state,
        total_expenses: action.payload,
      };
    case 'UPDATE_TOTAL_INCOMES':
      return {
        ...state,
        total_incomes: action.payload,
      };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
};

export default budgetReducer;