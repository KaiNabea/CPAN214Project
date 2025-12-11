import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function ProductForm({ onProductCreated }) {
const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
});

function ProductCard({ product, handleAddToCart }) {
return (
    <div className="card h-100 shadow-sm">
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
    src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description.substring(0, 50)}...</p>
        <p className="card-text"><strong>${product.price} CAD</strong></p>
        </div>
    </Link>
    <div className="card-footer bg-white border-top-0">
        <button onClick={() => handleAddToCart(product)} className="btn btn-outline-primary btn-sm w-100">
        Add to Cart
        </button>
    </div>
    </div>
);
}

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();

    API.post('products/', formData)
    .then(res => {
        console.log('Product created:', res.data);
        onProductCreated(); // notify parent to refresh list
        setFormData({ name: '', description: '', price: '', stock: '' }); // clear form
    })
    .catch(err => console.error('Create error:', err));
};

return (
    <div className="mb-5">
    <h4>Add New Product</h4>
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
        <button className="btn btn-primary" type="submit">Add Product</button>
    </form>
    </div>
);
}

export default ProductForm;
