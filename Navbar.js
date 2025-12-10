import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <Link className="navbar-brand" to="/">Merch Store</Link>
    <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
        {isLoggedIn && (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/add">Add Product</Link>
            </li>
            </>
        )}
        </ul>
        <ul className="navbar-nav ms-auto">
        {isLoggedIn ? (
            <li className="nav-item">
            <button className="btn btn-sm btn-outline-light" onClick={onLogout}>Logout</button>
            </li>
        ) : (
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
        )}
        </ul>
    </div>
    </nav>
);
}

export default Navbar;
