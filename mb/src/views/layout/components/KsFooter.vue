<template>
  <footer class="footer">
    <div class="footer-item flex flex-center">
      <span @click="openQR" class="item-icon icon-ewm"></span>关注公众号
      <span @click="openShare" class="item-icon icon-share"></span>分享小伙伴
    </div>
    <div class="footer-txt text-center">
      <div class="info">
        <p>
          <a href="http://www.ccm.gov.cn/" style="color:#333333;margin-right: 0.15rem;text-decoration: none;"
             target="_blank">粤网文（2017）3800-729号</a>
        </p>
        <p>
          <a href="http://www.miitbeian.gov.cn" style="color:#333333;text-decoration: none;" target="_blank">粤ICP备17047563号-2</a>
        </p>
        <p>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339">
            <img style="width: 0.2rem;position: relative;"
                 src="//cdn.ksgame.com/ksgame/pc2/dist/img/foreground/icon_yuewangga1.png">
          </a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339"
             style="color: #333333;text-decoration: underline;">粤公网安备 44030502001339号</a>
        </p>
        <p>增值电信业务经营许可证：粤B2-20170497</p>
        <p>Copyright © 2017 jinchiniao. All rights reserved.</p>
        <p>Based on the managa "Fairy Tail" by Hiro Mashima originally serialized</p>
        <p>in the weekly Shonen Magazine published by KODANSHA LTD.</p>
        <p>©Hiro Mashima・KODANSHA/Fairy Tail project・TV TOKYO. All Rights Reserved.</p>
      </div>
    </div>
    <!-- 公众号 -->
    <div class="dialog-ewm" v-transfer-dom @touchmove.prevent>
      <x-dialog v-model="showQR" :hideOnBlur="true">
        <div>
          <div class="ewm-img">
            <img alt="二维码" title="公众号二维码" src="../../../assets/img/qrcode.jpg">
          </div>
          <p class="ewm-txt">长按关注官方公众号</p>
        </div>
      </x-dialog>
    </div>

    <div class="maskShadow" v-show="mask" @touchmove.prevent></div>
    <!-- 百度分享 -->
    <div ref="dialog" class="dialog-share" v-transfer-dom @touchmove.prevent>
      <x-dialog v-model="showShare" :hideOnBlur="true">
        <div class="share bdsharebuttonbox" data-tag="share_1"><a class=" reset-css icon-qq" data-cmd="sqq">QQ</a><a
          class=" reset-css icon-wb" href="https://weibo.com/u/6514148113?refer_flag=1001030101_">微博</a><a
          class=" reset-css icon-bd"
          href="https://tieba.baidu.com/f?kw=%E5%A6%96%E7%B2%BE%E7%9A%84%E5%B0%BE%E5%B7%B4%E5%8B%87%E6%B0%94%E4%B9%8B%E6%97%85&ie=utf-8">贴吧</a>
        </div>
      </x-dialog>
    </div>
  </footer>
</template>

<script>
  // 百度分享
  import {bdShare} from '../../../assets/js/bdShare'

  export default {
    data() {
      return {
        mask: false,
        showQR: false,
        showShare: false
      }
    },
    created() {
      bdShare()
      document.addEventListener('click', this.weixinShareClose)
    },
    destroyed() {
      document.removeEventListener('click', this.weixinShareClose)
    },
    computed: {
      dialog() {
        return this.$refs.dialog
      }
    },
    methods: {
      openQR() {
        this.showQR = true
      },
      openShare() {
        this.showShare = true
      },
      wxShare() {
        this.mask = true
      },
      weixinShareClose(e) {
        if (e.target.className.toLowerCase() === 'bd_weixin_popup_close') {
          this.mask = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../../assets/style/variable.less";
  @import "../../../assets/style/class.less";
  @import "../../../assets/style/mixin.less";

  .footer {
    .px2rem(padding-top, 37);
    .px2rem(padding-right, 19);
    .px2rem(padding-bottom, 43);
    .px2rem(padding-left, 17);
    &-item {
      .px2rem(padding-bottom, 31);
      .px2rem(height, 76);
      .px2rem(font-size, 24);
      .border-style(bottom, 2, @color-footer-line);
      color: @color-txt;
      .item-icon {
        .px2rem(width, 76);
        .px2rem(height, 76);
        .px2rem(margin-right, 27);
      }
      .icon-ewm {
        background-image: url('../../../assets/img/icon-ewm.png');
      }
      .icon-share {
        .px2rem(margin-left, 81);
        background-image: url('../../../assets/img/icon-share.png');
      }
    }
    &-txt {
      .px2rem(padding-top, 40);
      .px2rem(padding-bottom, 8);
      .px2rem(font-size, 18);
      color: @color-footer-txt;
      p {
        .px2rem(margin-bottom, 10);
      }
    }
  }

  .maskShadow {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, .67);
  }

  .dialog-share {
    .reset-css {
      padding-left: 0px;
      padding-top: 0.87rem;
      width: 33%;
      height: 0.4rem;
      line-height: 0.4rem;
      background-size: 0.87rem 0.87rem !important;
      margin: 0;
      font-size: 0.14rem;
      color: #EADFC3;
      float: left;
      display: inline-block;
    }
    .icon-qq {
      background: url(../../../assets/img/icon-qq.png) no-repeat center top;
    }
    .icon-wb {
      background: url(../../../assets/img/icon-wb.png) no-repeat center top;
    }
    .icon-bd {
      background: url(../../../assets/img/icon-bd.png) no-repeat center top;
    }
    .icon-wx {
      background: url(../../../assets/img/icon-wx.png) no-repeat center top;
    }
  }

  .dialog-ewm {
    .ewm-img {
      img {
        .px2rem(width, 300);
        .px2rem(height, 300);
      }
    }
    .ewm-txt {
      color: @color-fff;
      .px2rem(font-size, 26);
      .px2rem(margin-top, 20);
    }
  }
</style>
