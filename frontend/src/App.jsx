import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnimalDetails from './pages/AnimalDetails';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="page-wrapper container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animal/:id" element={<AnimalDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
