<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
      <!-- <router-link :to="{name: 'detail', params: { id: item.id }}">
        <img :src="item.wap_role_img">
      </router-link> -->
      <div>
        <img :src="item.wap_role_img">
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ks-swiper',
  props: {
    swiperSlides: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true
      }
    }
  },
  methods: {},
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less">
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";

.swiper-container .swiper-slide{
  .px2rem(width, 291);
  .px2rem(height, 516);
  .px2rem(margin-right, 15);
  a{
    display: block;
  }
}
</style>
