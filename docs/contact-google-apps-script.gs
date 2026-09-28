// Paste into the Google Sheet: Extensions > Apps Script.
// Then: Project Settings > Script properties > add CONTACT_SECRET (same value as .env),
// and Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
// Run setupSheets once from the editor to create the tabs and add checkboxes to existing rows.

const SHEETS = { inbox: "Messages", replied: "Replied", test: "Test" };
const HEADERS = ["Date", "Name", "Email", "Subject", "Message", "env", "replied"];
const REPLIED_HEADERS = HEADERS.concat(["replied on"]);
const ENV_COL = HEADERS.indexOf("env") + 1;
const REPLIED_COL = HEADERS.indexOf("replied") + 1;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("CONTACT_SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorized" });

    const isTest = Boolean(data.env) && data.env !== "production";
    addToTop(getSheet(isTest ? SHEETS.test : SHEETS.inbox), [
      new Date(),
      safe(data.name),
      safe(data.email),
      safe(data.subject),
      safe(data.message),
      safe(data.env),
      false,
    ]);

    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: data.email,
      subject:
        (isTest ? "[" + data.env + "] " : "") +
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

// Ticking "replied" moves the row to Replied; unticking it there moves it back.
function onEdit(e) {
  const range = e.range;
  if (range.getColumn() !== REPLIED_COL || range.getRow() < 2 || range.getNumRows() !== 1) return;

  const sheet = range.getSheet();
  const name = sheet.getName();
  const checked = range.getValue() === true;
  const row = sheet.getRange(range.getRow(), 1, 1, HEADERS.length).getValues()[0];

  let target;
  if (checked && (name === SHEETS.inbox || name === SHEETS.test)) {
    target = getSheet(SHEETS.replied, REPLIED_HEADERS);
    row.push(new Date());
  } else if (!checked && name === SHEETS.replied) {
    const isTest = row[ENV_COL - 1] && row[ENV_COL - 1] !== "production";
    target = getSheet(isTest ? SHEETS.test : SHEETS.inbox);
  } else {
    return;
  }

  addToTop(target, row);
  sheet.deleteRow(range.getRow());
}

// Run once by hand: creates the tabs and adds checkboxes to rows already in them.
function setupSheets() {
  [SHEETS.inbox, SHEETS.test].forEach((name) => getSheet(name));
  getSheet(SHEETS.replied, REPLIED_HEADERS);

  Object.values(SHEETS).forEach((name) => {
    const sheet = getSheet(name);
    const rows = sheet.getLastRow() - 1;
    if (rows < 1) return;
    const cells = sheet.getRange(2, REPLIED_COL, rows, 1);
    const values = cells.getValues().map(([v]) => [v === true || v === "TRUE"]);
    cells.insertCheckboxes().setValues(values);
  });
}

function getSheet(name, headers) {
  headers = headers || HEADERS;
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(name) || book.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// newest first, right under the header
function addToTop(sheet, row) {
  sheet.insertRowAfter(1);
  const range = sheet.getRange(2, 1, 1, row.length);
  range.clearFormat().setFontWeight("normal");
  sheet.getRange(2, 1).setNumberFormat("yyyy-mm-dd hh:mm");
  if (row.length > HEADERS.length) sheet.getRange(2, row.length).setNumberFormat("yyyy-mm-dd hh:mm");
  sheet.getRange(2, REPLIED_COL).insertCheckboxes();
  range.setValues([row]);
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
