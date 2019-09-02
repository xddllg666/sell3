const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = '/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

// 随机生成文章数据
const produceNewsData = req => {
  
    console.log(req) // 请求体，用于获取参数
  
    let posts = [] // 用于存放文章数据的数组
    
    for (let i = 0; i < 10; i++) {
      let post = {
        goods: Random.csentence(5), // 随机生成长度为10-25的标题
        seller: Random.cname(), // 随机生成名字
        ratings: Random.csentence(10, 15), // 随机生成长度为10-25的评论
        bulletin:Random.csentence(35,40),
      }
  
      posts.push(post)
    }
    
    // 返回状态码和文章数据posts
    return {
      code,
      posts:posts
    }
  }
  
  // 定义请求链接，类型，还有返回数据
  Mock.mock(`${domain}/posts`, 'post', produceNewsData);
  // /api/posts
