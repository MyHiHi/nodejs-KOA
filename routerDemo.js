var Koa = require('koa')
var Router = require('koa-router ')
var app = new Koa()
var router = new Koa.Router()

router.get('/',async (ctx)=>{
    ctx.body = '这是首页'
})
router.get('/news',async (ctx)=>{
    ctx.body = "这是新闻页面"
})

app.use(router.routes())
.use(router.allowMethods()) 
app.listen(4000)