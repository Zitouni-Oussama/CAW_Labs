<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Autorise uniquement localhost:3000
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Autorise les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autorise les en-têtes spécifiques
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Connexion à la base de données
$host = 'localhost';
$dbname = 'tp7';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
    exit();
}

// Récupération des données JSON envoyées
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userid'], $data['name'], $data['phone'], $data['address'], $data['totalPrice'], $data['food'])) {
    $userid = $data['userid'];
    $name = $data['name'];
    $phone = $data['phone'];
    $address = $data['address'];
    $totalPrice = $data['totalPrice'];
    $foodDetails = $data['food'];

    // Insertion dans la table confirmed_cart
    $sql = "INSERT INTO confirmed_cart (userid, name, phone, address, totalPrice, food) VALUES (:userid, :name, :phone, :address, :totalPrice, :food)";
    $stmt = $pdo->prepare($sql);

    try {
        $pdo->beginTransaction();

        // Exécuter l'insertion
        $stmt->execute([
            ':userid' => $userid,
            ':name' => $name,
            ':phone' => $phone,
            ':address' => $address,
            ':totalPrice' => $totalPrice,
            ':food' => $foodDetails,
        ]);

        // Parse les détails des articles pour extraire les noms des articles
        $foodItems = explode('#', $foodDetails);
        foreach ($foodItems as $item) {
            $menuName = trim(explode('(', $item)[0]);

            // Suppression des articles correspondants dans le tableau cart
            $deleteSql = "DELETE FROM cart WHERE menu_name = :menu_name AND user_id = :user_id";
            $deleteStmt = $pdo->prepare($deleteSql);
            $deleteStmt->execute([
                ':menu_name' => $menuName,
                ':user_id' => $userid,
            ]);
        }

        $pdo->commit();

        echo json_encode(['success' => true, 'message' => 'Commande ajoutée avec succès et articles supprimés du panier']);
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion ou de la suppression des articles']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
}
?>
