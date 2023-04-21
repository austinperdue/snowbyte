const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto'); // for random string generation
const bcrypt = require('bcrypt'); // for password hashing

const app = express();


const dotenv = require('dotenv');

// for development, load variables from .env.development
// for production, load variables from .env.production
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
  console.log('Loaded production environment variables: ', process.env);
} else {
  dotenv.config({ path: '.env.development' });
  console.log('Loaded development environment variables: ', process.env);
}

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log('Connected to the MySQL database');

// API endpoint for user login
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;


  try {
    // 1. Query the database for a user with the provided email
    const [userRows] = await db.execute('SELECT * FROM users WHERE email_address = ?', [email]);

    if (userRows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = userRows[0];

    // 2. Verify the provided password against the stored password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Return a success response with user data or an error message
    res.status(200).json({
      message: 'Login successful',
      guest_id: user.guest_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_address,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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