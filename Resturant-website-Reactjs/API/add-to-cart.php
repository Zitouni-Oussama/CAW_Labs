<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); // Autorise uniquement localhost:3000
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Autorise les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autorise les en-têtes spécifiques
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json"); // Assurez-vous que le type de contenu est bien JSON

// Se connecter à la base de données
$servername = "localhost";
$username = "root"; // par défaut dans XAMPP
$password = "";     // par défaut dans XAMPP
$dbname = "tp7"; // remplacez par le nom de votre base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    echo json_encode(['error' => 'Échec de la connexion à la base de données']);
    exit();
}

// Récupération des données envoyées
$raw_data = file_get_contents("php://input");

// Déboguer les données brutes reçues
// echo "Données reçues (brutes) : " . htmlspecialchars($raw_data) . "<br>"; // Ne pas afficher les données brutes pour la production

// Décoder les données JSON
$data = json_decode($raw_data, true);

// Vérifier si le décodage a échoué
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Erreur de décodage JSON: ' . json_last_error_msg()]);
    exit();
}

// Vérification des données reçues
if (!isset($data['userId'], $data['menuName'], $data['totalPrice'], $data['quantity'])) {
    echo json_encode(['error' => 'Données manquantes']);
    exit();
}

$userId = $data['userId'];
$menuName = $data['menuName'];
$totalPrice = $data['totalPrice'];
$quantity = $data['quantity'];

// Insertion dans la base de données
$sql = "INSERT INTO cart (user_id, menu_name, total_price, quantity) 
        VALUES ('$userId', '$menuName', '$totalPrice', '$quantity')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Article ajouté au panier']);
} else {
    echo json_encode(['error' => 'Erreur lors de l\'ajout au panier: ' . $conn->error]);
}

$conn->close();
?>
