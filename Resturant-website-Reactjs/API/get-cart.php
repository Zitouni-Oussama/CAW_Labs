<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); // Autorise uniquement localhost:3000
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autorise les en-têtes spécifiques
header("Access-Control-Allow-Credentials: true");

// Se connecter à la base de données
$servername = "localhost";
$username = "root"; // par défaut dans XAMPP
$password = "";     // par défaut dans XAMPP
$dbname = "tp7"; // remplacez par le nom de votre base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Récupérer les données du panier pour un utilisateur donné
$userId = $_GET['userId']; // Récupérer l'ID de l'utilisateur depuis la requête GET

// Préparer la requête SQL pour récupérer les articles du panier
$sql = "SELECT * FROM cart WHERE user_id = '$userId'";

// Exécuter la requête
$result = $conn->query($sql);

// Vérifier si des résultats sont retournés
if ($result->num_rows > 0) {
    // Tableau pour stocker les articles du panier
    $cartItems = [];
    
    while($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }
    
    // Retourner les articles sous forme de JSON
    echo json_encode($cartItems);
} else {
    echo json_encode(['error' => 'Aucun article dans le panier']);
}

$conn->close();
?>
