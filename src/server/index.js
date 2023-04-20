const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto'); // for random string generation
const bcrypt = require('bcrypt'); // for password hashing

const app = express();

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createPool({
  host: 'snowbyte-db-do-user-13916321-0.b.db.ondigitalocean.com', 
  user: 'doadmin', 
  password: 'AVNS_Cu0RIaivJmdP8HEI64E',
  database: 'defaultdb', 
  port: 25060, 
});

console.log('Connected to the MySQL database');

// API endpoint for user login
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  // Implement your authentication logic here, for example:
  // 1. Query the database for a user with the provided email
  // 2. Verify the provided password against the stored password
  // 3. Return a success response with user data or an error message

  res.status(200).json({ message: 'Login successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// auth for signup
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Generate a random guest_id
  const guest_id = crypto.randomBytes(16).toString('hex');

  // Check if the email address already exists in the database
  const checkEmailQuery = 'SELECT * FROM users WHERE email_address = ?';
  const [emailRows] = await db.execute(checkEmailQuery, [email]);

  if (emailRows.length > 0) {
    return res.status(400).json({ message: 'Email address already in use' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Insert the new user into the database
  const insertUserQuery = 'INSERT INTO users (guest_id, first_name, last_name, email_address, password) VALUES (?, ?, ?, ?, ?)';
  await db.execute(insertUserQuery, [guest_id, firstName, lastName, email, hashedPassword]);

  res.status(201).json({ message: 'User created successfully', guest_id });
});