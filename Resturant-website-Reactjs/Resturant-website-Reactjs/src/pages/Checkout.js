import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import pour récupérer userId
import "./../styles/CheckoutStyles.css";
import Layout from "./../components/Layout/Layout";

const Checkout = () => {
    const location = useLocation(); // Utilisation de useLocation
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
    const { totalPrice, foodDetails } = location.state || { totalPrice: 0, foodDetails: "" };

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userId, setUserId] = useState(null);

    // Récupération du userId depuis les cookies
    useEffect(() => {
        const userIdFromCookie = Cookies.get('user_id');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            userid: userId,
            name,
            phone,
            address,
            totalPrice,
            food: foodDetails, // Envoyer les détails des articles sous forme de chaîne
        };

        try {
            const response = await fetch('http://localhost/api/add-order.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Commande ajoutée avec succès:', result.message);
                alert('Votre commande a été confirmée avec succès!');
                navigate('/menu'); // Redirection vers la page du menu
            } else {
                console.error('Erreur lors de l\'ajout de la commande:', result.message);
                alert('Une erreur est survenue lors de la confirmation de votre commande.');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            alert('Impossible de se connecter au serveur.');
        }
    };

    if (!totalPrice || !foodDetails) {
        return <div>Erreur: Pas de données de panier disponibles.</div>;
    }

    // Function to parse foodDetails string into an array of items
    const parseFoodDetails = (foodDetails) => {
        return foodDetails.split('#').map(item => {
            const [food, quantity] = item.split('(');
            return {
                food: food.trim(),
                quantity: parseInt(quantity.replace(')', '').trim(), 10),
            };
        });
    };

    const foodItems = parseFoodDetails(foodDetails);

    return (
        <Layout>
            <div className="checkout-container">
                <h1>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nom:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Numéro de téléphone:</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Adresse:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="food-details">
                        <h3>Détails des articles:</h3>
                        <ul>
                            {foodItems.map((item, index) => (
                                <li key={index}>
                                    {item.food} (Quantité: {item.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="total-price">
                        <h3>Total: {totalPrice} USD</h3>
                    </div>

                    <button type="submit">Confirmer la commande</button>
                </form>
            </div>
        </Layout>
    );
};

export default Checkout;
