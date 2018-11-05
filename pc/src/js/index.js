/*
 * @Author: Butter
 * @Date: 2018-04-09 18:27:12
 * @Last Modified by: Butter
 * @Last Modified time: 2018-04-26 15:08:30
 */

'use strict'
var index = {
    notAllow: true,
    time: 60,
    appLabel: -1,
    videoUrl: '',
    timeTask: null,
    init: function () {
        var that = this
        that.autoBind()
        api.appointmentInfo()
            .then(function (res) {
                // console.log(res)
                var number = util.numberSplit(res.data)
                $('#appointNumber').html(number)
            })

        api.getNewsList()
            .then(function (res) {
                // console.log(res)
                $('#tabHtml').html(template('tabTem', res.data))
                that.tab()
            })

        api.getRollNews()
            .then(function (res) {
                // console.log(res)
                $('#slideBox').html(template('slideTem', res.data))
                that.slide()
            })

        api.getRoleList()
            .then(function (res) {
                // console.log(res)
                $('#accordionBox').html(template('accorTem', res.data))
                that.accordion()
            })

        api.video()
            .then(function (res) {
                // console.log(res)
                that.videoUrl = res.data.video_url
            })
    },
    autoBind() {
        var that = this
        // 视频
        $('#videoBtn').on('click', function () {
            that.openVideo()
        })
        // 预约福利
        // $('#fuliBox').fadeIn()
        $('#fuliBtn').on('click', function () {
            $('#fuliBox').fadeIn()
            return false
        })
        // 展示预约福利中每项对应的详情
        $('#fuliBox').find('.item').hover(function () {
            if ($(this).hasClass('active')) {
                return false
            }
            $(this).children('.item-tips').toggle()
        })

        // 关闭弹框
        $('.popup').on('click', '.close', function () {
            var num = $(this).data('num')
            if (num) {
                layer.close(num)
            } else {
                $(this).parent().parent('.popup').fadeOut()
            }
        })
        // 打开预约框
        $('#appointBtn').on('click', function () {
            layer.open({
                type: 1,
                title: false, //不显示标题
                closeBtn: 0, //不显示关闭按钮
                shade: [0.67, '#000'], // 背景遮罩
                content: $('#appointBox'), //捕获的元素
                success: function (ele, ind) {
                    ele.find('.close').data('num', ind)
                },
                yes: function () {


                }
            })
        })
        // 系统选择
        $('#selectSystem').on('click', 'label', function () {
            $('#submit').removeClass('shadow')
            that.notAllow = false
            that.appLabel = $(this).data('value')
            $(this).addClass('active').siblings().removeClass('active')
        })
        // 获取验证码
        $('#sendCode').on('click', function () {
            if (!that.jiaoyan()) return false

            var ele = this,
                mobile = $.trim($('#phone').val())

            api.getSmsCode({'mobile': mobile})
                .then(function (res) {
                    layer.msg('验证码已下发至您的手机，请注意查收');
                    that.countDown(ele)
                }, function (err) {
                    layer.msg(err.msg);
                })

        })
        // 预约请求
        $('#submit').on('click', function () {
            if (that.notAllow) return false
            if (!that.jiaoyan()) return false
            var mobile = $.trim($('#phone').val()),
                code = $.trim($('#code').val())

            if (!code) {
                layer.alert('请输入验证码')
                return false
            }

            var params = {
                app_label: that.appLabel,
                mobile: mobile,
                code: code
            }
            api.create(params)
                .then(
                    function (res) {
                        // console.log(res)
                        layer.msg(res.msg)
                        // 关闭弹框
                        var num = $('#appointBox').find('.close').data('num')
                        layer.close(num)
                        $('#phone').val('');
                        $('#code').val('');
                        if (that.timeTask) {
                            clearInterval(that.timeTask);
                            $('#sendCode').val('获取验证码').removeAttr("disabled");
                            that.time = 60
                        }
                    },
                    function (err) {
                        layer.msg(err.msg)
                    }
                )
        })
    },
    countDown: function (ele) {
        var that = this,
            time = that.time

        ele.value = that.time + 's'
        ele.disabled = true
        that.timeTask = setInterval(function () {
            if (that.time === 0) {
                clearInterval(that.timeTask)
                ele.value = '点击重新发送'
                ele.disabled = false
                that.time = time
            } else {
                that.time--
                ele.value = '已发送' + that.time + 's'
            }
        }, 1000)
    },
    jiaoyan: function () {
        var phone = $.trim($('#phone').val())
        if (this.appLabel === -1) {
            layer.alert('请先选择手机类型')
            return false
        }
        if (!phone) {
            layer.alert('手机号不能为空')
            return false
        }
        if (!util.mobileRegexp.test(phone)) {
            layer.alert('手机号格式有误')
            return false
        }
        return true
    },
    openVideo: function () {
        var that = this
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true,  //点击遮罩关闭
            area: ['645px', '645px'], //宽高
            skin: 'video-dialog',
            content: '<div id="videoContainer"></div>',
            anim: '-1',
            success: function (ele) {
                var player = new TcPlayer('videoContainer', {
                    "m3u8": that.videoUrl, //请替换成实际可用的播放地址
                    //"m3u8": '/dist/video/alipay.mp4', //请替换成实际可用的播放地址
                    "autoplay": true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                    //"coverpic" : this.img,
                    "width": '645',//视频的显示宽度，请尽量使用视频分辨率宽度
                    "height": '645',//视频的显示高度，请尽量使用视频分辨率高度
                    "wording": {
                        5: "您的Flash插件已过期，无法播放视频，请升级Flash插件",
                    }
                })
            }
        })
    },
    slide: function () {
        $('#slideBox').slide({
            mainCell: '.slide-render',
            prevCell: '.prev',
            nextCell: '.next',
            trigger: 'click',
            effect: 'fold',
            interTime: 5000,
            delayTime: 500,
            autoPlay: true
        })
    },
    tab: function () {
        $('#tabTitle').on('mouseenter', '.tab-name', function () {
            var $this = $(this)
            if ($this.hasClass('active')) return false
            var index = $this.index()
            $this.addClass('active').siblings().removeClass('active')
            $('#tabBox').find('ul').hide().eq(index).fadeIn()
        })
    },
    accordion: function () {
        $('#accordionBox').on('mouseenter', 'li', function () {
            $(this).stop().addClass('active').siblings().removeClass('active')
        })
    }
}

index.init()