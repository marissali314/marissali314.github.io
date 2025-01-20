<?php
header('Content-Type: application/json');

// Ensure this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Clear session
session_start();
session_destroy();
echo json_encode(['success' => true]); 