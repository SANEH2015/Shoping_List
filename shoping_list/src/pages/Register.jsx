import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../component/Navigation';


export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    alert('Registration submitted!'); 
    navigate('/'); 
  };

  return (
    <div style={styles.container}>
     
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input type="text" required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input type="email" required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input type="password" required style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  formContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    border: '1px solid rgb(86, 182, 201)',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'rgb(86, 182, 201)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: 'rgb(86, 182, 201)',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid rgb(86, 182, 201)',
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgb(86, 182, 201)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

