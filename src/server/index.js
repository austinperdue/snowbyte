const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto'); // for random string generation
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for JWTs, user authentication

const app = express();
const dotenv = require('dotenv');

// for development, load variables from .env.development
// for production, load variables from .env.production
// I don't think Digital Ocean is actually pulling the .env.production file
// anyway, so I'm just going to use the .env.development file for now
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
  console.log('Someone is trying to log in!');
  //console.log('req.body:', req.body); // debug
  const { email, password } = req.body;


  try {
    // 1. Query the database for a user with the provided email
    const [userRows] = await db.execute('SELECT * FROM guests WHERE email_address = ?', [email]);

    if (userRows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = userRows[0];

    // 2. Verify the provided password against the stored password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      {
        guest_id: user.guest_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email_address,
      },
      process.env.JWT_SECRET,
      { expiresIn: '600s' } // token expires in 10 minutes (600 seconds)
    );

    // 4. Return a success response with user data or an error message
    res.status(200).json({
      message: 'Login successful',
      guest_id: user.guest_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_address,
      token,
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
  const { firstName, lastName, email, password, securityQuestion, securityAnswer } = req.body;

  // Generate a random guest_id prefixed by 'G' and 7 random numbers
  const guest_id = 'G' + crypto.randomInt(10000000, 99999999);


  // Check if the email address already exists in the database
  const checkEmailQuery = 'SELECT * FROM guests WHERE email_address = ?';
  const [emailRows] = await db.execute(checkEmailQuery, [email]);

  if (emailRows.length > 0) {
    return res.status(400).json({ message: 'Email address already in use' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Insert the new user into the database
  const insertUserQuery = 'INSERT INTO guests (guest_id, first_name, last_name, email_address, password, securityQuestion, securityAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await db.execute(insertUserQuery, [guest_id, firstName, lastName, email, hashedPassword, securityQuestion, securityAnswer]);

  res.status(201).json({ message: 'User created successfully', guest_id });
});


// auth for reset password
app.post('/api/auth/reset-password', async (req, res) => {
  const { email, securityQuestion, securityAnswer, password } = req.body;

  try {
    // Get user information based on the email address
    const [userRows] = await db.execute('SELECT * FROM guests WHERE email_address = ?', [email]);

    if (userRows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userRows[0];

    // Verify security question and answer
    if (user.securityQuestion !== securityQuestion || user.securityAnswer !== securityAnswer) {
      return res.status(400).json({ message: 'Invalid security question or answer' });
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Update the user's password in the database
    await db.execute('UPDATE guests SET password = ? WHERE email_address = ?', [hashedPassword, email]);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint for user information
app.get('/api/user/:guest_id', async (req, res) => {
  console.log('Fetching user data');
  const { guest_id } = req.params;

  try {
    const [userRows] = await db.execute('SELECT * FROM guests WHERE guest_id = ?', [guest_id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userRows[0];
    console.log('User data: ', user); // debug

     // Set the Content-Type header explicitly
     res.setHeader('Content-Type', 'application/json');

    res.status(200).json({
      guest_id: user.guest_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_address,
    });
  } catch (error) {
    console.error('Error during fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});