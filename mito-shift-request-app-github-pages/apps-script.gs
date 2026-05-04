const SHEET_NAME = '希望休提出';
const MAX_BLOCKS = 12;
const STAFF = ['shoko', 'rika'];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const error = validatePayload_(payload);
    if (error) return json_({ ok: false, error });

    const sheet = getSheet_();
    const submittedAt = new Date();
    const rows = payload.requests.map((item) => [
      submittedAt,
      payload.submitter,
      payload.staff,
      item.month,
      item.day,
      item.weekday,
      item.block,
      item.originalStaff || '',
    ]);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

    return json_({
      ok: true,
      count: rows.length,
      submittedAt: submittedAt.toISOString(),
    });
  } catch (error) {
    return json_({ ok: false, error: '送信データを保存できませんでした。' });
  }
}

function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).map((row) => ({
    submittedAt: row[0],
    submitter: row[1],
    staff: row[2],
    month: row[3],
    day: row[4],
    weekday: row[5],
    block: row[6],
    originalStaff: row[7],
  }));
  return json_({ ok: true, rows });
}

function validatePayload_(payload) {
  if (!payload) return '送信データが空です。';
  if (!payload.submitter) return '提出者名を入力してください。';
  if (STAFF.indexOf(payload.staff) === -1) return 'スタッフを選択してください。';
  if (!Array.isArray(payload.requests) || payload.requests.length === 0) {
    return '休み希望を1つ以上選択してください。';
  }
  if (payload.requests.length > MAX_BLOCKS) return '休み希望は12ブロックまでです。';
  return '';
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['提出日時', '提出者', 'スタッフ', '月', '日', '曜日', '時間帯', '元担当']);
  }
  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
