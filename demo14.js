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


router.get('/', async (ctx)=>{
    var list = await demo.find('user',{})
    console.log(list)
    ctx.render('show',{list:list})
})

router.get('/add',async (ctx)=>{
    ctx.render('add')
})
router.post('/doAdd',async (ctx)=>{
    // console.log(ctx.request.body)
    let f = await demo.insert('user',ctx.request.body)
    // console.log(f.result.ok)
    if (f.result.ok==1){
       await ctx.redirect('/')
    }else{
        await ctx.redirect('/add')
    }
})

router.get('/delete',async (ctx)=>{
    var id = ctx.query.id
    let f = await  demo.remove('user',{"_id":demo.getObjectId(id)})
    if (f.result.ok==1){
        ctx.redirect('/')
    }else{
        ctx.body="<script>alert('删除失败!')</script>";
        ctx.redirect('/')
    }
})
router.get('/edit',async (ctx)=>{
    var id = ctx.query.id;
    var data = await demo.find('user',{"_id":demo.getObjectId(id)});
    // console.log(data)
    await ctx.render('edit',{list:data[0]})
}).post('/doEdit',async (ctx)=>{
    var data = ctx.request.body
    // console.log(data)
    var id = data.id,username = data.username,age = data.age;
    var f = await demo.update('user',{"_id":demo.getObjectId(id)},{username,age});
    if (f.result.ok==1){
        ctx.redirect('/')
    }else{
        ctx.redirect('/add')
    }
})


app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)