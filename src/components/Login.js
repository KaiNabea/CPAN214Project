import React, { useState } from 'react';
import API from '../services/api';

function Login({ onLogin }) {
const [formData, setFormData] = useState({ username: '', password: '' });
const [error, setError] = useState('');

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    API.post('login/', formData)
    .then(res => {
        localStorage.setItem('token', res.data.token);
        onLogin(); // callback to parent
    })
    .catch(err => {
        console.error(err);
        setError('Invalid credentials');
    });
};

return (
    <div className="container mt-5">
    <h3>Login</h3>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <input className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
        </div>
        <div className="mb-2">
        <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
    </form>
    </div>
);
}

export default Login;
