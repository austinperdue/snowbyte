import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHippo } from '@fortawesome/free-solid-svg-icons'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
