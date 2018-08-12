var router = require('koa-router')();

var login =require('./admin/login');
var user = require('./admin/user');

router.use(async (ctx,next)=>{
    var url = ctx.url;
    ctx.state.__HOST__='http://'+ctx.request.header.host;
 
    console.log(ctx.url)
    if(url=='/admin/login' || url=='/admin/login/doLogin' || ctx.session.userinfo ){
        await next();
    }else{
        await ctx.redirect('/admin/login')
    }
   
})
router.get('/' ,async (ctx)=>{
    await ctx.render('admin/index')
})

router.use('/login',login);
router.use('/user',user);


module.exports = router.routes();
