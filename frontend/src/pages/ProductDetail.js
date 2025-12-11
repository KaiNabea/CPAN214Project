import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail({ handleAddToCart }) {
const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
    .then(res => setProduct(res.data))
    .catch(err => console.error('Product not found', err));
}, [id]);

if (!product) return <p>Loading...</p>;

return (
    <div className="container mt-4">
    <div className="row">
        {/* Image */}
        <div className="col-md-6">
        <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
        />
        </div>

        {/* Info */}
        <div className="col-md-6">
        <h2>{product.name}</h2>
        <p className="text-muted">{product.description}</p>
        <h4>${product.price} CAD</h4>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Delivery:</strong> Estimated 3-5 business days</p>

        <button
            className="btn btn-primary mt-3"
            onClick={() => handleAddToCart(product)}
        >
            Add to Cart
        </button>
        </div>
    </div>
    </div>
);
}

export default ProductDetail;
