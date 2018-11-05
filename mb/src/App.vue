<template>
  <div id="app">
    <router-view/>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.viewLoad.isLoading
    })
  }
}
</script>

<style lang="less" scoped>
#app {
  min-height: 100%;
  position: relative;
}
</style>
