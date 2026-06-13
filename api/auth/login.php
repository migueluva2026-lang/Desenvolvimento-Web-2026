<?php
header('Content-Type: application/json');

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("
    SELECT *
    FROM admin
    WHERE username = ?
");

$stmt->execute([$username]);

$admin = $stmt->fetch(PDO::FETCH_ASSOC);


if ($admin && password_verify( $password, $admin['password_hash'])) {
    echo json_encode([
        "success" => true,
        "id_admin" => $admin['id_admin'],
        "username" => $admin['username']
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Usuário ou senha inválidos"
        
    ]);
}