import axios from 'axios'

// create an axios instance
const service = axios.create({

  // baseURL: process.env.BASE_API, // config目录api的base_url

  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}, // `headers` 是即将被发送的自定义请求头
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    let ret = []
    for (let name in data) {
      ret.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }
    return ret.join('&')
  }]
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    alert(error.message)
    return Promise.reject(error)
  })

export default service
