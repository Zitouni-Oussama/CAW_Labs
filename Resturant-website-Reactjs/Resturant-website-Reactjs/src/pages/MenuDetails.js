import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import Cookies from 'js-cookie';

const MenuDetails = () => {
    const location = useLocation();
    const { menu } = location.state; // Récupérer les données du menu
    const [ingredients, setIngredients] = useState([]); // État pour stocker les ingrédients
    const [loading, setLoading] = useState(true); // État pour le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userIdFromCookie = Cookies.get('user_id');
        setUserId(userIdFromCookie);
    }, []);

    // Charger les ingrédients depuis ingredient.php
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`http://localhost/api/ingredient.php?food_id=${menu.id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données.");
                }
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, [menu.id]);

    
    const handleAddToCart = async () => {
        const requestData = {
            userId: userId,
            menuName: menu.name,
            totalPrice: totalPrice,
            quantity: quantity
        };

        // Déboguer avant d'envoyer la requête
        console.log("Données envoyées:", JSON.stringify(requestData));

        try {
            const response = await fetch("http://localhost/api/add-to-cart.php", {
                method: "POST", // Assurez-vous que la méthode est POST
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            // Lire la réponse brute
            const text = await response.text();
            console.log("Réponse brute:", text); // Afficher la réponse brute

            try {
                // Essayer de parser la réponse en JSON
                const data = JSON.parse(text);
                console.log("Données reçues:", data);

                // Traiter la réponse JSON ici
                const messageElement = document.getElementById('message');

                if (data.success) {
                    console.log("Article ajouté au panier avec succès");

                    // Afficher un message de succès sur l'écran
                    messageElement.textContent = "Article ajouté au panier avec succès!";
                    messageElement.style.display = 'block'; // Afficher le message
                    messageElement.style.color = 'green';  // Optionnel : définir la couleur du texte
                } else {
                    console.error("Erreur lors de l'ajout au panier:", data.error);

                    // Afficher un message d'erreur sur l'écran
                    messageElement.textContent = "Erreur lors de l'ajout au panier: " + data.error;
                    messageElement.style.display = 'block'; // Afficher le message
                    messageElement.style.color = 'red';  // Optionnel : définir la couleur du texte
                }

                // Masquer le message après 2 secondes
                setTimeout(() => {
                    messageElement.style.display = 'none'; // Cacher le message après 2 secondes
                }, 2000);

            } catch (jsonError) {
                console.error("Erreur lors du parsing JSON:", jsonError);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier:", error);

            // Afficher un message d'erreur général sur l'écran
            const messageElement = document.getElementById('message');
            messageElement.textContent = "Une erreur est survenue lors de l'ajout au panier.";
            messageElement.style.display = 'block'; // Afficher le message
            messageElement.style.color = 'red';  // Optionnel : définir la couleur du texte

            // Masquer le message après 2 secondes
            setTimeout(() => {
                messageElement.style.display = 'none'; // Cacher le message après 2 secondes
            }, 2000);
        }
    };



    const [quantity, setQuantity] = useState(1);

    // Fonction pour augmenter la quantité
    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Fonction pour diminuer la quantité
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const totalPrice = menu.price * quantity; // Calculer directement le prix total

    return (
        <Layout>
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row", // Flex direction row for desktop
                    alignItems: "flex-start",
                    gap: "30px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.8)",
                    margin: "50px 20px",
                    paddingRight: "80px",
                    paddingLeft: "30px",
                    maxWidth: "1400px",
                    flexWrap: "wrap", // Allows wrapping for small screens
                }}
            >
                {/* Image à gauche */}
                <img
                    src={`/images/${menu.image}`}
                    alt={menu.name}
                    style={{
                        width: "40%",
                        maxWidth: "450px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                        marginBottom: "20px", // Add margin for mobile responsiveness
                        flex: "1 1 100%", // Take full width on mobile
                    }}
                />

                {/* Texte à droite */}
                <div style={{ flex: "1", padding: "10px", width: "100%" }}>
                    {/* Nom et prix */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            flexWrap: "wrap", // Allows wrapping for mobile devices
                        }}
                    >
                        <h1
                            style={{
                                color: "#333",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                margin: "0",
                                flex: "1", // Ensures title takes available space
                            }}
                        >
                            {menu.name}
                        </h1>
                        <h2
                            style={{
                                color: "#1e88e5",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                margin: "0",
                                backgroundColor: "#fff7e1",
                                padding: "5px 10px",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            {menu.price} USD
                        </h2>
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: "1.1rem",
                            color: "#555",
                            lineHeight: "1.8",
                            marginBottom: "20px",
                        }}
                    >
                        {menu.description}
                    </p>

                    {/* Liste des ingrédients */}
                    <div style={{ marginTop: "20px" }}>
                        <h3
                            style={{
                                fontSize: "1.25rem",
                                color: "#333",
                                marginBottom: "10px",
                            }}
                        >
                            Ingrédients :
                        </h3>
                        {loading ? (
                            <p style={{ fontSize: "14px", color: "#888" }}>
                                Chargement des ingrédients...
                            </p>
                        ) : error ? (
                            <p style={{ fontSize: "14px", color: "red" }}>
                                Erreur : {error}
                            </p>
                        ) : ingredients.length > 0 ? (
                            <ul
                                style={{
                                    paddingLeft: "20px",
                                    listStyleType: "circle",
                                    color: "#555",
                                    lineHeight: "1.8",
                                }}
                            >
                                {ingredients.map((ingredient) => (
                                    <li
                                        key={ingredient.id}
                                        style={{
                                            fontSize: "16px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {ingredient.ingredient_name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontSize: "14px", color: "#888" }}>
                                Aucun ingrédient disponible.
                            </p>
                        )}
                    </div>

                    {/* Contrôle des pièces et ajout au panier */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginTop: "20px",
                            flexWrap: "wrap", // Allows wrapping for small screens
                        }}
                    >
                        <button
                            onClick={handleDecrease}
                            style={{
                                padding: "10px 15px",
                                fontSize: "16px",
                                backgroundColor: "#ff6f61",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                width: "50px", // Set width to make button consistent
                            }}
                            disabled={quantity <= 1} // Désactiver si la quantité est 1
                        >
                            -
                        </button>
                        <span
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            style={{
                                padding: "10px 15px",
                                fontSize: "16px",
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                width: "50px", // Set width to make button consistent
                            }}
                        >
                            +
                        </button>
                        <span
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: "#1e88e5",
                                marginLeft: "20px",
                            }}
                        >
                            Total: {totalPrice.toFixed(2)} USD
                        </span>

                        {/* Ajouter au panier */}
                        <button
                            onClick={handleAddToCart}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                backgroundColor: "#ffb74d",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                marginLeft: "20px",
                                width: "auto", // Make button width auto for flexibility
                            }}
                        >
                            Ajouter au panier
                        </button>
                    </div>

                    {/* Message de confirmation */}
                    <div
                        id="message"
                        style={{
                            display: "none",
                            color: "green",
                            fontSize: "16px",
                            marginTop: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        Article ajouté au panier avec succès !
                    </div>
                </div>
            </div>
        </Layout>
    );



};

export default MenuDetails;
