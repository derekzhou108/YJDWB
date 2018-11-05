<template>
  <aside v-show="showSideBar" class="sideBar">
    <span @click="goAnchor" class="icon-backTop">返回顶部</span>
  </aside>
</template>

<script>

  export default {
    name: 'BackTop',
    data() {
      return {
        showSideBar: false,
        winHeight: document.documentElement.clientHeight
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handelScroll, false)
    },
    methods: {
      handelScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.showSideBar = scrollTop > this.winHeight / 2
      },
      goAnchor() {
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        let step = distance / 50
        this.smoothUp(distance, step)
      },
      smoothUp(distance, step) {
        if (distance > 0) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(() => {
            this.smoothUp(distance, step)
          }, 5)
        } else {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        }
      }
    },
    computed: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../../assets/style/variable.less";
  @import "../../../assets/style/mixin.less";

  .sideBar {
    position: fixed;
    .px2rem(right, 55);
    .px2rem(bottom,160);
    z-index: 990;
    .icon-backTop {
      color: transparent;
      text-indent: -999em;
      .px2rem(width, 80);
      .px2rem(height, 80);
      display: block;
      background: url('../../../assets/img/icon-backTop.png') no-repeat left top;
      background-size: 100% 100%;
    }
  }
</style>
