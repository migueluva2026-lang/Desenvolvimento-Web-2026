<?php

require_once '../db.php';

$stmt = $pdo->query("
    SELECT *
    FROM product
    WHERE active = 1
");

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Adicionar images para cada produto
foreach ($products as &$product) {
    $imgStmt = $pdo->prepare("
        SELECT image_path, sort_order
        FROM product_images
        WHERE id_product = ?
        ORDER BY sort_order ASC
    ");
    $imgStmt->execute([$product['id_product']]);
    $product['images'] = $imgStmt->fetchAll(PDO::FETCH_ASSOC);
}

header('Content-Type: application/json');

echo json_encode($products);