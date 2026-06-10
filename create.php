<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $description = $_POST['description'];
    
    $stmt = $pdo->prepare('INSERT INTO product (description) VALUES (:description)');
    $stmt->execute(['description' => $description]);
    
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Produto</title>
</head>
<body>
    <h1>Adicionar Produto</h1>
    <form method="post">
        <label for="description">Descrição:</label>
        <input type="text" id="description" name="description" required>
        <button type="submit">Salvar</button>
    </form>
</body>
</html>