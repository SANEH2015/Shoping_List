import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const navStyles = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgb(86, 182, 201)',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const activeStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
  };

  const hoverStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <div style={{ width: '100%' }}>
      <nav style={navStyles}>
        <NavLink 
          style={({ isActive }) => ({
            ...linkStyles,
            ...(isActive ? activeStyles : {}),
          })}
          to="/" 
          exact
        >
          Home
        </NavLink>
        <NavLink 
          style={({ isActive }) => ({
            ...linkStyles,
            ...(isActive ? activeStyles : {}),
          })}
          to="/Login"
        >
          Login
        </NavLink>
        <NavLink 
          style={({ isActive }) => ({
            ...linkStyles,
            ...(isActive ? activeStyles : {}),
          })}
          to="Register"
        >
          Register
        </NavLink>
        <NavLink 
          style={({ isActive }) => ({
            ...linkStyles,
            ...(isActive ? activeStyles : {}),
          })}
          to="/Contact"
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
}
