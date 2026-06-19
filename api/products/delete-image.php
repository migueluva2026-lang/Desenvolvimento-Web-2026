<?php
// Deleta uma imagem específica do banco e do "servidor" (pasta local)

header('Content-Type: application/json');
require_once '../db.php';

$data     = json_decode(file_get_contents("php://input"), true);
$id_image = intval($data['id_image'] ?? 0);

if (!$id_image) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'id_image obrigatório']);
    exit;
}

try {
    // Busca o path antes de deletar
    $stmt = $pdo->prepare("SELECT image_path FROM product_images WHERE id_image = ?");
    $stmt->execute([$id_image]);
    $img = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$img) {
        echo json_encode(['success' => false, 'message' => 'Imagem não encontrada']);
        exit;
    }

    // Remove do banco
    $pdo->prepare("DELETE FROM product_images WHERE id_image = ?")->execute([$id_image]);

    // Remove o arquivo físico
    $file = __DIR__ . '/../../' . $img['image_path'];
    if (file_exists($file)) {
        unlink($file);
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}