import request from '@/utils/request'

const project = process.env.NODE_ENV === 'production' ? '' : '/yw'

export default {
  // 新闻列表
  getNewsList: (data) => {
    return request.post(`${project}/api/news/list`, data)
  },
  // 新闻详情
  newsDetail: (data) => {
    return request.post(`${project}/api/news/detail`, data)
  },
  // 新闻轮播图
  getRollNews: (data) => {
    return request.post(`${project}/api/news/roll`, data)
  },
  // 新闻栏目
  getNewsType: (data) => {
    return request.post(`${project}/api/news/category`, data)
  },
  // 新闻分页列表
  newsListAjax: (data) => {
    return request.post(`${project}/api/news/pagination`, data)
  },
  // 游戏情报
  getRoleList: (data) => {
    return request.post(`${project}/api/game/role-list`, data)
  },
  // 下载
  getDownload: (data) => {
    return request.post(`${project}/api/download`, data)
  },
  // 创建预约
  create: (data) => {
    return request.post(`${project}/api/appointment/create`, data)
  },
  // 验证码
  getSmsCode: (data) => {
    return request.post(`${project}/api/appointment/send-sms-code`, data)
  },
  // 预约人数
  appointmentInfo: (data) => {
    return request.post(`${project}/api/appointment/info`, data)
  },
  // 首页视频
  video: (data) => {
    return request.post(`${project}/api/video/top`, data)
  }
}
