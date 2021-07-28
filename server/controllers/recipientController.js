/* eslint-disable no-console */
/* eslint-disable camelcase */

const mysql = require('mysql');

// Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View transactions (Recipients)
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM recipients WHERE status = "active"', (err, rows) => {
    if (!err) {
      // const removedRecipient = req.query.removed;
      res.render('recipients', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from recipients table: \n', rows);
  });
};

// View Users
exports.viewall = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM recipients WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table are: \n', rows);
  });
};

// Add new Recipient
exports.create = (req, res) => {
  const {
    first_name, last_name, email, phone_number, mobile_money_number, country,
  } = req.body;
  // const searchTerm = req.body.search;

  // Recipient's connection
  connection.query('INSERT INTO recipients SET first_name = ?, last_name = ?, email = ?, phone_number = ?, mobile_money_number = ?, country = ?', [first_name, last_name, email, phone_number, mobile_money_number, country], (err, rows) => {
    if (!err) {
      res.render('add-recipient', { alert: 'Recipient added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from recipients table: \n', rows);
  });
};
