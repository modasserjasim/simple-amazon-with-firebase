import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'

const Login = () => {
    const { user, loginWithEmail } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginWithEmail(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, { replace: true });

            })
            .catch(error => console.log(error))
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            {
                user?.email && <h3>You are already logged in.</h3>
            }
            {
                !user?.email &&
                <div>
                    <form onSubmit={handleLogin}>
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

            }

        </div>
    );
};

export default Login;