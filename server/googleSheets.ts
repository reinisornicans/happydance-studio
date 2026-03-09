import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X-Replit-Token not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

const SHEET_TABS = ['Pieteikumi', 'Sievietēm', 'Pāriem', 'Kāzu deja', 'Citi'];
const HEADER_ROW = ['Datums', 'Vārds', 'E-pasts', 'Ziņojums'];
const ALL_HEADER_ROW = ['Datums', 'Sadaļa', 'Vārds', 'E-pasts', 'Ziņojums'];

let spreadsheetId: string | null = null;
const createdTabs = new Set<string>();

function getSheetName(subject: string): string {
  if (subject === 'Sievietēm') return 'Sievietēm';
  if (subject === 'Pāriem') return 'Pāriem';
  if (subject === 'Kāzu deja') return 'Kāzu deja';
  return 'Citi';
}

async function getOrCreateSpreadsheet(): Promise<string> {
  if (spreadsheetId) return spreadsheetId;

  const sheets = await getUncachableGoogleSheetClient();

  const existing = process.env.GOOGLE_SHEET_ID;
  if (existing) {
    spreadsheetId = existing;
    return existing;
  }

  const oauth2Client = new google.auth.OAuth2();
  const accessToken = await getAccessToken();
  oauth2Client.setCredentials({ access_token: accessToken });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileList = await drive.files.list({
    q: "name='Happy Dance Studio - Pieteikumi' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
    spaces: 'drive',
    fields: 'files(id, name)',
  });

  if (fileList.data.files && fileList.data.files.length > 0) {
    spreadsheetId = fileList.data.files[0].id!;
    await ensureAllTabs();
    return spreadsheetId;
  }

  const sheetDefs = SHEET_TABS.map((title, index) => {
    const header = title === 'Pieteikumi' ? ALL_HEADER_ROW : HEADER_ROW;
    return {
      properties: { title, index },
      data: [{
        startRow: 0,
        startColumn: 0,
        rowData: [{
          values: header.map(h => ({ userEnteredValue: { stringValue: h } }))
        }]
      }]
    };
  });

  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Happy Dance Studio - Pieteikumi',
      },
      sheets: sheetDefs
    }
  });

  spreadsheetId = response.data.spreadsheetId!;
  SHEET_TABS.forEach(t => createdTabs.add(t));
  console.log(`Created Google Sheet: ${spreadsheetId}`);
  return spreadsheetId;
}

async function ensureAllTabs() {
  if (!spreadsheetId) return;
  if (createdTabs.size === SHEET_TABS.length) return;

  const sheets = await getUncachableGoogleSheetClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existingNames = new Set<string>();
  for (const s of meta.data.sheets || []) {
    if (s.properties?.title) existingNames.add(s.properties.title);
  }

  const missing = SHEET_TABS.filter(t => !existingNames.has(t));

  if (missing.length > 0) {
    for (const title of missing) {
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests: [{ addSheet: { properties: { title } } }] }
        });
        const header = title === 'Pieteikumi' ? ALL_HEADER_ROW : HEADER_ROW;
        const range = title === 'Pieteikumi' ? `'${title}'!A1:E1` : `'${title}'!A1:D1`;
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [header] }
        });
      } catch (err: any) {
        if (!err?.message?.includes('already exists')) throw err;
      }
    }
  }

  SHEET_TABS.forEach(t => createdTabs.add(t));
}

export async function appendInquiryToSheet(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const sheetId = await getOrCreateSpreadsheet();
    const sheets = await getUncachableGoogleSheetClient();
    const sheetName = getSheetName(data.subject);

    const now = new Date().toLocaleString('lv-LV', { timeZone: 'Europe/Riga' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `'Pieteikumi'!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[now, sheetName, data.name, data.email, data.message]]
      }
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[now, data.name, data.email, data.message]]
      }
    });

    console.log(`Inquiry from ${data.name} added to "Pieteikumi" and "${sheetName}"`);
  } catch (error) {
    console.error('Failed to append to Google Sheet:', error);
  }
}
