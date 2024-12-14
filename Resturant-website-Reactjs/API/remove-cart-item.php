<?php
// Autoriser les requêtes CORS depuis localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Réponse préliminaire pour les requêtes OPTIONS
    exit(0);
}

// Inclure votre fichier de connexion à la base de données ici (si nécessaire)
// Se connecter à la base de données
$servername = "localhost";
$username = "root"; // par défaut dans XAMPP
$password = "";     // par défaut dans XAMPP
$dbname = "tp7"; // remplacez par le nom de votre base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);  // Affiche l'erreur si la connexion échoue
}

// Récupérer les données envoyées dans le corps de la requête
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier que userId et itemId sont présents dans les données
if (!$data) {
    echo "Données reçues invalides : " . file_get_contents('php://input');  // Affiche ce qui a été reçu
    exit;
}

if (isset($data['userId']) && isset($data['itemId'])) {
    $userId = $data['userId'];
    $itemId = $data['itemId'];

    // Suppression de l'article du panier
    $query = "DELETE FROM cart WHERE user_id = ? AND id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $userId, $itemId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Échec de la suppression de l'article", "details" => $stmt->error]);
    }
} else {
    echo json_encode(["error" => "Paramètres manquants"]);
}
?>
