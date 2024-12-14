import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Pour récupérer l'userId
import "./../styles/OrderTicketStyles.css";
import Layout from "./../components/Layout/Layout";

const OrderTicket = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = Cookies.get("user_id");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost/api/get-orders.php?user_id=${userId}`);
                const data = await response.json();

                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.message || "Une erreur s'est produite.");
                }
            } catch (err) {
                setError("Impossible de se connecter au serveur.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        } else {
            setError("Utilisateur non connecté.");
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <div>Chargement des commandes...</div>;
    }

    if (orders.length === 0) {
        return (
            <Layout>
                <div className="order-ticket-container">
                    <h1>Vos commandes</h1>
                    <div className="empty-orders">
                        <p>Vous n'avez aucune commande pour le moment.</p>
                        <p>Explorez notre menu et passez votre première commande !</p>
                        <button className="btn-order-now" onClick={() => window.location.href = "/menu"}>
                            Voir le menu
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="order-ticket-container">
                <h1>Vos commandes</h1>
                {orders.map((order, index) => (
                    <div className="ticket" key={index}>
                        <h2>Commande #{order.id}</h2>
                        <p><strong>Nom:</strong> {order.name}</p>
                        <p><strong>Téléphone:</strong> {order.phone}</p>
                        <p><strong>Adresse:</strong> {order.address}</p>
                        <p><strong>Prix total:</strong> {order.totalPrice} USD</p>
                        <p><strong>Heure de commande:</strong> {order.time}</p> {/* Affichage de la variable `time` */}
                        <h3>Détails des articles:</h3>
                        <ul>
                            {order.food.split('#').map((item, idx) => {
                                const [food, quantity] = item.split('(');
                                return (
                                    <li key={idx}>
                                        {food.trim()} (Quantité: {quantity.replace(')', '').trim()})
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default OrderTicket;
