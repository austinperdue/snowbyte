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
  //console.log('A guest is trying to log in!');
  //console.log('DEBUG: req.body:', req.body); // debug
  // print environmental variable for react api url
  console.log('DEBUG: process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
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

// API endpoint to query for guest reservations
app.get('/api/reservations/:guest_id', async (req, res) => {
  console.log('Querying for guest reservations');
  const { guest_id } = req.params;

  try {
    // Query the database for reservations with the provided guest_id
    const [reservationRows] = await db.execute('SELECT * FROM reservations WHERE guest_id = ?', [guest_id]);

    if (reservationRows.length === 0) {
      console.log(`No reservations found for guest_id: ${guest_id}`);
      return res.status(200).json({ message: 'No reservations found', reservations: [] });
    }

    console.log(`Reservations found for guest_id: ${guest_id}`);
    res.status(200).json({ message: 'Reservations retrieved successfully', reservations: reservationRows });
  } catch (error) {
    console.error('Error during reservations retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for employee login
app.post('/api/auth/employees', async (req, res) => {
  console.log('An employee is trying to log in!');
  //console.log('req.body:', req.body); // debug
  const { employee_id, password } = req.body;

    // Check that employee_id and password are not undefined
    if (employee_id === undefined || password === undefined) {
      return res.status(400).json({ message: 'Missing employee ID or password' });
    }


  try {
    // 1. Query the database for a user with the provided email
    const [userRows] = await db.execute('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);

    if (userRows.length === 0) {
      return res.status(400).json({ message: 'Invalid employee ID or password' });
    }

    const user = userRows[0];

    // 2. Verify the provided password against the stored password
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid employee ID or password' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      {
        employee_id: user.employee_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email_address,
      },
      process.env.JWT_SECRET,
      { expiresIn: '600s' } // token expires in 10 minutes (600 seconds)
    );

    // 4. Return a success response with user data or an error message
    res.status(200).json({
      message: 'Employee login successful',
      employee_id: user.employee_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_address,
      token,
    });
  } catch (error) {
    console.error('Error during employee login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Employee Lookup API endpoint for retrieving guest reservations
app.get('/api/reservations/:guest_id', async (req, res) => {
  const { guest_id } = req.params;

  // Check that guest_id is not undefined
  if (guest_id === undefined) {
    return res.status(400).json({ message: 'Missing guest ID' });
  }

  try {
    // Query the database for reservations with the provided guest_id
    const [reservationsRows] = await db.execute('SELECT * FROM reservations WHERE guest_id = ?', [guest_id]);

    if (reservationsRows.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this guest ID' });
    }

    // Return a success response with reservation data
    res.status(200).json({
      message: 'Reservations fetched successfully',
      reservations: reservationsRows
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for retrieving guest rentals
app.get('/api/rentals/:guest_id', async (req, res) => {
  const { guest_id } = req.params;

  // Check that guest_id is not undefined
  if (guest_id === undefined) {
    return res.status(400).json({ message: 'Missing guest ID' });
  }

  try {
    // Query the database for rentals with the provided guest_id
    const [rentalsRows] = await db.execute('SELECT * FROM rentals WHERE guest_id = ?', [guest_id]);

    if (rentalsRows.length === 0) {
      console.log('No rentals found for this guest ID: ', guest_id);
      return res.status(200).json({
        message: 'No rentals found for this guest ID',
        rentals: []
      });
    }

    // Return a success response with rental data
    res.status(200).json({
      message: 'Rentals fetched successfully',
      rentals: rentalsRows
    });
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint for making a reservation
app.post('/api/order', async (req, res) => {
  console.log('A guest is placing an order!');
  
  const {
    guestId,
    checkInDate: rawCheckInDate,
    checkOutDate: rawCheckOutDate,
    rentalType,
    roomType,
    rentalDate: rawRentalDate,
    returnDate: rawReturnDate,
  } = req.body;

  // generates random 8 digit number
  const generateRandomId = () => {
    return parseInt(crypto.randomBytes(4).toString('hex'), 16) % 100000000;
  };

  const checkinDate = new Date(rawCheckInDate).toISOString().replace('T', ' ').slice(0, 19);
  const checkoutDate = new Date(rawCheckOutDate).toISOString().replace('T', ' ').slice(0, 19);
  const rentalDate = new Date(rawRentalDate).toISOString().replace('T', ' ').slice(0, 19);
  const returnDate = new Date(rawReturnDate).toISOString().replace('T', ' ').slice(0, 19);


  console.log('req.body:', req.body); // debug

  const connection = await db.getConnection();

  try {
    const reservationId = generateRandomId();
    const rentalId = generateRandomId();
    const employeeId = "ONLINE";

    await connection.beginTransaction();

    const [availableRooms] = await connection.query(
      `SELECT room_id FROM rooms WHERE NOT EXISTS (
        SELECT * FROM reservations WHERE
        rooms.room_id = reservations.room_id AND
        ((checkin_date BETWEEN ? AND ?) OR
        (checkout_date BETWEEN ? AND ?)))`,
      [checkinDate, checkoutDate, checkinDate, checkoutDate]
    );

    if (!availableRooms.length) {
      throw new Error('No rooms available for the selected date range');
    }

    // Select the first available room
    const roomId = availableRooms[0].room_id;

    const [result] = await connection.query(
      'INSERT INTO reservations (reservation_id, guest_id, employee_id, room_id, checkin_date, checkout_date) VALUES (?, ?, ?, ?, ?, ?)',
      [reservationId, guestId, employeeId, roomId, checkinDate, checkoutDate]
    );

    if (!result.affectedRows) {
      throw new Error('Failed to make a reservation');
    }

    // process rental if necessary
    if (rentalType !== 'No rentals') {
      const [rentalResult] = await connection.query(
        'INSERT INTO rentals (rental_id, guest_id, employee_id, rental_type, rental_date, return_date) VALUES (?, ?, ?, ?, ?, ?)',
        [rentalId, guestId, employeeId, rentalType, rentalDate, returnDate]
      );

      if (!rentalResult.affectedRows) {
        throw new Error('Failed to make a rental');
      }
    }

    await connection.commit();

    res.status(200).json({
      message: 'Reservation made successfully',
      reservationId: reservationId,
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error during reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.release();
  }
});




