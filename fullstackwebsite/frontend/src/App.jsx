import React from 'react';

import LoginPage from './components/LoginPage';
import Home from './components/Home';
import './styles.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path="/mail" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
