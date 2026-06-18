<?php

header('Content-Type: application/json');

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

try {

    $stmt = $pdo->prepare("
        INSERT INTO product (
            sku,
            name,
            brand,
            description,
            price,
            original_price,
            category,
            stock_quantity,
            featured,
            image_card,
            active
        )
        VALUES (
            :sku,
            :name,
            :brand,
            :description,
            :price,
            :original_price,
            :category,
            :stock_quantity,
            :featured,
            :image_card,
            :active
        )
    ");

    $stmt->execute([
        'sku' => $data['sku'],
        'name' => $data['name'],
        'brand' => $data['brand'],
        'description' => $data['description'],
        'price' => $data['price'],
        'original_price' => $data['original_price'],
        'category' => $data['category'],
        'stock_quantity' => $data['stock_quantity'],
        'featured' => $data['featured'],
        'image_card' => $data['image_card'],
        'active' => $data['active']
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