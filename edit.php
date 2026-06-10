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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Produto</title>
</head>
<body>
    <h1>Editar Produto</h1>
    <form method="post">
        <label for="description">Descrição:</label>
        <input type="text" id="description" name="description" required value="<?= htmlspecialchars($produto['description']) ?>">
        <button type="submit">Salvar Alterações</button>
    </form>
</body>
</html>