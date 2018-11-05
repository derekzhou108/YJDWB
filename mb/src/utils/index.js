/**
 * 获取表单结构数据中指定参数的值
 */
export function getQueryString(str, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = str.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}

/**
 * 表单数据转JSON对象
 */
export function param2Obj(str) {
  if (!str) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * 公用函数
 */
export const util = {
  mobileRegexp: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
  numberSplit: function (str) {
    return String(str).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  },
  setCookie: function (name, value, iDay) {
    if (iDay) {
      var oDate = new Date()
      oDate.setDate(oDate.getDate() + iDay)
      document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path= /'
    } else {
      document.cookie = name + '=' + encodeURIComponent(value) + ';path= /'
    }
  },
  delCookie: function (name) {
    var self = this
    self.set(name, '', -1)
  },
  getCookie: function (name) {
    var arrCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arrCookie != null) {
      return decodeURIComponent(arrCookie[2])
    } else {
      return null
    }
  },
  getQueryString: function (name) {
    var url = window.location.search // 获取url中'?'符后的字串
    var theRequest = {}
    if (url.indexOf('?') !== -1) {
      var str = url.substr(1)
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
      }
    }
    return theRequest[name]
  },
  setStorage: function (key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  getStorage: function (key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  removeStorage: function (key) {
    window.localStorage.removeItem(key)
  },
  clearStorage: function () {
    window.localStorage.clear()
  },
  reload: function () {
    window.location.reload()
  },
  flashChecker: function () {
    var hasFlash = 0 // 是否安装了flash
    var flashVersion = 0 // flash版本
    if (document.all) {
      try {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
        if (swf) {
          hasFlash = 1
          var VSwf = swf.GetVariable('$version')
          flashVersion = parseInt(VSwf.split(' ')[1].split(',')[0])
        }
      } catch (e) {
        hasFlash = 0
      }
    } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        var tempSwf = navigator.plugins['Shockwave Flash']
        if (tempSwf) {
          hasFlash = 1
          var words = swf.description.split(' ')
          for (var i = 0; i < words.length; ++i) {
            if (isNaN(parseInt(words[i]))) continue
            flashVersion = parseInt(words[i])
          }
        }
      }
    }
    return { f: hasFlash, v: flashVersion }
  }
}
