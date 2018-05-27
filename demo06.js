var koa = require('koa')
var app = new koa()
var router = require('koa-router')()
var views = require('koa-views')
var bodyParser = require('koa-bodyparser')

var static  = require('koa-static')
// console.log(__dirname+'/static')
app.use(static(__dirname+'/static'))
app.use(bodyParser())
app.use(views('views',{extension:'ejs'}))
app.use(async (ctx,next)=>{
    ctx.state={"name":"Poly"}
    await next();
})
router.get('/login',async (ctx)=>{
    await ctx.render('login')
})
router.post('/doAdd',async (ctx)=>{
    // console.log(ctx.request.body)
    ctx.body  = ctx.request.body
    // ctx.body=JSON.stringify(ctx.request.body)
})
app.use(router.routes()).use(router.allowedMethods)
app.listen(4000)