<?php
header('Content-Type: application/json');

// Ensure this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing password']);
    exit;
}

// Verify password
if ($data['password'] === 'focus') {
    session_start();
    $_SESSION['authenticated'] = true;
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid password']);
} 