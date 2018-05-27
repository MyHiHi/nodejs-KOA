var Koa = require('koa')
var app = new Koa()
var router =  require('koa-router')()
var views = require('koa-views')
var common = require("./module/common")
app.use(views('views',{
    extension:'ejs'
}))


router.get('/login',async (ctx)=>{
    await ctx.render("login");
}).post('/doAdd',async (ctx)=>{
   var data = await common.getPostData(ctx);
    console.log(data);
    ctx.body = "oks"
})
router.get("/",async (ctx)=>{
    ctx.body  = "首页"
}).get("/news",async (ctx)=>{
    ctx.body  = "新闻"
}).get("/show",async (ctx)=>{
    let arr = ["商品1","商品2","列表1","列表2"]
    let html = "<h1>这是H1</h1>"
   await ctx.render('myIndex',{title:"您好 EJS",
   "list":arr,
    html:html
    })
}).get("/show2",async (ctx)=>{
    await ctx.render("kk")
})

app.use(async (ctx,next)=>{
    ctx.state = {
        "name":"Poly"
    }
    await next();
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)