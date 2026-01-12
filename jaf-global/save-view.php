<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

$viewsFile = 'data/report-views.json';

// this is for create data directory if it doesn't exist
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

// Initialize default view counts if we forget to update the json file
if (!file_exists($viewsFile)) {
    $defaultViews = [
        'report1' => 1200,
        'newsletter-dec2025' => 850,
        'impact-yicc-2025' => 620,
        'report2024' => 2100,
        'newsletter-sep2025' => 940,
        'agriculture-impact' => 580
    ];
    file_put_contents($viewsFile, json_encode($defaultViews));
}

// Handle GET request - retrieve all view counts
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $views = json_decode(file_get_contents($viewsFile), true);
    echo json_encode(['success' => true, 'views' => $views]);
    exit;
}

// Handle POST request - increment view count
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $reportId = $input['reportId'] ?? null;
    
    if (!$reportId) {
        echo json_encode(['success' => false, 'error' => 'No report ID provided']);
        exit;
    }
    
    // Read current views
    $views = json_decode(file_get_contents($viewsFile), true);
    
    // Increment view count
    if (isset($views[$reportId])) {
        $views[$reportId]++;
    } else {
        $views[$reportId] = 1;
    }
    
    // Save updated views
    file_put_contents($viewsFile, json_encode($views));
    
    echo json_encode([
        'success' => true,
        'reportId' => $reportId,
        'views' => $views[$reportId]
    ]);
    exit;
}
?>