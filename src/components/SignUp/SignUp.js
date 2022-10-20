import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const { signUpWithEmail } = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(email, password, confirmPassword);

        // validation
        if (password.length < 6) {
            setError('Your password should be atleast 6 char');
            return;
        }
        if (password !== confirmPassword) {
            setError('Your password did not matched');
            return;
        }
        signUpWithEmail(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.log(error));
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input className='form-field' type="email" name="email" id="" placeholder='Enter your email' required /> <br />
                <input className='form-field' type="password" name="password" id="" placeholder='Enter your password' required /> <br />
                <input className='form-field' type="password" name="confirmPassword" id="" placeholder='Confirm your password' required /> <br />
                <p className='text-error'>{error}</p>
                <button type="submit" className='form-btn'>Sign Up</button>
            </form>
            <p className='already-account'>Already have an account? <Link to='/login' className='switch-login'>login</Link></p>

            <div className='separator'>
                <p>or</p>
            </div>
            <button className='login-google'>Continue with Google</button>

        </div>
    );
};

export default SignUp;