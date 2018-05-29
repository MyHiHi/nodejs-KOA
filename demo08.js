var koa = require('koa')
var app = new koa()
var router = new require('koa-router')()
var render = require('koa-art-template')
var path = require('path')
var md5 = require('md5')
const session = require('koa-session')
var bodyParser = require('koa-bodyparser')
var demo = require('./demo12')
var static  = require('koa-static')
app.use(static(__dirname+'/static'))
app.keys = ['some secret hit'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: false,
    overwrite: true,
    rolling: false,
    renew: true,
    signed: true
}
app.use(session(CONFIG, app))

app.use(bodyParser())
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.ejs',
    debug: true
})

app.use(async (ctx, next) => {
    if (ctx.url == '/login' || ctx.url == '/doLogin') {
        next();
    } else if (ctx.cookies.get('name')) {
        ctx.state = {
            name: new Buffer(ctx.cookies.get('name'), 'base64').toString(),
            pwd: ctx.cookies.get('pwd')
        }
        //    await ctx.redirect('/show')
        next();
    } else {
        await ctx.redirect('/login')
    }
})


router.get('/login', async (ctx) => {
    await ctx.render('login')
})
router.post('/doLogin', async (ctx) => {

    var name = ctx.request.body.name
    var pwd = md5(ctx.request.body.pwd)

    var newName = new Buffer(name).toString('base64')

    ctx.cookies.set("name", newName, {
        maxAge: 1000 * 60 * 60,
        // path:'/news',只有news可以访问
    });
    // console.log(newName,'*******')
    ctx.session = {
        "flag": true,
        "time": new Date()
    }
    ctx.cookies.set("pwd", pwd, { maxAge: 1000 * 60 * 60 });
    await ctx.redirect('/show')
})

router.get('/show', async (ctx) => {
    // demo.insert('user1',[{pkID:ctx.cookies.get('name'),status:1},{pkID:"秘密"},{pkID:"selected"}])
    demo.update('user1',{pkID:"selected"},{pkID:"www.baidu.cn"})
    // var result = await demo.find('user', { username: new Buffer(ctx.cookies.get('name'), 'base64').toString })
    // console.log(result)
    // console.log(ctx.session.flag, ctx.cookies.get('name'), "******************", ctx.session.time)
    ctx.render('show')
})

router.get('/add',async (ctx)=>{
    ctx.render('add')
})
router.post('/doAdd',async (ctx)=>{
    demo.insert('user1',ctx.request.body)
    ctx.body='ok'
})

router.get('/add',async (ctx)=>{
    demo.insert('user1',{'username':'pkpkpk'})  
    ctx.body = "这是添加页面"  
})
router.get('/delete',async (ctx)=>{
    demo.remove('user1',{pkID:"秘密"})
    ctx.body="这是删除页面"
})
router.get('/edit',async (ctx)=>{
    demo.update('user1',{'username':'pkpk'},{'username':'python'})
    ctx.body="这是编辑页面"
})

router.get('/findy',async (ctx)=>{
    // ctx.body = "ok"
    // var r = await demo.find('user1',{})
    // console.log(r)
    ctx.body = "ff";
    // ctx.render('find',{list:r})
})
// router.get('/find',async (ctx)=>{
//     var r = await demo.find('user1',{})
//     // console.log(r)
// ctx.body="ok"
//     // await ctx.render('find',{list:r})
// })

app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)