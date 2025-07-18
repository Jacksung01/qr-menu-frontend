import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerMenu from './pages src/CustomerMenu';
import AdminDashboard from './pages src/AdminDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<CustomerMenu />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Router>
);
