<?php
// ── Configuratie ────────────────────────────────────────────────────────────
// Vul hier jouw eigen e-mailadres in (dit is het adres dat aanmeldingen ontvangt)
define('ADMIN_EMAIL',  'info@offcourtsocial.com');
// Vul hier het afzenderadres in (moet een e-mailadres zijn dat hoort bij jouw Strato hosting)
define('FROM_EMAIL',   'info@offcourtsocial.com');
define('FROM_NAME',    'Offcourt Social');

// ── CORS & headers ───────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Input ────────────────────────────────────────────────────────────────────
$data     = json_decode(file_get_contents('php://input'), true);
$naam     = htmlspecialchars(trim($data['naam']     ?? ''), ENT_QUOTES, 'UTF-8');
$email    = filter_var(trim($data['email']    ?? ''), FILTER_SANITIZE_EMAIL);
$leeftijd = intval($data['leeftijd'] ?? 0);
$telefoon = htmlspecialchars(trim($data['telefoon'] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$naam || !filter_var($email, FILTER_VALIDATE_EMAIL) || $leeftijd < 16 || $leeftijd > 99 || !$telefoon) {
    http_response_code(400);
    echo json_encode(['error' => 'Alle velden zijn verplicht.']);
    exit;
}

// ── Aanmelding opslaan (CSV backup) ─────────────────────────────────────────
$csvFile = __DIR__ . '/aanmeldingen.csv';
$isNew   = !file_exists($csvFile);
$fp      = fopen($csvFile, 'a');
if ($fp) {
    if ($isNew) fputcsv($fp, ['Datum', 'Naam', 'E-mail', 'Leeftijd', 'Telefoon']);
    fputcsv($fp, [date('Y-m-d H:i:s'), $naam, $email, $leeftijd, $telefoon]);
    fclose($fp);
}

// ── E-mail naar aanmelder ────────────────────────────────────────────────────
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: " . FROM_EMAIL . "\r\n";

$sent = mail($email, 'Aanmelding bevestigd — Offcourt Social Launch', emailTemplate($naam, $leeftijd, $telefoon), $headers);

// ── Notificatie naar admin ───────────────────────────────────────────────────
$adminSubject = "Nieuwe aanmelding: {$naam}";
$adminBody    = "<p>Nieuwe aanmelding ontvangen:</p>
<ul>
  <li><strong>Naam:</strong> {$naam}</li>
  <li><strong>E-mail:</strong> {$email}</li>
  <li><strong>Leeftijd:</strong> {$leeftijd}</li>
  <li><strong>Telefoon:</strong> {$telefoon}</li>
  <li><strong>Datum:</strong> " . date('d-m-Y H:i') . "</li>
</ul>";
mail(ADMIN_EMAIL, $adminSubject, $adminBody, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Er ging iets mis met het versturen van de e-mail.']);
}

// ── E-mail template ──────────────────────────────────────────────────────────
function emailTemplate($naam, $leeftijd, $telefoon) {
    return '<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <tr><td style="padding-bottom:36px;border-bottom:1px solid rgba(242,239,234,0.08);">
          <p style="margin:0;color:rgba(242,239,234,0.4);font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Offcourt Social</p>
        </td></tr>

        <tr><td style="padding:40px 0 32px;">
          <p style="margin:0 0 6px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Aanmelding bevestigd</p>
          <h1 style="margin:0 0 20px;color:#F2EFEA;font-size:38px;font-weight:400;letter-spacing:0.02em;text-transform:uppercase;line-height:1.05;">Tot dan,<br>' . $naam . '.</h1>
          <p style="margin:0;color:rgba(242,239,234,0.6);font-size:14px;line-height:1.75;">
            Je aanmelding voor Offcourt Social Launch is ontvangen.<br>We zien je graag op 5 juli in Capelle a/d IJssel.
          </p>
        </td></tr>

        <tr><td style="padding-bottom:12px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(242,239,234,0.08);">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 18px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Evenement</p>
              ' . row('Datum',   'Sunday, 5 July 2026') . '
              ' . row('Tijd',    '14:00 — 20:00') . '
              ' . row('Locatie', 'Rive Club Padel, Capelle a/d IJssel') . '
              ' . row('Adres',   'Rivium 3e straat 7, 2909 LH') . '
              ' . row('Toegang', '€5', true) . '
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-bottom:36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(242,239,234,0.08);">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 18px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Jouw gegevens</p>
              ' . row('Naam',     $naam) . '
              ' . row('Leeftijd', $leeftijd . ' jaar') . '
              ' . row('Telefoon', $telefoon, true) . '
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-bottom:36px;">
          <p style="margin:0;color:rgba(242,239,234,0.4);font-size:12px;line-height:1.75;">
            Vragen? Bereik ons via Instagram:
            <a href="https://instagram.com/offcourt.social" style="color:#6F7D5C;text-decoration:none;">@offcourt.social</a>
          </p>
        </td></tr>

        <tr><td style="border-top:1px solid rgba(242,239,234,0.08);padding-top:28px;text-align:center;">
          <p style="margin:0;color:rgba(242,239,234,0.2);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;">
            Offcourt Social · Rotterdam · More than a moment
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>';
}

function row($label, $value, $last = false) {
    $border = $last ? '' : 'border-bottom:1px solid rgba(242,239,234,0.06);';
    return '<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:9px 0;' . $border . '">
        <span style="color:rgba(242,239,234,0.38);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;">' . $label . '</span>
      </td>
      <td style="padding:9px 0;' . $border . 'text-align:right;">
        <span style="color:#F2EFEA;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">' . $value . '</span>
      </td>
    </tr>
  </table>';
}
