import api from '../../api'
import * as types from '../mutation-types'

// initial data
const state = {
  indexNews: [],
  pageList: [],
  newsType: [],
  newsDetail: {},
  roleList: [],
  detailLoading: false
}

const getters = {
  indexType: (state, getters, rootState) => {
    return state.indexNews.map(({ id, category }) => {
      return { id, category }
    })
  },

  // 首页限定最长5条
  indexList: (state, getters, rootState) => {
    return state.indexNews.map(({ news }) => {
      return { news: news.slice(0, 5) }
    })
  },

  pageType: (state, getters) => {
    return state.newsType.map((item, index) => {
      item.firstLoading = true
      return item
    })
  },

  pageList: state => state.pageList,

  newsDetail: state => state.newsDetail,

  roleList: state => state.roleList,

  detailLoading: state => state.detailLoading
}

// mutations，同步数据，用于methods中this.$store.commit调用
const mutations = {

  [types.GET_INDEX_NEWS](state, payload) {
    state.indexNews = payload.indexNews
  },

  [types.DETAIL_LOADING](state, payload) {
    state.detailLoading = payload.loading
  },

  [types.GET_LIST](state, payload) {
    const response = payload.pageNews
    state.pageList.forEach((item, index) => {
      if (+item.cid === response.cid) {
        if (item.news.length > 0) {
          response.news.forEach(v => {
            item.news.push(v)
          })
        } else {
          item.news = response.news
          state.newsType[index].firstLoading = false
        }
        item.pageCount = response.pageCount
        item.pageIndex = response.pageIndex
      }
    })
  },

  [types.GET_TYPE](state, payload) {
    state.newsType = payload.newsType
    state.newsType.forEach((v, k) => {
      state.pageList.splice(k, 0, {
        idx: 0, // 当前页
        cid: v.id, // 栏目ID
        news: [],
        pageCount: 0,
        pageIndex: 0
      })
    })
  },

  [types.GET_DETAIL](state, payload) {
    state.newsDetail = payload.newsDetail
  },

  [types.GET_ROLE_LIST](state, payload) {
    state.roleList = payload.roleList
  }

}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 获取首页新闻
   * new Promise((resolve, reject) => {})
   */
  getIndexNews({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.getNewsList()
        .then(
          res => {
            commit({ type: types.GET_INDEX_NEWS, indexNews: res.data.data })
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
   * 获取新闻分页
   * new Promise((resolve, reject) => {})
   */
  getPageNews({ commit, state }, payload) {
    const temp = Object.assign({}, {page_size: 4}, payload.data)
    return new Promise((resolve, reject) => {
      api.newsListAjax(temp)
        .then(
          res => {
            commit({ type: types.GET_LIST, pageNews: res.data.data })
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
   * 获取新闻种类
   * new Promise((resolve, reject) => {})
   */
  getNewsType({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.getNewsType()
        .then(
          res => {
            commit({ type: types.GET_TYPE, newsType: res.data.data })
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
   * 获取新闻详情
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  getNewsDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit({ type: types.DETAIL_LOADING, loading: true })
      api.newsDetail(payload.data)
        .then(
          res => {
            commit({ type: types.GET_DETAIL, newsDetail: res.data.data })
            commit({ type: types.DETAIL_LOADING, loading: false })
            resolve(res)
          }
        )
        .catch(
          err => {
            console.log('fail', err)
            commit({ type: types.DETAIL_LOADING, loading: false })
            reject(err)
          }
        )
    })
  },
  /**
   * 获取角色情报
   * new Promise((resolve, reject) => {})
   */
  getRoleInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.getRoleList()
        .then(
          res => {
            commit({ type: types.GET_ROLE_LIST, roleList: res.data.data })
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
