<?php

$user = empty($_POST['name']) ? '': $_POST['name'];
$pass = empty($_POST['password']) ? '': $_POST['password'];
$email = empty($_POST['email']) ? '': $_POST['email'];
$people = [[$user, $pass, $email]];
$key = isset($_POST['key']) ? $_POST['key'] : null;
if (empty($key)) {
	$_SESSION['list'][] = $people;
} else {
	$_SESSION['list'][$key] = $people;
} 


require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertPersonSql = 'INSERT INTO dblogin (name, pass, imail) VALUES (?, ?, ?)';  

$statement = $pdo->prepare($insertPersonSql);

$ids = [];
foreach ($people as $item) {

   $statement->execute($item);
   $ids[] = $pdo->lastInsertId();
}

if ($ids[0] == "" && $ids[1] == "" && $ids[2] == "") {
	return;
} else {
	echo json_encode(['success' => true]);
}