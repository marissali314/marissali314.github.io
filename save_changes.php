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
if (!isset($data['file']) || !isset($data['content'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Ensure we're only modifying allowed files
$allowedFiles = ['health.html'];
if (!in_array($data['file'], $allowedFiles)) {
    http_response_code(403);
    echo json_encode(['error' => 'File modification not allowed']);
    exit;
}

// Verify password (should match the client-side password)
session_start();
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// Save the file
try {
    file_put_contents($data['file'], $data['content']);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
} 