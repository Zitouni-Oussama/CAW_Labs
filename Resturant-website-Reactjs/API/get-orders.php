<?php
header("Content-Type: application/json");

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

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non spécifié.']);
    exit;
}

$query = "SELECT * FROM confirmed_cart WHERE userid = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode(['success' => true, 'orders' => $orders]);
} else {
    echo json_encode(['success' => false, 'message' => 'Aucune commande trouvée.']);
}

$stmt->close();
$conn->close();
?>
