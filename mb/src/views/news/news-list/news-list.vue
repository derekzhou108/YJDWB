<template>
  <div class="page-list">
    <ks-news :newsTypes="pageType" :newsLists="pageList"></ks-news>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import KsNews from '@/components/KsNews'

export default {
  data() {
    return {
    }
  },
  created() {
    this.fillNewsType()
  },
  computed: {
    ...mapGetters([
      'pageList',
      'pageType'
    ])
  },
  methods: {
    fillNewsType() {
      this.$store.dispatch({type: 'getNewsType'})
        .then(() => {
          const obj = this.pageType[0]
          const temp = {cid: obj.id, page: 0}
          this.$store.dispatch({type: 'getPageNews', data: temp})
        })
    }
  },
  components: {
    KsNews
  }
}
</script>

<style lang="less">
@import "../../../assets/style/mixin.less";

.page-list{
  .content-title{
    .px2rem(padding-top, 46);
  }
  .content-tab{
    .px2rem(margin-bottom, 50);
    .px2rem(margin-top, 43) !important;
  }
}
</style>
