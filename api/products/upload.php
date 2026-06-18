<?php
// Recebe: SKU, ID, CARD, GALLERY(images), talvez algo mude aqui

header('Content-Type: application/json');
require_once '../db.php';

// Valida campos obrigatórios 
$sku = trim($_POST['sku']  ?? '');
$id  = intval($_POST['id_product'] ?? 0);

if (!$sku || !$id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'sku e id_product são obrigatórios']);
    exit;
}

$folder  = strtolower($sku);
$destDir = __DIR__ . '/../../assets/img/' . $folder . '/'; //sobe dois níveis até a raiz do projeto

if (!is_dir($destDir)) {
    mkdir($destDir, 0755, true);
}

$allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']; // o padrão seria jpeg mas tanto faz sla
$errors  = [];

// Card
if (!empty($_FILES['card']['tmp_name'])) {
    $tmp  = $_FILES['card']['tmp_name'];
    $mime = mime_content_type($tmp);

    if (!in_array($mime, $allowed)) {
        $errors[] = 'Tipo inválido para a imagem do card';
    } else {
        $dest     = $destDir . 'image-card.webp';
        $cardPath = "assets/img/{$folder}/image-card.webp";

        if (move_uploaded_file($tmp, $dest)) {
            $stmt = $pdo->prepare("UPDATE product SET image_card = ? WHERE id_product = ?");
            $stmt->execute([$cardPath, $id]);
        } else {
            $errors[] = 'Falha ao salvar image-card';
        }
    }
}

// Galeria
if (!empty($_FILES['gallery']['tmp_name'])) {
    $files = $_FILES['gallery'];
    $count = count($files['tmp_name']);

    // Remove entradas antigas antes de reinserir
    $pdo->prepare("DELETE FROM product_images WHERE id_product = ?")->execute([$id]);

    for ($i = 0; $i < $count; $i++) {
        if ($files['error'][$i] !== UPLOAD_ERR_OK) continue;

        $tmp = $files['tmp_name'][$i];
        $mime = mime_content_type($tmp);

        
        if (!in_array($mime, $allowed)) {
            $errors[] = "Tipo inválido: arquivo " . ($i + 1);
            continue;
        }


        $order = $i + 1;
        $filename = "image-{$order}.webp";
        $dest = $destDir . $filename;
        $imgPath = "assets/img/{$folder}/{$filename}";



        if (move_uploaded_file($tmp, $dest)) {
            $stmt = $pdo->prepare("
                INSERT INTO product_images (id_product, image_path, sort_order)
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$id, $imgPath, $order]);
        } else {
            $errors[] = "ERRO UPLOAD.PHP ao salvar image-{$order}";
        }
    }
}

echo json_encode([
    'success' => empty($errors),
    'errors'  => $errors,
]);