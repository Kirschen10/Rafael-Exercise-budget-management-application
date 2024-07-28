const initialState = [];

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INCOMES':
      return action.payload;
    case 'ADD_INCOME':
      return [...state, action.payload];
    case 'DELETE_INCOME':
      return state.filter(income => income.id !== action.payload);
    case 'UPDATE_INCOME':
      return {
        ...state,
        incomes: state.incomes.map(income => 
          income.id === action.payload.id ? action.payload : income
        )
      };
      case 'LOGOUT_USER':
        return initialState;
    default:
      return state;
  }
};

export default incomeReducer;