import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
