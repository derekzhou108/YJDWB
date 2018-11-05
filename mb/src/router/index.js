import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/layout'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * 针对children字段说明
 * name:'router-name'            路由名称
 * path:'router-path'            路由路径（基于父组件相对路径）
 * component:'component-name'    组件名称（首字母大写）
 * meta : {
    title: 'title'              对应topBar按钮中文字
    icon: 'back'                对应topBar的icon名称
  }
 **/
const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '',
      component: Layout,
      redirect: '/index',
      children: [
        {name: 'index', path: 'index', component: _import('home/home'), meta: {title: '立即预约', icon: 'logo'}}
      ]
    },
    {
      path: '/news',
      component: Layout,
      redirect: '/news/list',
      children: [
        {
          name: 'list',
          path: 'list',
          component: _import('news/news-list/news-list'),
          meta: {title: '返回官网', icon: 'back'}
        },
        {
          name: 'detail',
          path: 'detail/:id',
          component: _import('news/news-detail/news-detail'),
          meta: {title: '返回官网', icon: 'back'}
        }
      ]
    },
    {
      path: '/video',
      component: Layout,
      redirect: '/video/index',
      children: [
        {name: 'video', path: 'index', component: _import('video/video'), meta: {title: '返回官网'}, icon: 'back'}
      ]
    }
  ]
})

export default router
