import { normalizeRole } from '@/utils/permissions';

function decodeJwtPayload(token) {
  try {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    const part = raw.split('.')[1];
    if (!part) return null;
    const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Restaure le rôle depuis sessionStorage ou le JWT */
export function restoreAuthFromSession() {
  const token = sessionStorage.getItem('token');
  if (!token) return null;
  const storedRole = sessionStorage.getItem('role');
  const payload = decodeJwtPayload(token);
  const role = normalizeRole(storedRole || payload?.role || 'contributor');
  sessionStorage.setItem('role', role);
  return { role, token };
}

const state = {
  isAuthenticated: false,
  user: null,
};

const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

const getters = {
  user(state) {
    return state.user;
  },
  userRole(state) {
    if (state.user?.role || state.user?.type) {
      return normalizeRole(state.user.role || state.user.type);
    }
    const restored = restoreAuthFromSession();
    return restored?.role || 'contributor';
  },
  isAuthenticated(state) {
    return state.isAuthenticated || Boolean(sessionStorage.getItem('token'));
  },
};

const actions = {
  setUser({ commit }, user) {
    const normalized = user
      ? { ...user, role: normalizeRole(user.role || user.type) }
      : null;
    if (normalized?.role) {
      sessionStorage.setItem('role', normalized.role);
    }
    commit('SET_USER', normalized);
    commit('SET_AUTHENTICATED', Boolean(normalized));
  },
  setConnection({ commit }, con) {
    commit('SET_AUTHENTICATED', con);
  },
  clearUser({ commit }) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    commit('SET_USER', null);
    commit('SET_AUTHENTICATED', false);
  },
  hydrateFromSession({ commit, state }) {
    if (state.user?.role) return;
    const restored = restoreAuthFromSession();
    if (!restored) return;
    commit('SET_USER', { role: restored.role });
    commit('SET_AUTHENTICATED', true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
