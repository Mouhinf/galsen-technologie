import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';
import { COMPANY_EMAIL } from '@/lib/constants';

/**
 * Read SMTP configuration from the database settings.
 * Returns null if SMTP is not configured.
 */
async function getTransporter() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ['email_smtp_host', 'email_smtp_port', 'email_smtp_user', 'email_smtp_pass', 'email_from'],
      },
    },
  });

  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const host = map.email_smtp_host;
  if (!host) return null;

  const portStr = map.email_smtp_port || '587';
  const port = /^\d+$/.test(portStr) ? parseInt(portStr, 10) : 587;
  const user = map.email_smtp_user || '';
  const pass = map.email_smtp_pass || '';
  const from = map.email_from || COMPANY_EMAIL;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  return { transporter, from };
}

/**
 * Send a welcome email to a new newsletter subscriber.
 * Gracefully fails if SMTP is not configured (logs a warning).
 */
export async function sendWelcomeEmail(email: string): Promise<void> {
  try {
    const config = await getTransporter();
    if (!config) {
      console.warn(
        '[email] SMTP non configuré. ' +
          'Configurez email_smtp_host depuis les paramètres admin pour envoyer des emails.'
      );
      return;
    }

    const { transporter, from } = config;

    await transporter.sendMail({
      from: `"Galsen Technologie" <${from}>`,
      to: email,
      subject: 'Bienvenue dans la newsletter Galsen Technologie ! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; padding: 30px 0; }
            .logo { font-size: 28px; font-weight: bold; color: #22C55E; }
            .content { background: #1a1a1a; border-radius: 16px; padding: 40px; color: #e5e5e5; }
            h1 { color: #ffffff; font-size: 24px; margin-bottom: 20px; }
            p { line-height: 1.6; color: #a3a3a3; margin-bottom: 16px; }
            .highlight { color: #22C55E; font-weight: 600; }
            .features { margin: 30px 0; padding: 0; list-style: none; }
            .features li { padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #e5e5e5; }
            .features li::before { content: "✓ "; color: #22C55E; font-weight: bold; }
            .footer { text-align: center; padding: 30px 0; color: #666; font-size: 12px; }
            .footer a { color: #22C55E; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Galsen Technologie</div>
            </div>
            <div class="content">
              <h1>Merci de vous être abonné ! 🙌</h1>
              <p>Bonjour,</p>
              <p>
                Un grand merci d'avoir rejoint la newsletter de 
                <span class="highlight">Galsen Technologie</span> ! 
                Vous recevrez désormais nos actualités exclusives sur :
              </p>
              <ul class="features">
                <li>Les dernières innovations en <span class="highlight">IA</span> et cybersécurité</li>
                <li>Nos projets web & mobile les plus récents</li>
                <li>Des conseils tech pour propulser votre entreprise</li>
                <li>Nos événements et formations à Dakar</li>
              </ul>
              <p>
                Nous sommes ravis de vous compter parmi notre communauté 
                de passionnés de technologie au Sénégal et dans le monde.
              </p>
              <p style="margin-top: 30px;">
                À très bientôt,<br>
                <strong style="color: #22C55E;">L'équipe Galsen Technologie</strong>
              </p>
            </div>
            <div class="footer">
              <p>
                Galsen Technologie — Dakar, Sénégal<br>
                <a href="https://galsen.lingueredigital.com">galsen.lingueredigital.com</a>
              </p>
              <p style="margin-top: 10px;">
                Vous recevez cet email car vous vous êtes abonné à notre newsletter.<br>
                Si vous souhaitez vous désabonner, répondez simplement à cet email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`[email] Bienvenue envoyé à ${email}`);
  } catch (error) {
    console.error(`[email] Erreur d'envoi à ${email}:`, error);
  }
}
