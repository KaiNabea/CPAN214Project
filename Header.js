import React from 'react';
import './Header.css';

const Header = ({ search, setSearch, cartCount, onLogout, userLoggedIn }) => {
return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
        <h2 className="text-warning mb-0">Merch Store</h2>
    </div>

    <div className="d-flex align-items-center gap-2 flex-grow-1 mx-3">
        <input
        type="text"
        placeholder="Search products..."
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-white ms-3">🛒 Cart ({cartCount})</span>
    </div>

    {userLoggedIn && (
        <button onClick={onLogout} className="btn btn-outline-warning btn-sm">
        Logout
        </button>
    )}
    </nav>
);
};

export default Header;
