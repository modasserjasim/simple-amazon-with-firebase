import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form>
                <input className='form-field' type="email" name="email" id="" placeholder='Enter your email' required /> <br />
                <input className='form-field' type="password" name="password" id="" placeholder='Enter your password' required /> <br />
                <button type="submit" className='form-btn'>Login</button>
            </form>
            <p className='already-account'>New to Ema-john? <Link to='/signup' className='switch-login'>Create New Account</Link></p>

            <div className='separator'>
                <p>or</p>
            </div>
            <button className='login-google'>Continue with Google</button>

        </div>
    );
};

export default Login;