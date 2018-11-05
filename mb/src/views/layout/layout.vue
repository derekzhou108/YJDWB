<template>
  <div class="page-wrap">
    <ks-top-bar></ks-top-bar>
    <ks-main></ks-main>
    <ks-footer></ks-footer>

    <appoint></appoint>
    <back-top></back-top>
    <cross-screen></cross-screen>
  </div>
</template>

<script>
import { KsTopBar, KsFooter, KsMain, Appoint, BackTop } from './components'
import CrossScreen from '../../components/CrossScreen'

export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    KsTopBar,
    KsFooter,
    KsMain,
    Appoint,
    BackTop,
    CrossScreen
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
