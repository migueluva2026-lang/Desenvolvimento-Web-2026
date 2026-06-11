<?php
include 'db.php';

if (isset($_GET['id'])) {
    $stmt = $pdo->prepare('DELETE FROM product WHERE id_product = :id');
    $stmt->execute(['id' => $_GET['id']]);
}

header("Location: index.php");
exit();
