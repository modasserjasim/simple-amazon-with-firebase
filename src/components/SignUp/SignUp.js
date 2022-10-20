import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form>
                <input className='form-field' type="email" name="email" id="" placeholder='Enter your email' required /> <br />
                <input className='form-field' type="password" name="password" id="" placeholder='Enter your password' required /> <br />
                <input className='form-field' type="password" name="password" id="" placeholder='Confirm your password' required /> <br />
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