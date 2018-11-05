<!-- 预约模块 -->
<template>
  <div class="appoint-wrap" v-transfer-dom @touchmove.prevent>
    <x-dialog v-model="showAppoint">
      <div class="appoint">
        <div class="content">
          <i class="icon-close" @click="closeAppoint"></i>
          <div class="content-main text-center">
            <div class="icon-title"></div>
            <div class="system">
              <label v-for="(item, index) in labelData" :key="index" :class="item.label === appLabel? 'system-item active' : 'system-item'" @click="selectLabel(item)">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </label>
            </div>
            <div class="input yzm">
              <span ref="yzmBtn" @click="getCode" class="yzm-btn">
                <em>{{yzmTip}}</em>
              </span>
              <input type="text" v-model="mobile" name="mobile" placeholder="请输入您的手机号码">
            </div>
            <div class="input">
              <input type="text" v-model="code" name="code" placeholder="请输入您的验证码">
            </div>
            <div @click="postSubmit" :class="submitClass"></div>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { util } from '@/utils'

export default {
  data () {
    return {
      yzmTip: '获取验证码',
      notAllow: true,
      time: 60,
      timer: null,
      disabled: false,
      appLabel: -1,
      mobile: '',
      code: '',
      labelData: [
        {
          label: '0',
          name: 'iOS',
          icon: 'icon-pop-ios'
        },
        {
          label: '1',
          name: 'Android',
          icon: 'icon-pop-android'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'showAppoint'
    ]),
    submitClass() {
      return {
        'icon-submit': true,
        'shadow': this.notAllow
      }
    }
  },
  methods: {
    _initrefresh() {
      this.appLabel = -1
      this.code = ''
      this.mobile = ''
    },
    closeAppoint() {
      this.$store.commit({type: 'TOGGLE_APPOINT', status: false})
    },
    selectLabel(item) {
      this.appLabel = item.label
      this.notAllow = false
    },
    getCode() {
      if (!this.validate()) return false

      if (this.disabled) return false

      this.$store.dispatch({type: 'getSmsCode', data: { 'mobile': this.mobile }})
        .then(res => {
          const temp = res.data
          console.log(temp)
          if (temp.code === 10000) {
            this.disabled = true
            this.$vux.toast.show({
              text: '请注意查收手机短信'
            })
            this.countDown()
          } else {
            this.$vux.toast.show({
              text: temp.msg
            })
          }
        })
    },
    countDown: function () {
      this.yzmTip = this.time + 's'
      this.timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(this.timer)
          this.time = 60
          this.yzmTip = '重新获取'
          this.disabled = false
        } else {
          this.time--
          this.yzmTip = '已发送' + this.time + 's'
        }
      }, 1000)
    },
    postSubmit() {
      if (this.notAllow) return false
      if (!this.validate()) return false
      if (!this.code) {
        this.$vux.toast.show({
          text: '请输入验证码'
        })
        return false
      }

      const params = {
        app_label: this.appLabel,
        mobile: this.mobile,
        code: this.code
      }

      this.$store.dispatch({type: 'create', data: params})
        .then(res => {
          const temp = res.data
          if (temp.code === 10000) {
            this.closeAppoint()
            this._initrefresh()
          }
          this.$vux.toast.show({
            text: temp.msg
          })
        })
    },
    validate() {
      // 选择系统
      if (this.appLabel === -1) {
        this.$vux.toast.show({
          text: '请先选择手机类型'
        })
        return false
      }
      // 不能为空
      if (!this.mobile) {
        this.$vux.toast.show({
          text: '手机号不能为空'
        })
        return false
      }
      // 格式不对
      if (!util.mobileRegexp.test(this.mobile)) {
        this.$vux.toast.show({
          text: '手机号格式有误'
        })
        return false
      }
      return true
    }
  }
}

</script>

