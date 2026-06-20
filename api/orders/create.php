<?php

header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

// $data['client'] = { name, email, number, address; $data['items'] = id_product, quantity, unit_price e $data['amount']

try {
    $pdo->beginTransaction();

    // reutiliza se email já existe, senão cria
    $stmt = $pdo->prepare("SELECT id_client FROM client WHERE email = ?");
    $stmt->execute([$data['client']['email']]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $id_client = $existing['id_client'];
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO client (name, email, password, number, address)
            VALUES (:name, :email, :password, :number, :address)
        ");
        $stmt->execute([
            'name'     => $data['client']['name'],
            'email'    => $data['client']['email'],
            'password' => password_hash(bin2hex(random_bytes(8)), PASSWORD_DEFAULT), // senha aleatória já que cliente não tem login
            'number'   => $data['client']['number'],
            'address'  => $data['client']['address'],
        ]);
        $id_client = $pdo->lastInsertId();
    }

    // Order 
    $stmt = $pdo->prepare("
        INSERT INTO orders (location, amount, status, id_client)
        VALUES (:location, :amount, 'pendente', :id_client)
    ");
    $stmt->execute([
        'location'  => $data['client']['address'],
        'amount'    => $data['amount'],
        'id_client' => $id_client,
    ]);
    $id_order = $pdo->lastInsertId();

    // Order items
    $stmt = $pdo->prepare("
        INSERT INTO order_items (id_order, id_product, quantity, unit_price)
        VALUES (:id_order, :id_product, :quantity, :unit_price)
    ");
    foreach ($data['items'] as $item) {
        $stmt->execute([
            'id_order'   => $id_order,
            'id_product' => $item['id_product'],
            'quantity'   => $item['quantity'],
            'unit_price' => $item['unit_price'],
        ]);
    }

    $pdo->commit();

    echo json_encode([
        'success'  => true,
        'id_order' => $id_order,
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}