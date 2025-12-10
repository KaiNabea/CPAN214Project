import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductForm from './ProductForm';

function ProductList() {
const [products, setProducts] = useState([]);

  // Fetch all products from Django API
const fetchProducts = () => {
    API.get('products/')
    .then(res => setProducts(res.data))
    .catch(err => console.error('Error fetching products:', err));
};

  // Delete product by ID
const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
    API.delete(`products/${id}/`)
        .then(() => {
        console.log('Deleted product', id);
          fetchProducts(); // refresh the list after delete
        })
        .catch(err => console.error('Delete error:', err));
    }
};

  // Fetch products on page load
useEffect(() => {
    fetchProducts();
}, []);

return (
    <div className="container mt-5">
    <h2 className="mb-4">Product List</h2>

      {/* Add Product Form */}
    <ProductForm onProductCreated={fetchProducts} />

    {products.length === 0 ? (
        <p>No products found.</p>
    ) : (
        <div className="row">
        {products.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => handleDelete(product.id)}
                >
                    Delete
                </button>
                <button
                className="btn btn-sm btn-secondary mt-2 ms-2"
                onClick={() => window.location.href = `/edit/${product.id}`}
                >
                Edit
                </button>

                </div>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
);
}

export default ProductList;
