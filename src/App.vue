<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <!-- <v-login></v-login> -->
    <div class="tab border-1px" style>
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
      <!-- 留坑 -->
    </div>
    <!-- vuex内容<div><Form/><Display/></div> -->
  </div>
</template>
<!--这是app.vue的script内容-->
<script type="text/ecmascript-6">
import headers from "./components/header/header.vue";
import login from "./components/Login";
import goods from "./components/goods/Goods";
import ratings from "./components/ratings/Ratings";
import sellers from "./components/seller/Seller";
import "./common/stylus/index.styl";
import api from "./axios/api.js";
import NewsCell from "./components/header/NewsCell.vue";
import Display from "./components/store/Display";
import Form from "./components/store/Form";
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

export default {
  name: "index",
  data: function() {
    return {
      seller: {}
    };
  },
  created() {
    this.setNewsApi();
  },
  methods: {
    setNewsApi: function() {
      api.JH_news("/posts", "type=top&key=123456").then(res => {
        console.log(res);
        this.seller = res.seller;
      });
    }
  },
  components: {
    "v-header": headers,
    NewsCell,
    "v-login": login,
    Display,
    Form
    // 'v-goods':goods,
    // 'v-ratings':ratings,
    // 'v-seller':seller,
  }
  //   created() {
  //   this.$http.get("/posts").then(res => {
  //     // res = res.json();
  //     console.log(res);
  //   });
  // },
};
</script>
<style  lang="stylus" rel="stylesheet/stylus">
// @import "./common/stylus/mixin.styl"
// @import "./common/stylus/base.styl"
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    // border-1px(red)
    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        color: rgba(77, 85, 93, 1);

        // &:active不起作用
        &.active {
          color: red;
        }
      }
    }
  }
}
</style>
