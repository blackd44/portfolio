// Paste into the Google Sheet: Extensions > Apps Script.
// Then: Project Settings > Script properties > add CONTACT_SECRET (same value as .env.local),
// and Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.

const SHEET_NAME = "Messages";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("CONTACT_SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorized" });

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(["Date", "Name", "Email", "Subject", "Message", "Env"]);
    sheet.appendRow([new Date(), safe(data.name), safe(data.email), safe(data.subject), safe(data.message), safe(data.env)]);

    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: data.email,
      subject:
        (data.env && data.env !== "production" ? "[" + data.env + "] " : "") +
        "Portfolio: " + (data.subject || "message from " + data.name),
      body:
        data.name + " <" + data.email + ">\n" +
        (data.subject ? "Subject: " + data.subject + "\n" : "") +
        "\n" + data.message,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// stop the sheet treating text like "=HYPERLINK(...)" as a formula
function safe(value) {
  const s = String(value || "");
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
