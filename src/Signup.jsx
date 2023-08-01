import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://127.0.0.1:5000/register', {
            name,
            email,
            password,
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });

        setLoading(true);
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div>
                    <label>Name</label>
                    <input type="text" ref={nameRef} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" ref={emailRef} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required />
                </div>
                <button disabled={loading} type="submit">
                    Sign Up
                </button>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;