<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
$host = "localhost";
$user = "root"; // Changez si un autre utilisateur est configuré
$password = ""; // Mettez votre mot de passe de base de données
$dbname = "tp7"; // Changez en fonction de votre base de données

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion : " . $conn->connect_error]));
}

$sql = "SELECT id, name, description, image, price, cat FROM Food";
$result = $conn->query($sql);

$menu = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $menu[] = $row;
    }
}

echo json_encode($menu);

$conn->close();
?>
