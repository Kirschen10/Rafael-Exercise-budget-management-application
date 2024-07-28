import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, deleteExpense } from './actions/expenseActions';
import { fetchIncomes, deleteIncome } from './actions/incomeActions';
import PopupDelete from './components/PopupDelete';
import FilterSortControls from './components/FilterSortControls';
import { Outlet, useNavigate } from 'react-router-dom';
import './css/TableScreen.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import { Tooltip } from 'react-tooltip';

const TableScreen = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const incomes = useSelector(state => state.incomes);
  const username = useSelector(state => state.user.username);

  const [showPopupExpense, setShowPopupExpense] = useState(false);
  const [showPopupIncome, setShowPopupIncome] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const [expenseFilterValues, setExpenseFilterValues] = useState({ min: '', max: '' });
  const [incomeFilterValues, setIncomeFilterValues] = useState({ min: '', max: '' });
  const [expenseSortValues, setExpenseSortValues] = useState({ key: 'id', order: 'asc' });
  const [incomeSortValues, setIncomeSortValues] = useState({ key: 'id', order: 'asc' });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExpenses(username)); 
    dispatch(fetchIncomes(username)); 
  }, [dispatch, username]);

  const handleDeleteClick = (id, incomeOrExpense) => {
    setDeleteId(id);
    if (incomeOrExpense === "Expense") {
      setShowPopupExpense(true);
    } else {
      setShowPopupIncome(true);
    }
  };

  const handleConfirmDeleteExpense = () => {
    dispatch(deleteExpense(deleteId));
    setShowPopupExpense(false);
  };

  const handleCancelDeleteExpense = () => {
    setShowPopupExpense(false);
  };

  const handleConfirmDeleteIncome = () => {
    dispatch(deleteIncome(deleteId));
    setShowPopupIncome(false);
  };

  const handleCancelDeleteIncome = () => {
    setShowPopupIncome(false);
  };

  const filteredExpenses = expenses.filter(expense => 
    (expenseFilterValues.min === '' || expense.amount >= expenseFilterValues.min) &&
    (expenseFilterValues.max === '' || expense.amount <= expenseFilterValues.max)
  );

  const filteredIncomes = incomes.filter(income => 
    (incomeFilterValues.min === '' || income.amount >= incomeFilterValues.min) &&
    (incomeFilterValues.max === '' || income.amount <= incomeFilterValues.max)
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (expenseSortValues.order === 'asc') {
      return a[expenseSortValues.key] > b[expenseSortValues.key] ? 1 : -1;
    } else {
      return a[expenseSortValues.key] < b[expenseSortValues.key] ? 1 : -1;
    }
  });

  const sortedIncomes = [...filteredIncomes].sort((a, b) => {
    if (incomeSortValues.order === 'asc') {
      return a[incomeSortValues.key] > b[incomeSortValues.key] ? 1 : -1;
    } else {
      return a[incomeSortValues.key] < b[incomeSortValues.key] ? 1 : -1;
    }
  });

  return (
    <div className="TableScreenPage">
      {showPopupExpense && (
        <PopupDelete
          onConfirm={handleConfirmDeleteExpense}
          onCancel={handleCancelDeleteExpense}
        />
      )}
      {showPopupIncome && (
        <PopupDelete
          onConfirm={handleConfirmDeleteIncome}
          onCancel={handleCancelDeleteIncome}
        />
      )}

      <div className="table-header">
        <h3>Overview of Expenses & Incomes</h3>
        <div className="back-icon" onClick={() => navigate('/')}>
          <HomeIcon />
        </div>
      </div>
      <div className="table-screen">
        <div className="table-column">
          <div className="table-header">
            <h2>Incomes</h2>
          </div>
          <div className='FilterSortControls'>
            <FilterSortControls 
              onFilterChange={setIncomeFilterValues} 
              onSortChange={setIncomeSortValues} 
              filterValues={incomeFilterValues} 
              sortValues={incomeSortValues} 
            />
          </div>
          <div className="table-content">
            <div className="incomes-table">
              {sortedIncomes.map(income => (
                <div className="income-item" key={income.id}>
                  <div>
                    <div className="income-category">{income.category}</div>
                    <div className="income-amount">${formatNumberWithCommas(income.amount)}</div>
                  </div>
                  <div className="income-actions">
                    <button className="details-button" data-tooltip-id="detailsTooltip" onClick={() => navigate(`income/${income.id}`)}><ArticleIcon /></button>
                    <Tooltip id="detailsTooltip" place="bottom-end" effect="solid">
                    More Details
                    </Tooltip>
                    <button className="edit-button" data-tooltip-id="editTooltip" onClick={() => navigate(`edit/income/${income.id}`)}><EditIcon /></button>
                    <Tooltip id="editTooltip" place="bottom-end" effect="solid">
                    Edit
                    </Tooltip>
                    <button className="delete-button" data-tooltip-id="deleteTooltip" onClick={() => handleDeleteClick(income.id, "Income")}><DeleteIcon /></button>
                    <Tooltip id="deleteTooltip" place="bottom-end" effect="solid">
                    Delete
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className='AddButton' onClick={() => navigate(`add/Income`)}>Add New Income</button>
          <Outlet />
        </div>
        <div className="table-column">
          <div className="table-header">
            <h2>Expenses</h2>
          </div>
          <div className='FilterSortControls'>
            <FilterSortControls 
              onFilterChange={setExpenseFilterValues} 
              onSortChange={setExpenseSortValues} 
              filterValues={expenseFilterValues} 
              sortValues={expenseSortValues} 
            />
          </div>
          <div className="table-content">
            <div className="expenses-table">
              {sortedExpenses.map(expense => (
                <div className="expense-item" key={expense.id}>
                  <div>
                    <div className="expense-category">{expense.category}</div>
                    <div className="expense-amount">${formatNumberWithCommas(expense.amount)}</div>
                  </div>
                  <div className="expense-actions">
                    <button className="details-button" data-tooltip-id="detailsTooltipExpense" onClick={() => navigate(`expense/${expense.id}`)}><ArticleIcon /></button>
                    <Tooltip id="detailsTooltipExpense" place="bottom-end" effect="solid">
                     More Details
                    </Tooltip>
                    <button className="edit-button" data-tooltip-id="editTooltipExpense" onClick={() => navigate(`edit/expense/${expense.id}`)}><EditIcon /></button>
                    <Tooltip id="editTooltipExpense" place="bottom-end" effect="solid">
                      Edit
                    </Tooltip>
                    <button className="delete-button"data-tooltip-id="deleteTooltipExpense" onClick={() => handleDeleteClick(expense.id, "Expense")}><DeleteIcon /></button>
                    <Tooltip id="deleteTooltipExpense" place="bottom-end" effect="solid">
                      Delete
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className='AddButton' onClick={() => navigate(`add/Expense`)}> Add New Expense </button>
        </div>
      </div>
    </div>
  );
};

export default TableScreen;

function formatNumberWithCommas(number) {
  return number ? number.toLocaleString() : '';
}
