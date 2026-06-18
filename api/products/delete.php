<?php

header('Content-Type: application/json');
require_once '../db.php';
$data = json_decode(
    file_get_contents("php://input"),
    true
);

try {
    $stmt = $pdo->prepare("
        DELETE FROM product
        WHERE id_product = :id
    ");

    $stmt->execute([
        'id' => $data['id_product']
    ]);
    echo json_encode([
        "success" => true
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}