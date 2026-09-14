/** Crédit photo d’un bloc image (auteur, avec repli copyright le temps de la migration). */
export function photoCredit(item) {
  return String(item?.auteur || item?.copyright || '').trim();
}

/** Recopie copyright → auteur si auteur vide, puis drop copyright. */
export function sanitizeImagePart(part) {
  if (!part || typeof part !== 'object' || part.type !== 'image') return part;
  const next = { ...part };
  if (!String(next.auteur || '').trim() && next.copyright) {
    next.auteur = String(next.copyright).trim();
  }
  delete next.copyright;
  return next;
}

export function sanitizeContenuCredits(contenu) {
  if (!Array.isArray(contenu)) return contenu;
  return contenu.map(sanitizeImagePart);
}
