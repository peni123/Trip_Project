<?php
require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost; dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);


//naprimer
$sth = $pdo->prepare('UPDATE trip-site SET author = :author WHERE
		qoute = :qoute');
$sth->execute([':author' => "new-author", ':qoute'=>'new-qoute']);