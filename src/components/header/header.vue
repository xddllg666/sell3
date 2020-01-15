<template>
  <div class="header">
    <!-- 内容 -->
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <!-- 内容区 -->
      <div class="content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 描述 -->
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <!-- support里面的type对应不同的免减类型 -->
        <div v-if="seller.supports" class="support">
          <!-- 不同的type对应不同的图片icon -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- <span>{{newsListShow.seller}}</span> -->

    <!-- <div v-for="(item, key,index) in newsListShow"> -->
    <!-- <span :newsDate="item" :key="key">{{item.seller}}{{key}}</span> -->
    <!-- </div> -->
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <!-- transition="fade" -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,key) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[key].type]"></span>
                <span class="text">{{seller.supports[key].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>

        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import star from "../star/star";
export default {
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  data() {
    return {
      // 在new这个vue实例的时候,会对data里面的值进行get和setter
      // 默认是false,刚进入页面的时候不会显示
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

.header {
  position: relative;
  color: #fff;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.3);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    // 头像
    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    // 内容
    .content {
      display: inline-block;
      margin-left: 16px;
      font-size: 14px;

      // 标题文字
      .title {
        margin: 2px 0 8px 0;

        // brand是个图片,品牌图片
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          color: rgb(255, 255, 255);
          font-weight: bold;
          line-height: 18px;
        }
      }

      .description {
        margin-bottom: 10px;
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 12px;
        // 免减类型
      }

      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 2px;

          // 根据后端传来的数据选择不同的class,这里是副样式
          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }

        .text {
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 17px;
      padding: 0 8px;
      height: 24px;
      line-height: 27px;
      // vertical-align: top;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        font-size: 10px;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    background: rgba(7, 17, 27, 0.2);
    position: relative;
    // font-size 0
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      margin-top: 8px;
      vertical-align: top;
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 9px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
    // 不是加到这里啦
    // background rgba(7,17,27,0.5)
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    // 滚动
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    // backdrop-filter blue(10px)
    // filter: blur(1px);
    
    
    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
      }

      .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }

      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
      }

      .title {
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;

        .line {
          flex: 1;
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text {
          font-weight: 700;
          padding: 0 12px;
          font-size: 14px;
        }
      }

      .supports {
        width: 80%;
        margin: 0 auto;

        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;

          &:last-child {
            margin-bottom: 0;
          }

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            margin-right: 6px;

            &.decrease {
              bg-image('decrease_2');
            }

            &.discount {
              bg-image('discount_2');
            }

            &.guarantee {
              bg-image('guarantee_2');
            }

            &.invoice {
              bg-image('invoice_2');
            }

            &.special {
              bg-image('special_2');
            }
          }

          .text {
            line-height: 18px;
            font-size: 12px;
          }
        }
      }

      .bulletin {
        width: 80%;
        margin: 0 auto;

        .content {
          padding: 0 12px;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
        }
      }
    }

    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
