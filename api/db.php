<?php
$host = 'localhost';
$dbname = 'MundoInfo';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password); // PDO: PHP Data Objects, é uma extensão do PHP para acessar bancos de dados

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	echo "Sucesso";
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>