import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import React from 'react';
import '../style/login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            const user = response.data;
            setUser(user);
            alert('Login successful');
            setRedirect(true);
        } catch (error) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/account'} />
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <input type="email" 
                           placeholder="your@email.com" 
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" 
                           placeholder="password" 
                           value={password} 
                           onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
                <div>
                    Don't have an account yet?
                    <Link to={'/register'} className="register-link"> Register Now</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
