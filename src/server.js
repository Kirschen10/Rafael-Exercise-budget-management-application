const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'O1f2e3k4!',
  database: 'fafaelexercise'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



////////////////////////////// EXPENSES /////////////////////////////////////////

app.post('/expenses', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT e.id, e.amount, e.category, e.description, e.date
    FROM expenses e
    JOIN users u ON e.user_id = u.id
    WHERE u.username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).send('Error fetching expenses');
      return;
    }
    res.json(results);
  });
});

app.post('/total_expenses', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT SUM(e.amount) AS total_expenses
    FROM expenses e
    JOIN users u ON e.user_id = u.id
    WHERE u.username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching total expenses:', err);
      res.status(500).send('Error fetching total expenses');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
});

///////// ADD //////////

app.post('/add_expense', (req, res) => {
  const { username, amount, category, description, date } = req.body;
  const query = `
    INSERT INTO expenses (user_id, amount, category, description, date)
    VALUES ((SELECT id FROM users WHERE username = ?), ?, ?, ?, ?)`;

  db.query(query, [username, amount, category, description, date], (err, results) => {
    if (err) {
      console.error('Error adding expense:', err);
      res.status(500).send('Error adding expense');
      return;
    }
    res.status(201).send('Expense added successfully');
  });
});

///////// DELETE //////////

app.post('/delete_expense', (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM expenses WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting expense:', err);
      res.status(500).send('Error deleting expense');
      return;
    }
    res.status(200).send('Expense deleted successfully');
  });
});


///////// UPDATE //////////

app.put('/update_expense', (req, res) => {
  const { id, amount, category, description, date } = req.body;
  const query = `
    UPDATE expenses 
    SET amount = ?, category = ?, description = ?, date = ?
    WHERE id = ?`;

  db.query(query, [amount, category, description, date, id], (err, results) => {
    if (err) {
      console.error('Error updating expense:', err);
      res.status(500).send('Error updating expense');
      return;
    }
    res.status(200).send('Expense updated successfully');
  });
});


////////////////////////////// INCOMES /////////////////////////////////////////

app.post('/incomes', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT i.id, i.amount, i.category, i.description, i.date
    FROM incomes i
    JOIN users u ON i.user_id = u.id
    WHERE u.username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching incomes:', err);
      res.status(500).send('Error fetching incomes');
      return;
    }
    res.json(results);
  });
});


app.post('/total_incomes', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT SUM(i.amount) AS total_incomes
    FROM incomes i
    JOIN users u ON i.user_id = u.id
    WHERE u.username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching total incomes:', err);
      res.status(500).send('Error fetching total incomes');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
});

///////// ADD //////////

app.post('/add_income', (req, res) => {
  const { username, amount, category, description, date } = req.body;
  const query = `
    INSERT INTO incomes (user_id, amount, category, description, date)
    VALUES ((SELECT id FROM users WHERE username = ?), ?, ?, ?, ?)`;

  db.query(query, [username, amount, category, description, date], (err, results) => {
    if (err) {
      console.error('Error adding income:', err);
      res.status(500).send('Error adding income');
      return;
    }
    res.status(201).send('Income added successfully');
  });
});

///////// DELETE //////////

app.post('/delete_income', (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM incomes WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting income:', err);
      res.status(500).send('Error deleting income');
      return;
    }
    res.status(200).send('Income deleted successfully');
  });
});

///////// UPDATE //////////

app.put('/update_income', (req, res) => {
  const { id, amount, category, description, date } = req.body;
  const query = `
    UPDATE incomes 
    SET amount = ?, category = ?, description = ?, date = ?
    WHERE id = ?`;

  db.query(query, [amount, category, description, date, id], (err, results) => {
    if (err) {
      console.error('Error updating income:', err);
      res.status(500).send('Error updating income');
      return;
    }
    res.status(200).send('Income updated successfully');
  });
});



////////////////////////////// GEMERAL /////////////////////////////////////////

app.post('/personal_details', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT *
    FROM users
    WHERE username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      res.status(500).send('Error fetching user details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/budget', (req, res) => {
  const { username } = req.body;
  const query = `
    SELECT b.total_budget 
    FROM budgets b
    JOIN users u ON b.user_id = u.id
    WHERE u.username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching budget:', err);
      res.status(500).send('Error fetching budget');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
});





