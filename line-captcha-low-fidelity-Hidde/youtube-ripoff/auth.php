<?php
header('Content-Type: application/json');
$accountsFile = 'accounts.json';
$action = $_POST['action'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

function loadAccounts($file) {
    if (!file_exists($file)) return [];
    $json = file_get_contents($file);
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}
function saveAccounts($file, $accounts) {
    file_put_contents($file, json_encode($accounts, JSON_PRETTY_PRINT));
}

$accounts = loadAccounts($accountsFile);
$response = ["success" => false, "message" => "Onbekende actie."];

if ($action === 'register') {
    if (isset($accounts[$username])) {
        $response = ["success" => false, "message" => "Gebruikersnaam bestaat al."];
    } else {
        $accounts[$username] = password_hash($password, PASSWORD_DEFAULT);
        saveAccounts($accountsFile, $accounts);
        $response = ["success" => true, "message" => "Account aangemaakt."];
    }
} elseif ($action === 'login') {
    if (!isset($accounts[$username])) {
        $response = ["success" => false, "message" => "Gebruikersnaam bestaat niet."];
    } elseif (!password_verify($password, $accounts[$username])) {
        $response = ["success" => false, "message" => "Wachtwoord onjuist."];
    } else {
        $response = ["success" => true, "message" => "Succesvol ingelogd."];
    }
}
echo json_encode($response);
