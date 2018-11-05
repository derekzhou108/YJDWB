// 控制视图切换loading
import router from './router'
import store from './store'

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', { isLoading: true })
  // 控制视频页
  if (to.name === 'video') {
    store.commit({ type: 'TOGGLE_ORITENT', show: true })
  } else {
    store.commit({ type: 'TOGGLE_ORITENT', show: false })
  }
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', { isLoading: false })
})
