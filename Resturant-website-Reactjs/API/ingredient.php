<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "tp7"; // Remplacez par votre base de données
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connexion échouée : " . $conn->connect_error]));
}

$food_id = isset($_GET['food_id']) ? intval($_GET['food_id']) : 0;

if ($food_id > 0) {
    $query = "SELECT * FROM ingredient WHERE food_id = $food_id";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $ingredients = [];
        while ($row = $result->fetch_assoc()) {
            $ingredients[] = $row;
        }
        echo json_encode($ingredients);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "ID d'aliment invalide."]);
}

$conn->close();
?>
