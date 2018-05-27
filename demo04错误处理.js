var Koa = require('koa')
var app = new Koa()
var router =  require('koa-router')()
// var views = require('koa-views')
// app.use(views('views',{
//     extension:'ejs'
// }))


router.get("/",async (ctx)=>{
//    ctx.render('myIndex')
}).get("/news",async (ctx)=>{
    ctx.body  = "新闻"
})

app.use(async (ctx,next)=>{
    console.log('这是中间件')
    next();
    if (ctx.status==404){
        ctx.body = "不存在的网页"
    }else{
        console.log(ctx.url);
    }
    console.log('这是中间件2')
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(4400)