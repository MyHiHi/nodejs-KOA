var koa = require('koa')
var app = new koa()
var router = new require("koa-router")()
var render = require('koa-art-template')
var path = require('path')
render(app,{
    root:path.join(__dirname,"views"),
    extname:'.html',
    debug: process.env.NODE_ENV !== 'production'
})

router.get('/',async (ctx)=>{
    var data = {
        name:"小华",
        arr:["apple","suger","watermelen"]
    }
    ctx.cookies.set('name','Poly',{maxAge:60*1000*60})
    ctx.render('index',{data:data})
})

router.get('/show',async (ctx)=>{
    data={
        name:"Python",
        list:["apple","Baze","Amer"],
        h:'<h1>我是H1</h1>',
        num:23,
        "name":ctx.cookies.get("name")
    }
    console.log('**********',ctx.cookies.get("name"))
    ctx.render('myBase',{data:data})    
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)


