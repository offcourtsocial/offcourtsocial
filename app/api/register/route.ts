import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { naam, email, leeftijd, telefoon } = await req.json();

    if (!naam || !email || !leeftijd || !telefoon) {
      return NextResponse.json({ error: 'Alle velden zijn verplicht.' }, { status: 400 });
    }

    // Sla aanmelding op in Google Sheets
    await fetch('https://script.google.com/macros/s/AKfycbx2_k8BPJjfKxdhe9TnySIhq1cUwAvfTiol09UcQg59hGEclVDV_zZevWRXefw7I_3eeA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ naam, email, leeftijd, telefoon }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Er ging iets mis.' }, { status: 500 });
  }
}

function emailTemplate({
  naam,
  leeftijd,
  telefoon,
}: {
  naam: string;
  leeftijd: string;
  telefoon: string;
}) {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <tr><td style="padding-bottom:36px;border-bottom:1px solid rgba(242,239,234,0.08);">
          <p style="margin:0;color:rgba(242,239,234,0.4);font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Offcourt Social</p>
        </td></tr>

        <tr><td style="padding:40px 0 32px;">
          <p style="margin:0 0 6px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Aanmelding bevestigd</p>
          <h1 style="margin:0 0 20px;color:#F2EFEA;font-size:38px;font-weight:400;letter-spacing:0.02em;text-transform:uppercase;line-height:1.05;">Tot dan,<br />${naam}.</h1>
          <p style="margin:0;color:rgba(242,239,234,0.6);font-size:14px;line-height:1.75;">
            Je aanmelding voor Offcourt Social Padel & Vibes is ontvangen.<br />We zien je graag op 5 juli in Capelle a/d IJssel.
          </p>
        </td></tr>

        <tr><td style="padding-bottom:12px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(242,239,234,0.08);">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 18px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Evenement</p>
              ${row('Datum', 'Sunday, 5 July 2026')}
              ${row('Tijd', '17:00 — 21:00')}
              ${row('Locatie', 'Rive Club Padel, Capelle a/d IJssel')}
              ${row('Adres', 'Rivium 3e straat 7, 2909 LH')}
              ${row('Deelname', 'Gratis', true)}
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-bottom:36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(242,239,234,0.08);">
            <tr><td style="padding:24px 28px;">
              <p style="margin:0 0 18px;color:#6F7D5C;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;">Jouw gegevens</p>
              ${row('Naam', naam)}
              ${row('Leeftijd', `${leeftijd} jaar`)}
              ${row('Telefoon', telefoon, true)}
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
</html>`;
}

function row(label: string, value: string, last = false) {
  const border = last ? '' : 'border-bottom:1px solid rgba(242,239,234,0.06);';
  return `<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:9px 0;${border}">
        <span style="color:rgba(242,239,234,0.38);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;">${label}</span>
      </td>
      <td style="padding:9px 0;${border}text-align:right;">
        <span style="color:#F2EFEA;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">${value}</span>
      </td>
    </tr>
  </table>`;
}
