<?php

header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$number = trim($data['number'] ?? '');
$password = trim($data['password'] ?? '');

// Validação básica :) :) :) :)
$erros = [];
if (!$name) $erros[] = 'Nome obrigatório';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = 'Email inválido';
if (strlen($password) < 6) $erros[] = 'Senha deve ter ao menos 6 caracteres';

if ($erros) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $erros]);
    exit;
}

try {
    // Verifica se email já existe
    $stmt = $pdo->prepare("SELECT id_client FROM client WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Email já cadastrado']);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO client (name, email, password, number, address)
        VALUES (:name, :email, :password, :number, '')
    ");
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'number' => $number,
    ]);

    echo json_encode([
        'success'   => true,
        'id_client' => $pdo->lastInsertId(),
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}