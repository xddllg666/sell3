const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = '/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码


const produceNewsData = req => {
  
    console.log(req) // 请求体，用于获取参数
    var appData = require('../../data.json');
    var seller = appData.seller;
    var goods = appData.goods;
    var ratings = appData.ratings;
    
    // 返回状态码和文章数据posts
    return {
      code,
      seller:seller,
      goods:goods,
      ratings:ratings,                  
    }
  }
  
  // 定义请求链接，类型，还有返回数据
  Mock.mock(`${domain}/posts`, 'post', produceNewsData);
  // /api/posts
