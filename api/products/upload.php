<?php

header('Content-Type: application/json');
require_once '../db.php';

$sku = trim($_POST['sku']  ?? '');
$id  = intval($_POST['id_product'] ?? 0);

if (!$sku || !$id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'sku e id_product são obrigatórios']);
    exit;
}

$folder  = strtolower($sku);
$destDir = __DIR__ . '/../../assets/img/' . $folder . '/';

if (!is_dir($destDir)) {
    mkdir($destDir, 0755, true);
}

$allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
$errors  = [];

// Card 
if (!empty($_FILES['card']['tmp_name'])) {
    $tmp  = $_FILES['card']['tmp_name'];
    $mime = mime_content_type($tmp);

    if (!in_array($mime, $allowed)) {
        $errors[] = 'Tipo inválido para o card';
    } else {
        $ext      = pathinfo($_FILES['card']['name'], PATHINFO_EXTENSION) ?: 'webp';
        $filename = "image-card.{$ext}";
        $dest     = $destDir . $filename;
        $cardPath = "assets/img/{$folder}/{$filename}";

        if (move_uploaded_file($tmp, $dest)) {
            $pdo->prepare("UPDATE product SET image_card = ? WHERE id_product = ?")
                ->execute([$cardPath, $id]);
        } else {
            $errors[] = 'Falha ao salvar image-card';
        }
    }
}

// Galeria
if (!empty($_FILES['gallery']['tmp_name'])) {
    $files = $_FILES['gallery'];
    $count = count($files['tmp_name']);

    // Descobre o maior sort_order já existente para este produto
    $maxStmt = $pdo->prepare("SELECT COALESCE(MAX(sort_order), 0) FROM product_images WHERE id_product = ?");
    $maxStmt->execute([$id]);
    $nextOrder = (int)$maxStmt->fetchColumn() + 1;

    for ($i = 0; $i < $count; $i++) {
        if ($files['error'][$i] !== UPLOAD_ERR_OK) continue;

        $tmp  = $files['tmp_name'][$i];
        $mime = mime_content_type($tmp);

        if (!in_array($mime, $allowed)) {
            $errors[] = "Tipo inválido: arquivo " . ($i + 1);
            continue;
        }

        $ext = pathinfo($files['name'][$i], PATHINFO_EXTENSION) ?: 'webp';
        $filename = "image-{$nextOrder}.{$ext}";
        $dest = $destDir . $filename;
        $imgPath = "assets/img/{$folder}/{$filename}";

        if (move_uploaded_file($tmp, $dest)) {
            $pdo->prepare("INSERT INTO product_images (id_product, image_path, sort_order) VALUES (?, ?, ?)")
                ->execute([$id, $imgPath, $nextOrder]);
            $nextOrder++;
        } else {
            $errors[] = "Falha ao salvar image-{$nextOrder}";
        }
    }
}

echo json_encode(['success' => empty($errors), 'errors' => $errors]);