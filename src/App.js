import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import pages
import Home from './Home';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
    <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
