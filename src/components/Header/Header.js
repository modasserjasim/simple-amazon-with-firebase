import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logout successful');
            }).catch((error) => {
                console.log(error);
            });

    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.email ? <Link onClick={handleLogOut}>Signout</Link> : <><Link to="/login">Login</Link> <Link to="/signup">Sign Up</Link></>
                }
                {user?.email && <Link className='welcome-user'>Welcome, {user.email}</Link>}

            </div>
        </nav>
    );
};

export default Header;