<?php

header('Content-Type: application/json');

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id_product'];

try {

    $stmt = $pdo->prepare("
        UPDATE product
        SET
            name = :name,
            brand = :brand,
            category = :category,
            price = :price,
            description = :description,
            stock_quantity = :stock_quantity
        WHERE id_product = :id
    ");

    $stmt->execute([
        'name' => $data['name'],
        'brand' => $data['brand'],
        'category' => $data['category'],
        'price' => $data['price'],
        'description' => $data['description'],
        'stock_quantity' => $data['stock_quantity'],
        'id' => $id
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