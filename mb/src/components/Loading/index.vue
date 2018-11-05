<template>
  <div class="loading">
    <div class="loading-mask" :style="{background: styleBG}"></div>
    <div class="loading-toast">
      <img v-if="toastImg" class="toast-img" src="./loading.gif">
      <p class="toast-content">{{title}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '数据加载中'
    },
    toastImg: {
      type: Boolean,
      default: true
    },
    styleBG: {
      type: String,
      default: 'transparent'
    }
  }
}
</script>
<style scoped lang="less">
@import "../../assets/style/mixin.less";

.loading{
  &-mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  &-toast{
    .px2rem(padding, 30);
    .px2rem(border-radius, 10);
    color: @color-fff;
    position: fixed;
    z-index: 5000;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    .toast-img{
      .px2rem(width, 80);
      .px2rem(height, 80);
      vertical-align: baseline;
      &+.toast-content{
        .px2rem(margin-top, 10)
      }
    }
    .toast-content{
      .px2rem(font-size, 28);
      line-height: 1.2;
    }
  }
}
</style>
