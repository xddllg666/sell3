<template>
<div>
  <div class="goods">
    <!-- {{seller}} -->
    <!-- {{goods}} -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index"   class="menu-item" 
        :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="(food, index) in item.foods" :key="index">
              <div class="icon">
                <!-- <img width="57px" height="57px" :src="food.icon" alt=""> -->
                <!-- <img width="57px" height="57px" src="57.png" alt /> -->
                <!-- <div class="imgggg"></div> -->
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">${{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
             </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart  :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
  <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import shopcart from '../shopcart/shopcart'
import api from "../../axios/api.js";
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
    this.setNewsApi();
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      // 实时的纵轴y值
      // 跟左侧的索引做映射
      scrollY: 0,
      selectedFood:{}
    };
  },
  computed:{
    // 返回当前索引
    currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 当前索引的高度
          let height1 = this.listHeight[i];
          // 下一个索引的高度
          let height2 = this.listHeight[i + 1];
          // 判断高度落到的区间
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
       selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
  },
  methods: {
    setNewsApi: function() {
      api.JH_news("/posts", "type=top&key=123456").then(res => {
        this.goods = res.goods;
        this.$nextTick(() => {
          // 计算dom的时候,一定要异步之后渲染这个组件
          this._initScroll();
          this._calculateHeight();
        });
        // console.log(this.goods);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click:true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        // 实时返回滚动的位置
        click:true,
        probeType: 3
      });
      // 实时的拿到了y轴坐标
      // 映射，在计算属性里面
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 计算高度
    _calculateHeight() {
      // 拿到了每个元素的li,li的高度包括标题+里面每个商品高度,一个模块的高度
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );

      let height = 0;
      // 第一个区块的高度
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        // 获取每个区块
        let item = foodList[i];
        // 每一个单个的区块高度,累加
        height += item.clientHeight;
        // 一个递增的区间数组
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event){
      // 浏览器原生的点击事件上没有这个属性
      // 自定义事件的时候是true这个值_constructed
      if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        // 得到要滚动的位置
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
  },
  components:{
    shopcart,
    cartcontrol,
    food
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 82px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      &.current{
        position relative
        margin-top -1px
        z-index 10
        background #fff
        font-weight 700
        .text{
          border-none()
          }
        }
      .text {
        font-size: 12px;
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 2px;

          // 根据后端传来的数据选择不同的class,这里是副样式
          &.decrease {
            bg-image('decrease_3');
          }

          &.discount {
            bg-image('discount_3');
          }

          &.guarantee {
            bg-image('guarantee_3');
          }

          &.invoice {
            bg-image('invoice_3');
          }

          &.special {
            bg-image('special_3');
          }
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    background: #fff;

    .title {
      padding: left;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        height: 57px;
        width: 57px;
        margin-right: 10px;
        border: 1px solid red;
        background: url('57.png') left top no-repeat;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);

          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position absolute
          right 0
          bottom 12px
          
        }
      }
    }
  }
}
</style>