<template>
  <div class="cross-screen flex flex-center flex-ver" v-show="!videoShow && orientationState">
    <div class="screen-icon"></div>
    <div class="tips">为了更好的体验，请将手机／平板竖过来</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CrossScreen',
  data () {
    return {
      orientationState: false
    }
  },
  mounted() {
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', this.orientation)
  },
  computed: {
    ...mapGetters([
      'videoShow'
    ])
  },
  methods: {
    orientation() {
      if (window.orientation === 180 || window.orientation === 0) {
        this.orientationState = false
      }
      if (window.orientation === 90 || window.orientation === -90) {
        this.orientationState = true
      }
    }
  }
}

</script>

<style lang='less' scoped>
@import "../../assets/style/class.less";

.cross-screen{
  z-index: 99999;
  position: fixed;
  top:0;
  right:0;
  bottom: 0;
  left:0;
  background-color: #212429;
  color:#FF9300;
  .screen-icon{
    background: url(../../assets/img/crossScreen.png) no-repeat center;
    background-size: 100% 100%;
    width: 2rem;
    height: 1.73rem;
  }
  .tips{
    margin-top: 0.2rem;
  }
}
</style>
