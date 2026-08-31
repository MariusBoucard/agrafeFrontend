/** Rôles L'Agrafe — hiérarchie croissante */
export const ROLES = {
  CONTRIBUTOR: 'contributor',
  EDITOR: 'editor',
  ADMIN: 'admin',
};

export const ROLE_LEVEL = {
  contributor: 1,
  editor: 2,
  admin: 3,
};

export const ROLE_LABELS = {
  contributor: 'Contributeur',
  editor: 'Éditeur',
  admin: 'Admin',
};

export const ROLE_DESCRIPTIONS = {
  contributor: 'Rédige et modifie articles / news.',
  editor: 'Gère le contenu éditorial (archives, dossiers, rubriques…).',
  admin: 'Accès complet : utilisateurs, stats, newsletter, fichiers.',
};

/** Normalise les anciens types JSON (`user`, `admin`) vers les rôles actuels */
export function normalizeRole(roleOrType) {
  const r = String(roleOrType || '').toLowerCase();
  if (r === 'admin') return ROLES.ADMIN;
  if (r === 'editor') return ROLES.EDITOR;
  if (r === 'contributor' || r === 'user') return ROLES.CONTRIBUTOR;
  return ROLES.CONTRIBUTOR;
}

export function roleLevel(role) {
  return ROLE_LEVEL[normalizeRole(role)] || 1;
}

export function hasMinRole(userRole, minRole) {
  return roleLevel(userRole) >= roleLevel(minRole);
}

/**
 * Permissions par section admin.
 * `minRole` = niveau minimum requis.
 */
export const ADMIN_SECTIONS = {
  dashboard: { minRole: 'admin', label: 'Dashboard' },
  register: { minRole: 'admin', label: 'Utilisateurs' },
  article: { minRole: 'contributor', label: 'Articles' },
  createArticle: { minRole: 'contributor', label: 'Créer un article' },
  modifyArticle: { minRole: 'contributor', label: 'Modifier un article' },
  news: { minRole: 'contributor', label: 'News' },
  createNews: { minRole: 'contributor', label: 'Créer une news' },
  archive: { minRole: 'editor', label: 'Archives' },
  createArchive: { minRole: 'editor', label: 'Créer une archive' },
  focal: { minRole: 'editor', label: 'Focal' },
  createFocal: { minRole: 'editor', label: 'Créer une focale' },
  newsletter: { minRole: 'editor', label: 'Abonnés newsletter' },
  newsletterCampaign: { minRole: 'admin', label: 'Envoi newsletter' },
  rubrique: { minRole: 'editor', label: 'Rubriques' },
  propalArticle: { minRole: 'editor', label: 'Propositions' },
  dossiers: { minRole: 'editor', label: 'Dossiers' },
  pages: { minRole: 'editor', label: 'Pages' },
  fichiers: { minRole: 'admin', label: 'Fichiers' },
};

export function canAccessSection(userRole, sectionKey) {
  // Sous-vues liées à une section parente
  const aliases = {
    createArticle: 'article',
    modifyArticle: 'article',
    createNews: 'news',
    modifyNews: 'news',
    createArchive: 'archive',
    createFocal: 'focal',
  };
  const key = aliases[sectionKey] || sectionKey;
  const section = ADMIN_SECTIONS[key];
  if (!section) return false;
  return hasMinRole(userRole, section.minRole);
}

/** Première section accessible selon le rôle (landing admin) */
export function defaultAdminSection(userRole) {
  if (hasMinRole(userRole, 'admin')) return 'dashboard';
  if (hasMinRole(userRole, 'contributor')) return 'article';
  return 'article';
}
