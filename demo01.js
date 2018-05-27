var Koa = require('koa')
var Router = require('koa-router')
var app = new Koa()
var router = new Router()
router.get('/',async (ctx)=>{
    ctx.body = '这是首页'
})
router.get('/news',async (ctx)=>{
    ctx.body = "这是新闻页面"
    
})
// router.get("",async (ctx)=>{
//     ctx.body = "NNNNot Foound"
// })

app.use(router.routes())
.use(router.allowedMethods()) 

app.listen(4000)