import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import pages
import Home from './Home';
import FAQ from './FAQ';
import SignIn from './SignIn';
import SignUp from './SignUp';

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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
