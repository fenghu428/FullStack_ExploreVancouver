import { Link, useNavigate } from 'react-router-dom';
import React, { useState }  from 'react';
import axios from 'axios';
import '../style/register.css';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post('./register', {
                name, 
                email,
                password,
            });
            alert('Registration sucessful. Now you can log in');
            navigate('/login');

        } catch (e) {
            alert('Registration failed. Please try again later');
        }
    }
    return (
        <div className="register-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={registerUser}>
                <div className="form-group">
                    <input type="text"
                           placeholder="name"
                           value={name}
                           onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="email" 
                           placeholder="your@email.com"
                           value={email}
                           onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" 
                           placeholder="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
                <div>
                    Already a member?
                    <Link to={'/login'} className="login-link"> Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
