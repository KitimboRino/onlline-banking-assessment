/* eslint-disable no-shadow */
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

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      const removedUser = req.query.removed;
      res.render('users', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

// Find User by Search
exports.find = (req, res) => {
  const searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
    if (!err) {
      res.render('users', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

exports.form = (req, res) => {
  res.render('add-user');
};

// Add new user
exports.create = (req, res) => {
  const {
    first_name, last_name, email, phone_number, country,
  } = req.body;
  // const searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone_number = ?, country = ?', [first_name, last_name, email, phone_number, country], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

// Update User
exports.update = (req, res) => {
  const {
    first_name, last_name, email, phone_number, country,
  } = req.body;
  // User connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone_number = ?, country = ? WHERE id = ?', [first_name, last_name, email, phone_number, country, req.params.id], (err, rows) => {
    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
};

// Delete User
exports.delete = (req, res) => {
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      const removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect(`users/?removed=${removedUser}`);
    } else {
      console.log(err);
    }
    console.log('The data from user table are: \n', rows);
  });
};

// View Users
exports.viewall = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table are: \n', rows);
  });
};