<style lang="less">
.appoint-wrap{
  .weui-dialog{
    width: 4.77rem;
  }
}
.weui-dialog{
  max-width: 100% !important;
}
// 覆盖默认vux样式
.weui-dialog{
  background: transparent !important;
}
.weui-toast{
  width: 10em !important;
}
.weui-toast__content{
  font-size: 0.16rem !important;
  line-height: 1.5 !important;
}
</style>

<style lang='less' scoped>
@import "../../../assets/style/variable.less";
@import "../../../assets/style/class.less";
@import "../../../assets/style/mixin.less";

em{
  font-style: normal;
}
.appoint{
  .icon-close{
    .px2rem(right, 38);
    .px2rem(top, 26);
    .px2rem(width, 26);
    .px2rem(height, 28);
    position: absolute;
    cursor: pointer;
    background-image: url(../../../assets/img/pop-close.png);
  }
  .content{
    .px2rem(width, 477);
    .px2rem(height, 530);
    .px2rem(border-radius, 30);
    position: relative;
    background-color: @color-pop-appoint-rgba;
    border: solid .04rem @color-pop-txt;
    .icon-title{
      .px2rem(margin-top, 63);
      .px2rem(width, 397);
      .px2rem(height, 62);
      background-image: url(../../../assets/img/pop-appoint-title.png);
    }
    .icon-submit{
      .px2rem(margin-top, 36);
      .px2rem(width, 341);
      .px2rem(height, 101);
      cursor: pointer;
      background-image: url(../../../assets/img/btn-pop-appoint.png);
      &.shadow{
        cursor: default;
        opacity: 0.6;
      }
    }
  }
}

.system{
  .px2rem(margin-top, 32);
  .system-item{
    display: inline-block;
    .px2rem(width, 173);
    .px2rem(height, 45);
    .px2rem(line-height, 45);
    .px2rem(font-size, 20);
    .px2rem(border-radius, 8);
    font-weight: bold;
    cursor: pointer;
    color: @color-pop-txt;
    border: 1px solid @color-pop-txt;
    background-color: @color-pop-system-rgba;
    &+.system-item{
      .px2rem(margin-left, 8);
    }
    i{
      vertical-align: 0;
    }
    .icon-pop-android{
      .px2rem(width, 19);
      .px2rem(height, 21);
      background-image: url(../../../assets/img/pop-android.png);
    }
    .icon-pop-ios{
      .px2rem(width, 17);
      .px2rem(height, 21);
      background-image: url(../../../assets/img/pop-ios.png);
    }
    &.active{
      border-color: @color-pop-system-active;
      background-color: @color-pop-system-active;
    }
  }
}

.input{
  .px2rem(margin-top, 16);
  .px2rem(font-size, 16);
  .px2rem(line-height, 43);
  position: relative;
  &.yzm{
    .px2rem(margin-top, 34);
    .yzm-btn{
      .px2rem(width, 111);
      .px2rem(height, 43);
      .px2rem(line-height, 45);
      .px2rem(right, 58);
      .px2rem(border-top-right-radius, 8);
      .px2rem(border-bottom-right-radius, 8);
      .no-wrap();
      cursor: pointer;
      position: absolute;
      top: 0;
      outline: none;
      color: @color-pop-txt;
      background-color: @color-pop-system-active;
      border: 1px solid @color-pop-txt;
    }
  }
  input[type='text']{
    .px2rem(width, 347);
    .px2rem(height, 43);
    .px2rem(padding-left, 12);
    .px2rem(border-radius, 8);
    background-color: rgba(171, 10, 3, 0.18);
    border: 1px solid @color-pop-txt;
    outline: none;
    color: @color-input-txt;
    .placeholder();
  }
}

@media screen and (min-width: 319px) and (max-width: 413px){
  .yzm-btn em{
    .scale(16);
    display: block;
  }
}
@media only screen and (max-width: 320px){
  .yzm-btn em{
    transform-origin: 0.3rem;
  }
}
</style>
