import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import pages
import Home from './Home';

function App() {
  return (
    <>
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
