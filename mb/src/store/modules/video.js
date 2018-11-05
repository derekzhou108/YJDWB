import api from '../../api'
import * as types from '../mutation-types'

// initial data
const state = {
  videoUrl: '',
  videoShow: false
}

const getters = {
  videoUrl: state => state.videoUrl,
  videoShow: state => state.videoShow
}

// mutations，同步数据，用于methods中this.$store.commit调用
const mutations = {

  [types.GET_VIDEO](state, payload) {
    state.videoUrl = payload.videoUrl
  },

  [types.TOGGLE_ORITENT](state, payload) {
    state.videoShow = payload.show
  }
}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 获取视频
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  getVideoUrl({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.video()
        .then(
          res => {
            const temp = res.data
            commit({ type: types.GET_VIDEO, videoUrl: temp.data.video_url })
            resolve(res)
          }
        )
        .catch(
          err => {
            console.log('fail', err)
            reject(err)
          }
        )
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
