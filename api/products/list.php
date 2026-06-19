<?php

header('Content-Type: application/json');
require_once '../db.php';

$stmt = $pdo->query("
    SELECT
        p.*,
        pi.id_image,
        pi.image_path,
        pi.sort_order
    FROM product p
    LEFT JOIN product_images pi
        ON pi.id_product = p.id_product
    WHERE p.active = 1
    ORDER BY p.id_product, pi.sort_order
");

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$products = [];

foreach ($rows as $row) {
    $id = $row['id_product'];

    if (!isset($products[$id])) {
        $products[$id] = [
            'id_product' => $row['id_product'],
            'sku' => $row['sku'],
            'name' => $row['name'],
            'brand' => $row['brand'],
            'description' => $row['description'],
            'price' => $row['price'],
            'original_price' => $row['original_price'],
            'category' => $row['category'],
            'stock_quantity' => $row['stock_quantity'],
            'featured' => $row['featured'],
            'image_card' => $row['image_card'],
            'active' => $row['active'],
            'images' => [],
        ];
    }

    if ($row['id_image']) {
        $products[$id]['images'][] = [
            'id_image' => $row['id_image'], // precisa disso pro delete-image.php
            'image_path' => $row['image_path'],
            'sort_order' => $row['sort_order'],
        ];
    }
}

echo json_encode(array_values($products));