import React, { useEffect, useState } from 'react';

function Cart() {
const [cart, setCart] = useState([]);

useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(saved);
}, []);

const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

return (
    <div className="container mt-4">
    <h2>Your Cart</h2>

    {cart.length === 0 ? (
        <p>Your cart is empty.</p>
    ) : (
        <>
        <ul className="list-group mb-3">
            {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                <h5>{item.name}</h5>
                <small className="text-muted">{item.description}</small>
                </div>
                <span>${item.price} CAD</span>
            </li>
            ))}
        </ul>

        <h4>Total: ${totalPrice} CAD</h4>
        <button className="btn btn-success mt-3">Checkout (Coming Soon)</button>
        </>
    )}
    </div>
);
}

export default Cart;
