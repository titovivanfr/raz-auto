<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides (format JSON)"]);
    exit;
}
$requiredFields = ['nom', 'prenom', 'tel', 'type', 'message'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (empty($data[$field]) || !is_string($data[$field])) {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    http_response_code(422);
    echo json_encode([
        "error" => "Champs manquants ou invalides",
        "champs" => $missingFields
    ]);
    exit;
}

$nom = htmlspecialchars($data['nom']);
$prenom = htmlspecialchars($data['prenom']);
$tel = htmlspecialchars($data['tel']);
$type = htmlspecialchars($data['type']);
$messageContent = htmlspecialchars($data['message']);

$to = "example@mail.com";
$subject = "Nouveau message du site";
$message = "Nom: $nom\nPrénom: $prenom\nTéléphone: $tel\nType: $type\nMessage: $messageContent";
$headers = "From: noreply@votresite.com";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "ok"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de l'envoi de l'email"]);
}