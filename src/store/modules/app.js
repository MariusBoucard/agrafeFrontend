 const   state = {
      showNavigationLinks: true, // Default value
    }
    const mutations =  {
      toggleNavigationLinks(state,newValue) {
        state.showNavigationLinks = newValue;
      },
    }
    const actions = {
      toggleNavigationLinks({ commit },newValue) {
        commit('toggleNavigationLinks',newValue);
      },
    }

    const getters = {
      showNavigationLinks: state => state.showNavigationLinks,
    }

    export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions,
      };
  
  