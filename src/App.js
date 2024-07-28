import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from './actions/expenseActions';
import { fetchBudget, fetchSumExpenses, fetchSumIncomes } from './actions/budgetActions';
import { fetchPersonalDetails } from './actions/userActions';
import DashboardScreen from './DashboardScreen';
import TableScreen from './TableScreen';
import Details from './components/Details';
import EditDetails from './components/EditDetails';
import AddNewType from './components/AddNewType';
import LogIn from './LogIn';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      dispatch(fetchPersonalDetails(storedUsername));
      dispatch(fetchExpenses(storedUsername));
      dispatch(fetchBudget(storedUsername));
      dispatch(fetchSumExpenses(storedUsername));
      dispatch(fetchSumIncomes(storedUsername));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LogIn />} />
        <Route path="DashboardScreen" element={<DashboardScreen />} />
        <Route path="TableScreen/*" element={<TableScreen />}>
          <Route path=":type/:id" element={<Details />} />
          <Route path="edit/:type/:id" element={<EditDetails />} />
          <Route path="add/:type" element={<AddNewType />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
