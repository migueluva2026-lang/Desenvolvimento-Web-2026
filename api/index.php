<?php
include 'db.php';

$stmt = $pdo->query('SELECT id_product, description FROM product');
$produtos = $stmt->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Produtos</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Lista de Produtos</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Ações</th>
        </tr>
        <?php foreach ($produtos as $produto): ?>
        <tr>
            <td><?= htmlspecialchars($produto['id_product']) ?></td>
            <td><?= htmlspecialchars($produto['description']) ?></td>
            <td>
                <a href="update.php?id=<?= $produto['id_product'] ?>">Editar</a>
                <a href="delete.php?id=<?= $produto['id_product'] ?>" onclick="return confirm('Tem certeza que deseja excluir?')">Excluir</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    <a href="create.php">Adicionar novo produto</a>
</body>
</html>