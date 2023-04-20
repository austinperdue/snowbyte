const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'snowbyte-db-do-user-13916321-0.b.db.ondigitalocean.com', 
  user: 'doadmin', 
  password: 'AVNS_Cu0RIaivJmdP8HEI64E',
  database: 'defaultdb', 
  port: 25060, 
});

db.connect((error) => {
  if (error) {
    console.error('Error connecting to the MySQL database:', error);
    return;
  }
  console.log('Connected to the MySQL database');
});

// API endpoint for user login
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  // Implement your authentication logic here, for example:
  // 1. Query the database for a user with the provided email
  // 2. Verify the provided password against the stored password
  // 3. Return a success response with user data or an error message

  res.status(200).json({ message: 'Login successful' });
});

const PORT = process.env.PORT || 25060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});