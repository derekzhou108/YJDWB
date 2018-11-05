<template>
  <section class="min-height" v-cloak>
    <!-- <transition name="fade" mode="out-in"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'KsMain'
}
</script>

<style lang="less" scoped>
[v-cloak]{
  display: none;
}
.min-height{
  padding-top: 0.99rem;
  position: relative;
  z-index: 1;
}
</style>
