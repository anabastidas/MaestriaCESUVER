<?php
$data = json_decode(file_get_contents('php://input'), true);
$file = 'data/tickets.json';
$tickets = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$tickets[] = $data;
file_put_contents($file, json_encode($tickets, JSON_PRETTY_PRINT));
?>