

const SITE_URL = 'https://lagrafejournal.com';
const CONTACT = 'lagrafejournal@protonmail.com';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function textToParagraphs(text = '') {
  return String(text)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 1em;line-height:1.6;color:#222;font-size:16px;">${escapeHtml(p)}</p>`)
    .join('');
}

function ctaButton(url, label) {
  if (!url || !label) return '';
  const safeUrl = escapeHtml(url);
  const safeLabel = escapeHtml(label);
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
      <tr>
        <td style="background:#111111;border-radius:2px;">
          <a href="${safeUrl}" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-family:Georgia,Times,serif;font-size:15px;">
            ${safeLabel}
          </a>
        </td>
      </tr>
    </table>`;
}

function wrapLayout({ preheader = '', title = '', bodyHtml = '', extraHtml = '' }) {
  const safeTitle = escapeHtml(title);
  const safePreheader = escapeHtml(preheader);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safePreheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e2e2;">
          <tr>
            <td style="padding:28px 28px 12px;border-bottom:3px solid #111111;">
              <p style="margin:0;font-family:Georgia,Times,serif;font-size:22px;letter-spacing:0.02em;color:#111111;">L'Agrafe</p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;text-transform:uppercase;letter-spacing:0.08em;">Journal étudiant · Rennes 2</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-family:Arial,Helvetica,sans-serif;">
              ${title ? `<h1 style="margin:0 0 16px;font-family:Georgia,Times,serif;font-size:26px;line-height:1.25;color:#111111;font-weight:normal;">${safeTitle}</h1>` : ''}
              ${bodyHtml}
              ${extraHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 28px;border-top:1px solid #eeeeee;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#888888;">
              <p style="margin:0 0 6px;">Vous recevez ce message car vous êtes abonné·e à la newsletter de L'Agrafe.</p>
              <p style="margin:0;">
                <a href="${SITE_URL}" style="color:#111111;">lagrafejournal.com</a>
                ·
                <a href="mailto:${CONTACT}" style="color:#111111;">${CONTACT}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const EMAIL_TEMPLATES = [
  {
    id: 'annonce',
    label: 'Annonce simple',
    description: 'Un titre, un texte, un bouton optionnel. Pour une info courte.',
    fields: [
      { key: 'subject', label: 'Sujet du mail', type: 'text', required: true, placeholder: 'Une nouvelle de L\'Agrafe' },
      { key: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Titre de l\'annonce' },
      { key: 'body', label: 'Texte', type: 'textarea', required: true, placeholder: 'Votre message…\nUne ligne vide = nouveau paragraphe.' },
      { key: 'ctaLabel', label: 'Texte du bouton (optionnel)', type: 'text', required: false, placeholder: 'En savoir plus' },
      { key: 'ctaUrl', label: 'Lien du bouton (optionnel)', type: 'url', required: false, placeholder: 'https://lagrafejournal.com/…' },
    ],
    defaults: {
      subject: '',
      title: '',
      body: '',
      ctaLabel: 'Lire sur le site',
      ctaUrl: SITE_URL,
    },
    render(fields) {
      return wrapLayout({
        preheader: fields.body?.slice(0, 90) || fields.title,
        title: fields.title,
        bodyHtml: textToParagraphs(fields.body),
        extraHtml: ctaButton(fields.ctaUrl, fields.ctaLabel),
      });
    },
  },
  {
    id: 'parution',
    label: 'Nouvelle parution',
    description: 'Annoncer un article ou un numéro : accroche + lien de lecture.',
    fields: [
      { key: 'subject', label: 'Sujet du mail', type: 'text', required: true, placeholder: 'Nouveau sur L\'Agrafe : …' },
      { key: 'title', label: 'Titre de l\'article / du numéro', type: 'text', required: true, placeholder: 'Titre' },
      { key: 'kicker', label: 'Rubrique / accroche courte', type: 'text', required: false, placeholder: 'Antithèse · Société' },
      { key: 'body', label: 'Chapeau / présentation', type: 'textarea', required: true, placeholder: 'Quelques lignes pour donner envie de lire…' },
      { key: 'ctaUrl', label: 'Lien vers l\'article', type: 'url', required: true, placeholder: 'https://lagrafejournal.com/article/…' },
      { key: 'ctaLabel', label: 'Texte du bouton', type: 'text', required: true, placeholder: 'Lire l\'article' },
    ],
    defaults: {
      subject: '',
      title: '',
      kicker: '',
      body: '',
      ctaUrl: '',
      ctaLabel: 'Lire l\'article',
    },
    render(fields) {
      const kicker = fields.kicker
        ? `<p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#666666;">${escapeHtml(fields.kicker)}</p>`
        : '';
      return wrapLayout({
        preheader: fields.kicker || fields.body?.slice(0, 90) || fields.title,
        title: fields.title,
        bodyHtml: kicker + textToParagraphs(fields.body),
        extraHtml: ctaButton(fields.ctaUrl, fields.ctaLabel || 'Lire l\'article'),
      });
    },
  },
  {
    id: 'evenement',
    label: 'Événement / appel',
    description: 'Réunion, permanence, appel à contribution : date, lieu, action.',
    fields: [
      { key: 'subject', label: 'Sujet du mail', type: 'text', required: true, placeholder: 'RDV L\'Agrafe — …' },
      { key: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Appel à contribution' },
      { key: 'when', label: 'Quand', type: 'text', required: false, placeholder: 'Jeudi 12 mars · 18h' },
      { key: 'where', label: 'Où', type: 'text', required: false, placeholder: 'Campus Villejean / en ligne' },
      { key: 'body', label: 'Détails', type: 'textarea', required: true, placeholder: 'Décrivez l\'événement ou l\'appel…' },
      { key: 'ctaLabel', label: 'Texte du bouton (optionnel)', type: 'text', required: false, placeholder: 'Participer / Répondre' },
      { key: 'ctaUrl', label: 'Lien du bouton (optionnel)', type: 'url', required: false, placeholder: 'https://… ou mailto:…' },
    ],
    defaults: {
      subject: '',
      title: '',
      when: '',
      where: '',
      body: '',
      ctaLabel: '',
      ctaUrl: '',
    },
    render(fields) {
      const metaRows = [];
      if (fields.when) {
        metaRows.push(`<tr><td style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444;"><strong style="color:#111;">Quand</strong> — ${escapeHtml(fields.when)}</td></tr>`);
      }
      if (fields.where) {
        metaRows.push(`<tr><td style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444;"><strong style="color:#111;">Où</strong> — ${escapeHtml(fields.where)}</td></tr>`);
      }
      const metaHtml = metaRows.length
        ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 18px;padding:12px 14px;background:#f7f7f7;border-left:3px solid #111111;">${metaRows.join('')}</table>`
        : '';
      return wrapLayout({
        preheader: [fields.when, fields.title].filter(Boolean).join(' · '),
        title: fields.title,
        bodyHtml: metaHtml + textToParagraphs(fields.body),
        extraHtml: ctaButton(fields.ctaUrl, fields.ctaLabel),
      });
    },
  },
];

export function getTemplateById(id) {
  return EMAIL_TEMPLATES.find((t) => t.id === id) || null;
}

export function renderTemplate(id, fields) {
  const tpl = getTemplateById(id);
  if (!tpl) return '';
  return tpl.render(fields || {});
}
