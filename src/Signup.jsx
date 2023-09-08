import  { useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';
const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rollNoRef = useRef();
    const roleRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log('hello world');
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const rollNo = rollNoRef.current.value;
        const role =roleRef.current.value;
        console.log(name);
        axios.post('http://127.0.0.1:5000/register', {
            name,
            email,
            password,
            rollNo,
            role
        }).then((response) => {
            console.log(response);
            console.log('hello world');
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });

        setLoading(true);
        setLoading(false);
    };

    return (
        <div className={styles.signup_container}>
            <form onSubmit={handleSubmit} className={styles.signupform}>
                <h2>Sign Up</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className={styles.signupform_input_div}>
                    <input type="text" ref={nameRef} required placeholder='Name'/>
                </div>
                <div  className={styles.signupform_input_div}>
                    <input type="email" ref={emailRef} required placeholder='Email'/>
                </div>
                <div  className={styles.signupform_input_div}>
                    <input type="password" ref={passwordRef} required placeholder='Password'/>
                </div>
                <div className={styles.signupform_input_div}>
                    <input type="text" required ref={rollNoRef} placeholder='RollNo'/>
                </div>
                <div className={styles.signupform_input_div}>
                    <select name="roles" id="roles" ref={roleRef}>
                        <option value="member">Member</option>
                        <option value="category_lead">Catogery Lead</option>
                        <option value="lead">Lead</option>
                    </select>
                </div>
                <div className={styles.signupform_input_div}>
                    <button disabled={loading} type="submit">
                        Sign Up
                    </button>
                </div>
                <div>
                    Already have an account? <Link to="/">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;