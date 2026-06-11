<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $description = $_POST['description'];
    
    $stmt = $pdo->prepare('INSERT INTO product (description) VALUES (:description)');
    $stmt->execute(['description' => $description]);
    
    header("Location: index.php");
    exit();
}
