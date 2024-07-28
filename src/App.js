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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const username = 'Liad'; // Replace with dynamic username if needed
    dispatch(fetchExpenses(username));
    dispatch(fetchBudget(username));
    dispatch(fetchSumExpenses(username));
    dispatch(fetchSumIncomes(username));
    dispatch(fetchPersonalDetails(username));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
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
