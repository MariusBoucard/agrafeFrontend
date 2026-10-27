/** Crédit photo d’un bloc image (auteur, avec repli copyright le temps de la migration). */
export function photoCredit(item) {
  return String(item?.auteur || item?.copyright || '').trim();
}

function isBlobLike(value) {
  return typeof Blob !== 'undefined' && value instanceof Blob;
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

/**
 * Prépare le contenu pour l’API / le disque :
 * - `image` = id du bloc (string), jamais un File / {} / blob URL
 * - retire imagePreview (URL locale éphémère)
 */
export function serializeContenuForSave(contenu) {
  if (!Array.isArray(contenu)) return [];
  return sanitizeContenuCredits(contenu).map((part) => {
    if (!part || typeof part !== 'object') return part;
    if (part.type !== 'image') {
      const rest = { ...part };
      delete rest.image;
      delete rest.imagePreview;
      return rest;
    }
    const id = String(part.id || '').trim();
    const imageId =
      typeof part.image === 'string' && part.image.trim() && !part.image.startsWith('blob:')
        ? part.image.trim()
        : id;
    return {
      id,
      type: 'image',
      text: part.text == null ? '' : String(part.text),
      auteur: String(part.auteur || '').trim(),
      image: imageId,
    };
  });
}

/** URL d’aperçu admin : File/Blob, id string, ou repli sur l’id du bloc. */
export function articleImagePreviewUrl(part, articleId, baseUrl) {
  if (!part) return '';
  const file = part.image;
  if (isBlobLike(file)) {
    try {
      return URL.createObjectURL(file);
    } catch {
      /* fall through */
    }
  }
  const imageId =
    typeof file === 'string' && file.trim() && !file.startsWith('blob:')
      ? file.trim()
      : String(part.id || '').trim();
  if (!imageId || !articleId) return '';
  return `${baseUrl}/api/save/saveArticle/images/${articleId}/${imageId}.png`;
}
