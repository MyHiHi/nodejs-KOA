var router = require('koa-router')();
var mongoDB = require('../../module/myMongo')
var md5 = require('md5')
router.get('/' ,async (ctx)=>{
    
    await ctx.render('admin/login')
}).post('/doLogin',async (ctx)=>{
    var username = ctx.request.body.username
    var password =  md5(ctx.request.body)

    var r= await mongoDB.find('user',{username,password})
    if (r.length>0){
        ctx.session.userinfo=true
        await ctx.redirect('/admin')
    }else{
        ctx.body="<script>alert('用户名或密码不正确')</script>"
        await ctx.redirect('/admin/login')
    }
    
})

module.exports = router.routes();
