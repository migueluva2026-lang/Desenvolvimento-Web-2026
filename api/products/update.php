<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id   = $data['id_product']; // FK

try {
    $stmt = $pdo->prepare("
        UPDATE product SET
            name = :name,
            brand = :brand,
            category = :category,
            price = :price,
            original_price = :original_price,
            description = :description,
            stock_quantity = :stock_quantity,
            featured = :featured,
            active = :active
        WHERE id_product = :id
    ");

    $stmt->execute([
        'name' => $data['name'],
        'brand' => $data['brand'],
        'category' => $data['category'],
        'price' => $data['price'],
        'original_price' => $data['original_price'] ?: null,
        'description' => $data['description'],
        'stock_quantity' => $data['stock_quantity'],
        'featured' => $data['featured'],
        'active' => $data['active'],
        'id' => $id,
    ]);

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}