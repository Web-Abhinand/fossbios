import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }

export default Login