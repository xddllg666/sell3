import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login1',
      // redirect:'/login',这个存在意义不大,刚进去的时候就这样
      // path:'/',redirect:'/login'}
      component: Login
    },

   
    {
      path: '/goodsgoodsgoodsgoodsgoodsgoodsgoods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratingsratingsratingsratingsratingsratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/sellersellersellersellersellerseller',
      name: 'seller',
      component: Seller
    }
  ]



})




