import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, handleAddToCart }) => {
return (
    <div className="card">
    <img
        src={product.image}
        alt={product.name}
        className="product-image"
    />

    <div className="card-title">{product.name}</div>
    <div className="card-desc">{product.description}</div>
    <div className="card-price">Price: ${product.price} CAD</div>
    <div>In Stock: {product.stock}</div>

    <button
        className="card-btn"
        onClick={() => handleAddToCart(product)}
        disabled={product.stock === 0}
    >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
    </div>
);
};

export default ProductCard;
