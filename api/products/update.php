<?php
include 'db.php';

$id = $_GET['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $descricao = $_POST['description'];
    $stmt = $pdo->prepare('UPDATE product SET description = :description WHERE id_product = :id');
    $stmt->execute(['description' => $descricao, 'id' => $id]);

    header("Location: index.php");
    exit();
} else {
    $stmt = $pdo->prepare('SELECT id_product, description FROM product WHERE id_product = :id');
    $stmt->execute(['id' => $id]);
    $produto = $stmt->fetch();
}
