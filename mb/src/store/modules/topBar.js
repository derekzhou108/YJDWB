import * as types from '../mutation-types'

// initial data
const state = {
  showAppoint: false
}

const getters = {
  showAppoint: state => state.showAppoint
}

// mutations，同步数据，用于methods中this.$store.commit调用
const mutations = {

  [types.TOGGLE_APPOINT](state, payload) {
    state.showAppoint = payload.status
  }

}

export default {
  state,
  getters,
  mutations
}
