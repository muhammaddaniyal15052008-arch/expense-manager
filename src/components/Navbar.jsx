import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      background: '#eee' 
    }}>
      <div>MyLogo</div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/totalexpense">TotalExpense</Link>
      </div>
    </nav>
  );
};

export default Navbar;