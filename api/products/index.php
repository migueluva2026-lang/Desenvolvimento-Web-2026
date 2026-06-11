<?php
include 'db.php';

$stmt = $pdo->query('SELECT id_product, description FROM product');
$produtos = $stmt->fetchAll();
