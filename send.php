<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Получаем IP пользователя
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
    else return $_SERVER['REMOTE_ADDR'];
}

$ip = getUserIP();
$message = htmlspecialchars($_POST['message'] ?? '');
$latitude = $_POST['latitude'] ?? 'неизвестно';
$longitude = $_POST['longitude'] ?? 'неизвестно';

$time = date("Y-m-d H:i:s");

// Сохраняем сообщение с координатами в файл
$fullMessage = "[$time] Latitude: $latitude | Longitude: $longitude\nСообщение: $message\n\n";
file_put_contents("messages.txt", $fullMessage, FILE_APPEND);

echo "OK";
?>
