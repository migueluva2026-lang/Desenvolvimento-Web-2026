<?php

header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$password = trim($data['password'] ?? '');

// Detecta o tipo pelo campo enviado: { username, password } tenta admin e { email, password } tenta client
// ---- Admin -------------------------------------------------------
if (isset($data['username'])) {
    $username = trim($data['username']);

    $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password_hash'])) {
        echo json_encode([
            'success'  => true,
            'role'     => 'admin',
            'id_admin' => $admin['id_admin'],
            'username' => $admin['username'],
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Usuário ou senha inválidos']);
    }
    exit;
}

// ---- Client -----------------------------------------------------------------
if (isset($data['email'])) {
    $email = trim($data['email']);

    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$email]);
    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($client && password_verify($password, $client['password'])) {
        echo json_encode([
            'success' => true,
            'role' => 'client',
            'id_client' => $client['id_client'],
            'name' => $client['name'],
            'email' => $client['email'],
            'number' => $client['number'],
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Email ou senha inválidos']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Dados insuficientes']);