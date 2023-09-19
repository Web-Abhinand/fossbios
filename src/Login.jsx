import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token); 
                navigate('/dashboard');
              }
        }).catch((err) => {
            console.log(err);
        });
      console.log('Login: ', email, password);
    };
  
    return (
      <div className={styles.login_container} style={{width:'15%',margin:'0 auto',position:'absolute',top:"30%",left:'40%'}}>
        <form onSubmit={handleSubmit} className={styles.loginform}>
          <h2>Login</h2>
          <div className={styles.loginform_input_div}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className={styles.loginform_input_div}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <div className={styles.loginform_input_div}>
            <button type="submit">Login</button>
          </div>
        </form>
        <div>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }

export default Login