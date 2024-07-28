import { combineReducers } from 'redux';
import expenseReducer from './expenseReducer';
import budgetReducer from './budgetReducer';
import incomeReducer from './incomeReducer';
import userReducer from './userReducer';


// Combining all reducers into one main reducer
const rootReducer = combineReducers({
  expenses: expenseReducer,
  budget: budgetReducer,
  incomes: incomeReducer,
  user: userReducer,
});

export default rootReducer;
