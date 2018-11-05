<template>
  <div id="videoContainer" :class="videoClass">
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        orientationState: false
      }
    },
    created() {
      this.$store.dispatch({type: 'getVideoUrl'})
    },
    mounted() {
      window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', this.orientation)
    },
    computed: {
      videoClass() {
        return {
          'video-container': this.orientationState
        }
      },
      ...mapGetters([
        'videoUrl'
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
      },
      initVideoPlayer(Url) {
        new TcPlayer('videoContainer', {
          'hls':'0.8.1',
          'm3u8': Url, // 请替换成实际可用的播放地址
          'autoplay': true, // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          'width': '100%', // 视频的显示宽度，请尽量使用视频分辨率宽度
          'height': '100%' // 视频的显示高度，请尽量使用视频分辨率高度
        })
        /*        var player = cyberplayer("videoContainer").setup({
                  width: '100%',
                  height: 250,
                  file: Url,
                  type: "m3u8",
                  autostart: true,
                  stretching: "uniform",
                  repeat: true,
                  volume: 50,
                  controls: true,
                  controlbar: {
                    barLogo: false
                  },
                  starttime: 0,
                 // primary: "flash", // 强制使用flash来播放，不设置的话则默认高优使用H5进行播放
                  ak: "d449b511727048688d176818023afa54"
                });*/
      }
    },
    watch: {
      videoUrl(val) {
        this.initVideoPlayer(val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .video-container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    bottom: 0;
    width: 100%;
  }
</style>
