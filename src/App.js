import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import pages
import Home from './Home';
import FAQ from './FAQ';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import Dashboard from './Dashboard';
import React from 'react';

import { CssBaseline } from '@mui/material';
import Footer from './components/Footer';
import { useEffect } from 'react';

function App() {

  // state variable to track if user is logged in/authenticated
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // function to toggle login
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // callback function to handle log in
  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  // callback function to handle log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    //print message to console
    console.log('User logged out');
  };


  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar isAuthenticated={isAuthenticated}
          handleAuthentication={handleAuthentication}
          handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/Home' element={<Home />} exact />
          <Route path="/faq" element={<FAQ />} exact />
          <Route path="/signin" element={<SignIn onAuthentication={handleAuthentication} />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/forgotpass" element={<ForgotPass />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;