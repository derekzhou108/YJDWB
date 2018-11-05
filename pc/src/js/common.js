/*
 * @Author: Butter
 * @Date: 2018-04-10 10:34:34
 * @Last Modified by: Butter
 * @Last Modified time: 2018-04-28 18:16:03
 */

'use strict'
;(function () {
    //内网开发环境 http://10.10.40.33:8111
    //沙箱环境 http://115.159.189.146:8037

    var baseUrl = 'http://115.159.189.146:8037';
    // var project = '/yw'; // 开发
    var project = ''; // 线上

    window.api = {
        post: function (url, data) {
            var def = $.Deferred()
            $.post(url, data)
                .then(function (res) {
                    if (res.code === 10000) {
                        def.resolve(res)
                    } else {
                        def.reject(res)
                    }
                })
            return def
        },
        get: function (url, data) {
            var def = $.Deferred()
            $.get(url, data)
                .then(function (res) {
                    if (res.code === 10000) {
                        def.resolve(res)
                    } else {
                        def.reject(res)
                    }
                })
            return def
        },
        jsonp: function (url, data) {
            var def = $.Deferred()
            $.ajax({
                url: baseUrl + url,
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'callback',
                data: data
            }).then(function (res) {
                if (res.code === 10000) {
                    def.resolve(res)
                } else {
                    layer.alert(res.msg)
                    def.reject(res)
                }
            });
            return def
        },
        //新闻列表
        getNewsList: function (data) {
            return this.post(`${project}/api/news/list`, data)
        },
        //新闻详情
        newsDetail: function (data) {
            return this.post(`${project}/api/news/detail`, data)
        },
        //新闻轮播图
        getRollNews: function (data) {
            return this.post(`${project}/api/news/roll`, data)
        },
        //新闻栏目
        getNewsType: function (data) {
            return this.post(`${project}/api/news/category`, data)
        },
        //新闻分页列表
        newsListAjax: function (data) {
            return this.post(`${project}/api/news/pagination`, data)
        },
        //游戏情报
        getRoleList: function (data) {
            return this.post(`${project}/api/game/role-list`, data)
        },
        //下载
        getDownload: function (data) {
            return this.post(`${project}/api/download`, data)
        },
        //创建预约
        create: function (data) {
            return this.post(`${project}/api/appointment/create`, data)
        },
        //验证码
        getSmsCode: function (data) {
            return this.post(`${project}/api/appointment/send-sms-code`, data);
        },
        //预约人数
        appointmentInfo: function (data) {
            return this.post(`${project}/api/appointment/info`, data)
        },
        //首页视频
        video: function (data) {
            return this.post(`${project}/api/video/top`, data)
        },
        //登录
        login: function (data) {
            return this.jsonp('/sdk-user/login', data)
        },
        //登录及注册验证码
        sendCode: function (data) {
            return this.jsonp('/sdk-user/send-sms-code', data)
        },
        //注册
        reg: function (data) {
            return this.jsonp('/sdk-user/reg', data)
        },
        //找回密码
        findPwd: function (data) {
            return this.jsonp('/sdk-user/find-pwd', data)
        },
        //修改密码
        changePwd: function (data) {
            return this.jsonp('/sdk-user/change-pwd', data)
        },
        //是否登录
        isLogin: function (data) {
            return this.jsonp('/sdk-user/is-login', data)
        },
        //注销
        logout: function () {
            return this.jsonp('/sdk-user/logout')
        },
    };

    window.util = {
        mobileRegexp: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
        numberSplit: function (str) {
            return String(str).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        },
        setCookie: function (name, value, iDay) {
            if (iDay) {
                var oDate = new Date()
                oDate.setDate(oDate.getDate() + iDay)
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + oDate + ";path= /";
            } else {
                document.cookie = name + "=" + encodeURIComponent(value) + ";path= /";
            }
        },
        delCookie: function (name) {
            var self = this;
            self.set(name, "", -1)
        },
        getCookie: function (name) {
            var arrCookie = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arrCookie != null) {
                return decodeURIComponent(arrCookie[2])
            } else {
                return null
            }
        },
        getQueryString: function (name) {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest[name];
        },
        setStorage: function (key, val) {
            window.localStorage.setItem(key, JSON.stringify(val));
        },
        getStorage: function (key) {
            return $.parseJSON(window.localStorage.getItem(key));
        },
        removeStorage: function (key) {
            window.localStorage.removeItem(key);
        },
        clearStorage: function () {
            window.localStorage.clear();
        },
        reload: function () {
            window.location.reload();
        },
        flashChecker: function () {
            var hasFlash = 0; //是否安装了flash
            var flashVersion = 0; //flash版本
            if (document.all) {
                try {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (swf) {
                        hasFlash = 1;
                        var VSwf = swf.GetVariable("$version");
                        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                    }
                } catch (e) {
                    hasFlash = 0;
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVersion = parseInt(words[i]);
                        }
                    }
                }
            }
            return {f: hasFlash, v: flashVersion};
        }
    };

    // ajax请求状态提示
    var index;
    $(document).ajaxStart(function () {
        index = layer.load()
    });
    $(document).ajaxStop(function () {
        layer.close(index)
    });
    $(document).ajaxError(function () {
        layer.msg('请求错误')
    })

    window.nav = {
        index: 0,
        name: 'nav',
        init: function () {
            this.autoActive()
            this.toggle()
        },
        toggle: function () {
            $('#appointContact').find('a').hover(function () {
                $(this).children('span').toggle()
            })
        },
        autoActive: function () {
            var that = this
            that.index = /list|view/g.test(window.location.href) ? 1 : 0
            $('#commonNav').find('.nav-item').eq(that.index).addClass('active').siblings().removeClass('active')
        }
    }

    nav.init()
})();