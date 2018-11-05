<template>
  <section class="main-box">
    <div class="box-bg-poster">
      <h1 class="logo"></h1>
    </div>
    <div class="box-bg-news">
      <div class="appoint-info text-center">
        <div class="info-btn">
          <span @click="openAppoint" class="icon-btn-bg"></span>
        </div>
        <p class="info-number">
          已有<span class="number"> {{appointmentInfo | parseNumber}} </span>魔导士预约
        </p>
      </div>
      <div class="appoint-video">
        <div class="video-inner">
          <img src="../../assets/img/video-poster.png" >
          <span @click="openVideo" class="video-btn"></span>
        </div>
      </div>
      <ks-news :newsTypes="indexType" :newsLists="indexList"></ks-news>
    </div>
    <div class="box-bg-yxqb">
      <div class="content-box">
        <div class="content-title">
          <span class="game-title"></span>
        </div>
        <div class="content-accordion">
          <ks-swiper :swiperSlides="roleList"></ks-swiper>
        </div>
      </div>
    </div>
    <loading v-show="loginLoading"></loading>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { util } from '@/utils'
import Loading from '@/components/Loading'
import KsSwiper from '@/components/KsSwiper'
import KsNews from '@/components/KsNews'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch({type: 'getAppointmentInfo'})
    this.$store.dispatch({type: 'getIndexNews'})
    this.$store.dispatch({type: 'getRoleInfo'})
  },
  methods: {
    openAppoint() {
      this.$store.commit({type: 'TOGGLE_APPOINT', status: true})
    },
    openVideo() {
      this.$router.push({name: 'video'})
    }
  },
  computed: {
    ...mapGetters([
      'loginLoading',
      'indexList',
      'indexType',
      'appointmentInfo',
      'roleList'
    ])
  },
  components: {
    KsSwiper,
    KsNews,
    Loading
  },
  filters: {
    parseNumber(val) {
      return util.numberSplit(val)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/variable.less";
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";

.box-bg-poster{
  width: 100%;
  .px2rem(height, 1067);
  background: url('../../assets/img/bg-1.jpg') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .logo{
    position: absolute;
    .px2rem(left, 28);
    .px2rem(top, 40);
    .px2rem(width, 170);
    .px2rem(height, 105);
    background: url('../../assets/img/logo.png') no-repeat center center;
    background-size: 100% 100%;
  }
}

.box-bg-news{
  width: 100%;
  .px2rem(height, 1080);
  .px2rem(padding-top, 140);
  background: url('../../assets/img/bg-2.jpg') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .appoint-info{
    width: 100%;
    position: absolute;
    left: 0;
    .px2rem(top, -50);
    .icon-btn-bg{
      .px2rem(width, 341);
      .px2rem(height, 101);
      background-image: url('../../assets/img/btn-appoint.png');
    }
    .info-number{
      .px2rem(margin-top, 13);
      .px2rem(font-size, 26);
      color: @color-info-number;
      font-style: italic;
      span{
        color: @color-number;
      }
    }
  }
  .appoint-video{
    .px2rem(padding-left, 24);
    .px2rem(padding-right, 27);
    .video-inner{
      .px2rem(width, 659);
      .px2rem(height, 338);
      .px2rem(padding, 20);
      background: url('../../assets/img/video-border.png') no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      .video-btn{
        .px2rem(width, 345);
        .px2rem(height, 367);
        background: url('../../assets/img/video-btn.png') no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}

.box-bg-yxqb{
  width: 100%;
  .px2rem(height, 729);
  background: url('../../assets/img/bg-3.jpg') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .content-accordion{
    .px2rem(margin-top, 33);
    .px2rem(padding-left, 33);
    .px2rem(padding-bottom, 53);
  }
}

</style>
