const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');

// Endpoint to set user email and password (e.g., during initial setup)
router.post('/setup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).send('Error inserting user');
        }
        res.status(201).send('User setup successfully');
      }
    );
  } catch (err) {
    res.status(500).send('Error hashing password');
  }
});

// Endpoint to authenticate user (e.g., for login)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying user:', err);
        return res.status(500).send('Error querying user');
      }

      if (results.length === 0) {
        return res.status(401).send('Invalid email or password');
      }

      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).send('Error comparing passwords');
        }

        if (!isMatch) {
          return res.status(401).send('Invalid email or password');
        }

        // Send user data to store in local storage on the frontend
        res.json({
          message: 'Login successful',
          user: { email: user.email, id: user.id }
        });
      });
    }
  );
});

module.exports = router;
