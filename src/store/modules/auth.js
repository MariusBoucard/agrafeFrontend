
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
    user(state){
      return state.user
    },
    isAuthenticated(state){
      return state.isAuthenticated
    }
  }
  
  const actions = {
    setUser({ commit }, user) {
      commit('SET_USER', user);
      commit('SET_AUTHENTICATED', Boolean(user));
    },
    setConnection({ commit }, con) {
      commit('SET_AUTHENTICATED', con);
    },
    clearUser({ commit }) {
      commit('SET_USER', null);
      commit('SET_AUTHENTICATED', false);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };