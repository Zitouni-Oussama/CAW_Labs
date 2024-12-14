import React, { useEffect, useState } from 'react';
import Layout from "./../components/Layout/Layout";
import Cookies from 'js-cookie';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
import './../styles/CartStyles.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [foodDetails, setFoodDetails] = useState(""); // Store food details as a string

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const userIdFromCookie = Cookies.get('user_id');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost/api/get-cart.php?userId=${userId}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setCartItems(data);
                }
            } catch (error) {
                setError('Erreur lors de la récupération des articles du panier');
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost/api/remove-cart-item.php`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, itemId }),
            });

            const text = await response.text();
            const data = JSON.parse(text);

            if (data.success) {
                setCartItems(cartItems.filter(item => item.id !== itemId));
            } else {
                setError('Erreur lors de la suppression de l\'article');
            }
        } catch (error) {
            setError('Erreur lors de la suppression de l\'article');
        }
    };

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
        setTotalPrice(total.toFixed(2));

        const foodDetails = cartItems.map(item => `${item.menu_name} (${item.quantity})`).join('#');
        setFoodDetails(foodDetails); // Update food details
    }, [cartItems]);

    // Navigate to the checkout page with total price and food details
    const handleCheckout = () => {
        navigate('/checkout', {
            state: { totalPrice, foodDetails }
        });
    };

    return (
        <Layout>
            <div className="cart-container">
                <h1 className="cart-title">Votre Panier</h1>

                {/* {error && <p className="cart-error-message">{error}</p>} */}

                {cartItems.length === 0 ? (
                    <p className="empty-cart-message">Votre panier est vide.</p>
                ) : (
                    <div>
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <div className="cart-item-left">
                                        <h3 className="cart-item-name">
                                            {item.menu_name}
                                        </h3>
                                        <p className="cart-item-quantity">Quantité: {item.quantity}</p>
                                    </div>
                                    <p className="cart-item-price">{item.total_price} USD</p>
                                    <IconButton
                                        onClick={() => handleRemoveItem(item.id)}
                                        sx={{ width: '80px' }}
                                    >
                                        <Delete color='warning' className="cart-item-delete-button" />
                                    </IconButton>

                                </li>
                            ))}
                        </ul>



                        <div className="total-price-container">
                            <p className="total-price">Total: {totalPrice} USD</p>
                        </div>

                        <div className="checkout-button-container">
                            <button className="checkout-button" onClick={handleCheckout}>
                                Procéder au paiement
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
