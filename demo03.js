var Koa = require('koa')
var app = new Koa()
var router =  require('koa-router')()

app.use(async (ctx,next)=>{
    console.log(new Date());
    await next();
})

router.get('/news',async (ctx)=>{
    ctx.body = "这是新闻"
    // 获取对象：{ name: 'oppot', age: '999' }:同ctx.request.query
    console.log(ctx.query)
    // 获取url后面的字符串：name=oppot&age=999:同ctx.request.querystring
    console.log(ctx.querystring)
    console.log(ctx.request)

}).get("/",async (ctx)=>{
    ctx.body  = "首页"
}).get("/ad/:id",async (ctx)=>{
    console.log(typeof ctx.params)
    ctx.body = ctx.params.id
})

app.use(async (ctx,next)=>{
    console.log('这是下面的中间件')
    await next();
})

function callback(ctx,id){
    ctx.body = "this is "+id
}
router.get("/add/:id",async (ctx)=>{
    var address = await ctx.params.id
    callback(ctx,address)
})
// 启动路由
app.use(router.routes()).use(router.allowedMethods())
app.listen(5600)