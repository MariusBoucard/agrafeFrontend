/** Réseaux sociaux affichables sur le portfolio. */
export const SOCIAL_FIELDS = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/…' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/…' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/…' },
  { key: 'x', label: 'X / Twitter', placeholder: 'https://x.com/…' },
  { key: 'website', label: 'Site web', placeholder: 'https://…' },
];

export function emptySocials() {
  return Object.fromEntries(SOCIAL_FIELDS.map((f) => [f.key, '']));
}

export function socialsFromUser(user) {
  const base = emptySocials();
  const raw = user?.socials || {};
  for (const f of SOCIAL_FIELDS) {
    base[f.key] = raw[f.key] || '';
  }
  return base;
}

/** Liste des liens non vides pour l’affichage public. */
export function socialLinksList(socials) {
  if (!socials || typeof socials !== 'object') return [];
  return SOCIAL_FIELDS
    .filter((f) => socials[f.key])
    .map((f) => ({ key: f.key, label: f.label, url: socials[f.key] }));
}
