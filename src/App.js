import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import pages
import Home from './Home';
import FAQ from './FAQ';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import Dashboard from './Dashboard';

import { CssBaseline } from '@mui/material';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/Home' element={<Home />} exact />
          <Route path="/faq" element={<FAQ /> } exact />
          <Route path="/signin" element={<SignIn />} exact />
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