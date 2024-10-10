import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    isAuthenticatedAdmin: false,
    user: null
  },

  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setAdminAuthentication(state, status) {
      state.isAuthenticatedAdmin = status
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    // login({ commit }, user) {
    //   const hardcodedUser = { username: 'user', password: '123456' }

    //   if (
    //     user.username === hardcodedUser.username &&
    //     user.password === hardcodedUser.password
    //   ) {
    //     commit('setAuthentication', true)
    //     commit('setUser', user)
    //     return true
    //   } else {
    //     alert('login unsuccess')
    //     return false
    //   }
    // },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setAdminAuthentication', false)
      commit('setUser', null)
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated, // Getter for authentication status
    isAuthenticatedAdmin: (state) => state.isAuthenticatedAdmin
  }
})
