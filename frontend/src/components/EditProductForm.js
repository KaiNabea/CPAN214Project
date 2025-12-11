import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function EditProductForm() 
{
const { id } = useParams();
const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
});

  // Load existing product data
useEffect(() => {
    API.get(`products/${id}/`)
    .then(res => setFormData(res.data))
    .catch(err => console.error('Load error:', err));
}, [id]);

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`products/${id}/`, formData)
    .then(() => {
        console.log('Product updated');
        navigate('/'); // redirect to home
    })
    .catch(err => console.error('Update error:', err));
};

return (
    <div className="container mt-5">
    <h3>Edit Product</h3>
    <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
        </div>
        <div className="mb-2">
        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        </div>
        <div className="mb-2">
        <input className="form-control" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
        </div>
        <div className="mb-2">
        <input className="form-control" name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
        </div>
        <button className="btn btn-success" type="submit">Save Changes</button>
    </form>
    </div>
);
}

export default EditProductForm;
