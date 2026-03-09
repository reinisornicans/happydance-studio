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
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

function createEmail(to: string, subject: string, body: string): string {
  const from = 'liva@happydance.lv';
  const lines = [
    `From: Happy Dance Studio <${from}>`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    body,
  ];
  const raw = lines.join('\r\n');
  return Buffer.from(raw).toString('base64url');
}

export async function sendAutoReply(recipientEmail: string, recipientName: string) {
  try {
    const gmail = await getUncachableGmailClient();

    const subject = 'Paldies par Jūsu ziņu! | Happy Dance Studio';
    const body = `
<div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #3d3d3d;">
  <h2 style="font-family: Georgia, 'Playfair Display', serif; color: #2d2d2d; font-size: 24px; margin-bottom: 24px;">
    Happy Dance<span style="color: #C4956A">.</span>
  </h2>
  
  <p style="font-size: 16px; line-height: 1.6;">
    Sveiki, ${recipientName}!
  </p>
  
  <p style="font-size: 16px; line-height: 1.6;">
    Paldies, ka sazinājāties ar mums! Jūsu ziņa ir saņemta, un mēs ar Jums sazināsimies jau pavisam drīz.
  </p>
  
  <p style="font-size: 16px; line-height: 1.6;">
    Tiekamies uz deju grīdas!
  </p>
  
  <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
    Sirsnībā,<br/>
    <strong>Līva</strong><br/>
    <span style="color: #7a7a7a; font-size: 14px;">Happy Dance Studio</span>
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e0db; margin: 32px 0 16px;" />
  <p style="font-size: 12px; color: #999; line-height: 1.5;">
    Deja, kas stiprina un iedvesmo.
  </p>
</div>`;

    const raw = createEmail(recipientEmail, subject, body);

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    console.log(`Auto-reply sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
  }
}

export async function sendNotificationToOwner(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const gmail = await getUncachableGmailClient();

    const subject = `Jauns pieteikums: ${data.subject} — ${data.name}`;
    const body = `
<div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #3d3d3d;">
  <h2 style="font-family: Georgia, 'Playfair Display', serif; color: #2d2d2d; font-size: 20px; margin-bottom: 24px;">
    Jauns pieteikums no happydance.lv
  </h2>
  
  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 100px;">Sadaļa:</td>
      <td style="padding: 8px 12px;">${data.subject}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; color: #666;">Vārds:</td>
      <td style="padding: 8px 12px;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; color: #666;">E-pasts:</td>
      <td style="padding: 8px 12px;"><a href="mailto:${data.email}" style="color: #C4956A;">${data.email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; color: #666; vertical-align: top;">Ziņa:</td>
      <td style="padding: 8px 12px; white-space: pre-wrap;">${data.message}</td>
    </tr>
  </table>
</div>`;

    const raw = createEmail('liva@happydance.lv', subject, body);

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    console.log(`Notification sent to owner about inquiry from ${data.name}`);
  } catch (error) {
    console.error('Failed to send owner notification:', error);
  }
}
