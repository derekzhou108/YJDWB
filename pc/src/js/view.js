/*
 * @Author: Butter
 * @Date: 2018-04-12 14:28:09
 * @Last Modified by: Butter
 * @Last Modified time: 2018-04-26 16:13:43
 */

'use strict'
var view = {
    init: function () {
        var that = this
        api.getNewsType()
            .then(function (res) {
                $('#newsTypeHtml').html(template('newsTypeTem', res.data))
            })

        api.newsDetail({id: util.getQueryString('id')})
            .then(function (res) {
                // console.log(res)
                $('#viewHtml').html(template('viewTem', res.data))
                // 延迟执行
                setTimeout(() => {
                    that.autoActive()
                }, 200)
            })
    },
    autoActive: function () {
        var category = $('#viewHtml').find('.detail-title').data('category')
        $('#newsTypeHtml').find('.news-type').each(function (index, ele) {
            var tempId = $(ele).data('id')
            if (category === tempId) {
                $(ele).addClass('active').siblings().removeClass('active')
            }
        })
    }
}

view.init();
