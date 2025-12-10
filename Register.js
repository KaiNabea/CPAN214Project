import React, { useState } from 'react';
import API from '../services/api';

function Register() {
const [formData, setFormData] = useState({ username: '', password: '' });
const [message, setMessage] = useState('');
const [error, setError] = useState('');

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    API.post('register/', formData)
    .then(() => {
        setMessage('User registered! You can now log in.');
        setFormData({ username: '', password: '' });
    })
    .catch(err => {
        const msg = err.response?.data?.error || 'Registration failed';
        setError(msg);
    });
};

return (
    <div className="container mt-5">
    <h3>Register</h3>
    {message && <div className="alert alert-success">{message}</div>}
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <input className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className="mb-2">
        <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
    </form>
    </div>
);
}

export default Register;
