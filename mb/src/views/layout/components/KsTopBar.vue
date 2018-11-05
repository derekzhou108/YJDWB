<template>
  <header v-show="!orientationState" class="topBar">
    <div v-if="barIconName" class="topBar-icon float-l">
      <span @click="goBack" :class="`icon-${barIconName}`"></span>
    </div>
    <div class="topBar-title">
      <p class="bold">妖精的尾巴：勇气之旅</p>
      <p>3D超燃 妖尾MMO战斗手游</p>
    </div>
    <div class="topBar-btn">
      <span @click="goIndex" class="icon-btn-link text-center">{{barBtnTxt}}</span>
    </div>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
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
      ]),
      barBtnTxt() {
        return this.$route.meta.title
      },
      barIconName() {
        return this.$route.meta.icon
      }
    },
    methods: {
      orientation() {
        if (!this.videoShow) {
          return false
        }
        if (window.orientation === 180 || window.orientation === 0) {
          this.orientationState = false
        }
        if (window.orientation === 90 || window.orientation === -90) {
          this.orientationState = true
        }
      },
      goBack() {
        if(this.barIconName!=='logo'){
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
        }

      },
      goIndex() {
        const isIndex = this.$route.name === 'index'
        if (isIndex) {
          this.$store.commit({type: 'TOGGLE_APPOINT', status: true})
        } else {
          this.$router.push({path: '/', replace: true})
        }
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../../assets/style/variable.less";
  @import "../../../assets/style/class.less";
  @import "../../../assets/style/mixin.less";

  .topBar {
    .px2rem(height, 99);
    .px2rem(padding-right, 32);
    background: @color-000;
    color: @color-fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 50%;
    z-index: 99;
    box-sizing: border-box;
    min-width: 320px;
    max-width: 750px;
    transform: translate(-50%);
    &-icon {
      .px2rem(margin-top, 14);
      .px2rem(margin-left, 14);
      .icon-back {
        .px2rem(width, 80);
        .px2rem(height, 80);
        background-image: url('../../../assets/img/icon-back.png');
      }
      .icon-logo {
        .px2rem(width, 120);
        .px2rem(height, 120);
        background-image: url('../../../assets/img/icon-logo.png');
      }
      & + .topBar-title {
        .px2rem(padding-left, 18);
      }
    }
    &-title {
      .px2rem(padding-left, 36);
      .px2rem(padding-top, 24);
      .px2rem(padding-right, 200);
      .px2rem(font-size, 22);
      overflow: hidden;
      p{
        .px2rem(font-size, 25);
        &.bold {
          .px2rem(font-size, 30);
          .px2rem(margin-bottom, 12);
        }
      }

    }
    &-btn {
      position: absolute;
      .px2rem(right, 32);
      .px2rem(top, 21);
      .icon-btn-link {
        .px2rem(width, 196);
        .px2rem(height, 58);
        .px2rem(line-height, 58);
        .px2rem(font-size, 26);
        background-image: url('../../../assets/img/btn-reserve-bg.png');
      }
    }
  }
</style>
