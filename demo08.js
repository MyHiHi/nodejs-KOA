var koa = require('koa')
var app = new koa()
var router = new require('koa-router')()
var render = require('koa-art-template')
var path = require('path')
var md5 = require('md5')
const session = require('koa-session')
var bodyParser = require('koa-bodyparser')
app.keys = ['some secret hit'];
const CONFIG = {
    key:'koa:sess',
    maxAge:1000*60*60*24,
    httpOnly:false,
    overwrite:true,
    rolling: false,
    renew:true,
    signed:true
}
app.use(session(CONFIG,app))

app.use(bodyParser()) 
render(app,{
    root:path.join(__dirname,'views'),
    extname:'.ejs',
    debug:true
})

app.use(async (ctx,next)=>{
    if (ctx.url == '/login' || ctx.url == '/doLogin'){
        next();
    }else if (ctx.cookies.get('name')){
        ctx.state = {
            name: new Buffer(ctx.cookies.get('name'),'base64').toString(),
            pwd : ctx.cookies.get('pwd')
        }
    //    await ctx.redirect('/show')
         next();
    }else{
           await ctx.redirect('/login')
    }
})


router.get('/login',async (ctx)=>{
    await ctx.render('login')
})
router.post('/doLogin',async (ctx)=>{

    var name = ctx.request.body.name
    var pwd = md5(ctx.request.body.pwd)

    var newName = new Buffer(name).toString('base64')
    ctx.cookies.set("name",newName,{
        maxAge:1000*60*60,
        // path:'/news',只有news可以访问
    });
    // console.log(newName,'*******')
    ctx.session={
        "flag":true,
        "time":new Date()
    }
    ctx.cookies.set("pwd",pwd,{maxAge:1000*60*60});
   await ctx.redirect('/show')
})

router.get('/show',async (ctx)=>{
    console.log(ctx.session.flag,"******************",ctx.session.time)
    ctx.render('show')
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)