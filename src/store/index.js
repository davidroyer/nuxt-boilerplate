export const state = () => ({
  isDev: null
})

export const mutations = {
  setDev (state, payload) {
    state.isDev = payload
  }
}

export const actions = {
  async nuxtServerInit ({ commit, state }, {isDev, app}) {
    commit('setDev', isDev)

    // if (isDev) {
    //     await app.$wp.setupCustomRoutes();
    //   }
    
    //   if (process.static) {
    //     await app.$wp.setupCustomRoutes();
    //   }
  }
}

export const getters = {

}


