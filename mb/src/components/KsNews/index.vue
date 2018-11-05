<template>
  <div class="content-box">
    <div class="content-title">
      <span class="news-title"></span>
    </div>
    <div class="content-tab">
      <div class="tab-nav">
        <ul class="flex flex-between">
          <li v-for="(type, index) in newsTypes" :key="index"
              :class="index === selectIndex? 'nav-item active' : 'nav-item'" @click="changeType(index, type)">
            <span>{{type.category}}</span>
            <i class="icon-nav"></i>
          </li>
        </ul>
        <span @click="goViewNews" class="more-bg">more<i class="icon-more"></i></span>
      </div>
      <div class="tab-box">
        <div class="box-item" v-for="(lists, ind) in newsLists" :key="ind" v-show="ind === selectIndex">
          <ul>
            <li v-for="(item, index) in lists.news" :key="index">
              <div class="item-info flex flex-align-center">
                <span class="list-num">{{index | parseTwo}}</span>
                <router-link :to="{name:'detail', params: {id: item.id}}" class="list-title">
                  【{{item.category_name||item.type}}】{{item.title}}
                </router-link>
                <span class="list-date">{{item.created_at | parseDate}}</span>
              </div>
            </li>
          </ul>
          <div class="flex-center flex load-more"
               v-show="(lists.pageCount - lists.pageIndex > 1) && viewList"
               @click="getlist(lists)">
            <p class="load-txt">加载更多</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      newsTypes: {
        type: Array,
        default: () => {
          return []
        }
      },
      newsLists: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        selectIndex: 0
      }
    },
    computed: {
      viewList() {
        return this.$route.name === 'list'
      }
    },
    methods: {
      changeType(index, type) {
        this.selectIndex = index
        if (this.viewList && type.firstLoading) {
          this.getlist(type)
        }
      },
      getlist(item) {
        const cid = item.cid || item.id
        const page = item.pageIndex + 1 || 0
        const temp = {cid, page}
        this.$store.dispatch({type: 'getPageNews', data: temp})
      },
      goViewNews() {
        this.$router.push({name: 'list'})
      }
    },
    filters: {
      parseTwo(val) {
        const number = val + 1
        return number >= 10 ? number : `0${number}`
      },
      parseDate(val) {
        return val.substr(5, 5)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/style/variable.less";
  @import "../../assets/style/class.less";
  @import "../../assets/style/mixin.less";

  .content-tab {
    .px2rem(margin-top, 33);
    .px2rem(padding-left, 16);
    .px2rem(padding-right, 23);
    .tab-nav {
      .px2rem(font-size, 28);
      .px2rem(padding-bottom, 18);
      .border-style(bottom, 1, @color-nav-line);
      border-width: 1px;
      color: @color-news-nav;
      position: relative;
      ul {
        .px2rem(width, 426);
        margin: 0 auto;
      }
      .nav-item {
        position: relative;
        &.active {
          .icon-nav {
            display: block;
          }
        }
        .icon-nav {
          display: none;
          position: absolute;
          left: 50%;
          .px2rem(bottom, -29);
          .px2rem(margin-left, -60);
          .px2rem(width, 110);
          .px2rem(height, 22);
          background-image: url('../../assets/img/icon-nav.png');
        }
      }
      .more-bg {
        .px2rem(font-size, 16);
        .px2rem(top, 2);
        color: @color-news-more;
        position: absolute;
        right: 0;
        .icon-more {
          .px2rem(width, 12);
          .px2rem(height, 12);
          .px2rem(margin-left, 8);
          .px2rem(margin-top, -2);
          background-image: url('../../assets/img/news-more.png')
        }
      }
    }
    .tab-box {
      .px2rem(margin-top, 32);
      .px2rem(padding-left, 25);
      .px2rem(padding-right, 12);
      li {
        .px2rem(width, 674);
        .px2rem(height, 43);
        border-width: 1px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: left top;
        &:nth-child(odd) {
          background-image: url('../../assets/img/list-bg-1.png');
        }
        &:nth-child(even) {
          background-image: url('../../assets/img/list-bg-2.png');
        }
        & + li {
          margin-top: 16px;
        }
        .item-info {
          .px2rem(padding-left, 19);
          .px2rem(padding-right, 25);
          .px2rem(font-size, 28);

          color: @color-list-txt;
          height: 100%;
          border-bottom: 1px dashed @color-list-line;
          padding-bottom: 0.02rem;
          background: url('../../assets/img/news-detail.png') no-repeat 6.4rem center;
          background-size: 0.1rem;
          .list-num {
            .px2rem(padding, 5);
            .px2rem(font-size, 14);
            color: @color-fff;
            background: @color-list-num;
            border-radius: 50%;
            line-height: 0.28rem;
            width: 0.28rem;
            height: 0.28rem;
            font-size: 0.22rem;
            text-align: center;
          }
          .list-title {
            .px2rem(line-height, 50);
            .px2rem(height, 45);
            .px2rem(padding-left, 20);
            .px2rem(padding-right, 20);
            .no-wrap();
            color: @color-list-txt;
            flex: 0 0 70%;
          }
          .list-date {
            .px2rem(line-height, 50);
            .px2rem(height, 45);
          }
        }
      }
    }
  }

  .load-more {
    .px2rem(font-size, 24);
    .px2rem(margin-top, 50);
    .load-txt {
      padding: 0.12rem 0.24rem;
      border-radius: 0.2rem;
      color: #fff;
      border-radius: .3rem;
      border: 1px solid #decfa2;
      color: #666;
    }
  }
</style>
