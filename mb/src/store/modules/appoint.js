import api from '../../api'
import * as types from '../mutation-types'

// initial data
const state = {
  loginLoading: false,
  appointmentInfo: ''
}

const getters = {
  loginLoading: state => state.loginLoading,
  appointmentInfo: state => state.appointmentInfo
}

// mutations，同步数据，用于methods中this.$store.commit调用
const mutations = {

  [types.TOGGLE_LOAD](state, payload) {
    state.loginLoading = payload.status
  },

  [types.GET_NUMBER](state, payload) {
    state.appointmentInfo = payload.number
  }
}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 注册预约
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  create({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit({ type: types.TOGGLE_LOAD, status: true })
      api.create(payload.data)
        .then(
          res => {
            commit({ type: types.TOGGLE_LOAD, status: false })
            resolve(res)
          }
        )
        .catch(
          err => {
            commit({ type: types.TOGGLE_LOAD, status: false })
            console.log('fail', err)
            reject(err)
          }
        )
    })
  },
  /**
   * 获取验证码
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  getSmsCode({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getSmsCode(payload.data)
        .then(
          res => {
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
  },
  /**
   * 获取预约人数
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  getAppointmentInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.appointmentInfo()
        .then(
          res => {
            commit({ type: types.GET_NUMBER, number: res.data.data })
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
