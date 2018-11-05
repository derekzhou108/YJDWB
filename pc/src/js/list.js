/*
 * @Author: Butter
 * @Date: 2018-04-12 21:46:20
 * @Last Modified by: Butter
 * @Last Modified time: 2018-04-28 17:49:08
 */

'use strict'
var list = {
    pageSize: 4,
    pageCount: 1,
    index: 0,
    init: function () {
        var that = this
        that.autoBind()
        api.getNewsType()
            .then(function (res) {
                // console.log(res)
                that.fillNewsType(res.data)
                that.getFirstNews()
            })

    },
    autoBind: function () {
        var that = this

        $('#newsTypeHtml').on('click', '.news-type', function () {
            $(this).addClass('active').siblings().removeClass('active')
            that.index = $(this).index()
            // 控制新闻列表显示与否
            $('.news-box').hide().eq(that.index).show()

            // 控制分页按钮显示与否
            var curObj = that['type' + that.index]
            // 不足分页隐藏按钮
            $('.news-page').hide()
            if (curObj.showPage) {
                $('.news-page').eq(that.index).show()
            }

             that.getFirstNews()
        })
    },
    // 获取新闻种类
    fillNewsType: function (data) {
        var that = this,
            newsBox = ''

        $('#newsTypeHtml').html(template('newsTypeTem', data))
        $.each(data, function (k, v) {
            newsBox += '<div id="type' + k + '" class="news-box"></div>'
            newsBox += '<div id="page' + k + '" class="news-page inner">\
                    <span class="page-prev icon-news-left-arrow" title = "上一页" ></span >\
                    <span class="page-next icon-news-right-arrow" title="下一页"></span>\
                  </div >'
            that['type' + k] = {
                firstLoading: true,
                idx: 0,   //当前页
                pages: 0, //总页数
                pageSize: that.pageSize, // 每页条数
                cid: v.id //栏目ID
            }
        })
        $('#figureHtml').html(newsBox)
    },
    // 加载第一页新闻
    getFirstNews: function () {
        var that = this,
            ele = '#type' + that.index,
            obj = that['type' + that.index]
        console.log('12')
        if (!obj.firstLoading) return false

        api.newsListAjax({page: obj.idx, cid: obj.cid, page_size: obj.pageSize})
            .then(function (res) {
                // console.log(res)
                $(ele).html(template('newsTem', res.data.news))
                obj.pages = res.data.pageCount
                obj.firstLoading = false
                that.initPage(obj, ele)
            })
    },
    // 初始化分页
    initPage: function (obj, ele) {
        var that = this,
            $newsPage = $('#page' + that.index)

        // 不足分页隐藏按钮
        if (obj.pages <= that.pageCount) {
            $newsPage.hide()
            obj.showPage = false
        } else {
            $newsPage.show()
            obj.showPage = true
        }

        // 默认上一页按钮无效
        $newsPage.find('.page-prev').addClass('noMore').attr({'title': ' '})

        // 切换上一页
        $newsPage.on('click', '.page-prev', function () {
            if ($(this).hasClass('noMore')) {
                return false
            }

            obj.idx = obj.idx - 1
            // console.log('上一页：'+ JSON.stringify(obj))
            that.getNewsList({page: obj.idx, cid: obj.cid, page_size: obj.pageSize}, ele)
        })

        // 切换下一页
        $newsPage.on('click', '.page-next', function () {
            if ($(this).hasClass('noMore')) {
                return false
            }

            obj.idx = obj.idx + 1
            // console.log('下一页：' + JSON.stringify(obj))
            that.getNewsList({page: obj.idx, cid: obj.cid, page_size: obj.pageSize}, ele)
        })
    },
    // 获取新闻列表
    getNewsList: function (params, ele) {
        var that = this
        api.newsListAjax(params)
            .then(function (res) {
                // console.log(res)
                $(ele).html(template('newsTem', res.data.news))
                that.editPageStatus()
            })
    },
    // 处理左右分页按钮状态
    editPageStatus() {
        var that = this,
            obj = that['type' + that.index],
            $pagePrev = $('#page' + that.index).find('.page-prev'),
            $pageNext = $('#page' + that.index).find('.page-next')

        if (!obj.idx) {
            $pagePrev.addClass('noMore').attr({'title': ' '})
        } else {
            $pagePrev.removeClass('noMore').attr({'title': '上一页'})
        }

        if (obj.idx + 1 >= obj.pages) {
            $pageNext.addClass('noMore').attr({'title': ' '})
        } else {
            $pageNext.removeClass('noMore').attr({'title': '下一页'})
        }
    }
}

list.init();