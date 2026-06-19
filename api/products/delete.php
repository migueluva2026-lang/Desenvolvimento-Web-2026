<?php
header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id   = intval($data['id_product'] ?? 0);

try {
    $stmt = $pdo->prepare("SELECT sku FROM product WHERE id_product = ?"); // Busca o SKU
    $stmt->execute([$id]);
    $produto = $stmt->fetch(PDO::FETCH_ASSOC);

    $pdo->prepare("DELETE FROM product WHERE id_product = ?")->execute([$id]); // Deleta do banco

    if ($produto) {
        $folder = __DIR__ . '/../../assets/img/' . strtolower($produto['sku']) . '/';
        if (is_dir($folder)) {
            array_map('unlink', glob($folder . '*'));  // remove todos os arquivos
            rmdir($folder); // pasta vazia
        }
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}