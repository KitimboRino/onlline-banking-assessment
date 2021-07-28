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
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    if (!err) {
      const removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

// Add new Recipient
exports.create = (req, res) => {
  const {
    first_name, last_name, email, phone_number, mobile_money_number, country,
  } = req.body;
  // const searchTerm = req.body.search;

  // Recipient's connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone_number = ?, mobile_money_number = ?, country = ?', [first_name, last_name, email, phone_number, mobile_money_number, country], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};
