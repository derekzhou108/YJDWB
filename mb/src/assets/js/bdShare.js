export const bdShare = function () {
  document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)

  var imgUrl = location.protocol + location.hostname
  if (location.port) {
    imgUrl += ':' + location.port
  }
  imgUrl += '/lf/pc/images/icon.png'

  window._bd_share_config = {
    // 通用设置
    common: {
      bdText: '《妖精的尾巴》',
      bdDesc: '《妖精的尾巴》纵横第一玄幻小说正版手游 预约开启抢先进入蛮荒',
      bdUrl: location.href,
      bdPic: imgUrl
    },
    // 分享按钮设置
    share: [],
    // 浮窗分享设置
    slide: false,
    // 图片分享设置
    image: false,
    // 划词分享设置
    selectShare: false
  }
}
