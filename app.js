var koa  = require('koa');
var router =require('koa-router')();
var app =new  koa();
var render = require('koa-art-template')
var path = require('path');
var static = require('koa-static');
var bodyParser  = require('koa-bodyparser')

var index = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api');
var session = require('koa-session');

app.use(bodyParser())
render(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug:true
})
const CONFIG = {
    key:"koa:session",
    maxAge: 60*1000*60,
    overwrite:true,
    httpOnly:true,
    signed:false,
    rolling:true,
    renew:false
}
app.use(session(CONFIG,app))
app.use(static(__dirname+"/public"));
router.use('/admin',admin);
router.use('/api',api);
router.use(index);

app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);