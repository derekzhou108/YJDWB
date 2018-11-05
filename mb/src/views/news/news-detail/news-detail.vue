<template>
  <article class="detail">
    <div class="detail-title text-center">
      <h2 class="title bold">{{newsDetail.title}}</h2>
      <p class="subtitle">{{newsDetail.updated_at | parseDate}}</p>
    </div>
    <div class="detail-content" v-html="newsDetail.context">
      <!-- <p><img src="../../../assets/img/detail-img.png" ></p>
      <p>《叛逆性百万亚瑟王》是由网易与Square Enix联合开发的手游作品，是《百万亚瑟王》系列的中国定制版续作，也是该系列的首款MMORPG游戏。不仅有许多《百万亚瑟王》系列中的经典角色，将在本代作品中登场继续由镰池和马担任监督的本作剧情，也将迎来超发展。</p>
      <p>系列中的经典角色，将在本代作品中登场继续由镰池和马担任监督的本作剧情，也将迎来超发展。</p> -->
    </div>
    <loading v-show="detailLoading"></loading>
  </article>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id !== vm.id) {
        vm.getData(to.params.id)
      }
    })
  },
  created() {
    this.getData()
  },
  methods: {
    getData(params) {
      const temp = params || this.id
      this.$store.dispatch({type: 'getNewsDetail', data: {id: temp}})
    }
  },
  computed: {
    ...mapGetters([
      'newsDetail',
      'detailLoading'
    ])
  },
  components: {
    Loading
  },
  filters: {
    parseDate(val) {
      if (val) {
        return val.substr(0, 10)
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/style/variable.less";
@import "../../../assets/style/class.less";
@import "../../../assets/style/mixin.less";

.detail-content{
  .px2rem(margin-top, 38);
  p , h2{
    margin-bottom: .3rem;
    word-break: break-all;
    .px2rem(font-size, 32);
    .px2rem(line-height, 54);
    text-indent: 2em;
    color: @color-txt;
  }
  img{
    display: block;
    margin: 5px auto;
    .px2rem(margin-bottom, 38);
  }
}
</style>

<style scoped lang="less">
@import "../../../assets/style/variable.less";
@import "../../../assets/style/class.less";
@import "../../../assets/style/mixin.less";

.detail{
  .px2rem(padding-top, 50);
  .px2rem(padding-right, 58);
  .px2rem(padding-bottom, 65);
  .px2rem(padding-left, 52);
  .title{
    .px2rem(font-size, 36);
    word-break: break-all;
    color: @color-detail-title;
    line-height: 1.3;
  }
  .subtitle{
    .px2rem(font-size, 16);
    .px2rem(margin-top, 24);
    color: @color-txt;
  }
}
</style>
