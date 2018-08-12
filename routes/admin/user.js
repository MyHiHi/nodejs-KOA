var router = require('koa-router')();
router.get('/' ,async (ctx)=>{
    // ctx.body = 'user';
    await ctx.render('admin/user/list')
})

router.get('/add' ,async (ctx)=>{
    await  ctx.render('admin/user/add');
})
router.get('/edit' ,async (ctx)=>{
    ctx.body = 'admin/user/edit';
})
router.get('/delete' ,async (ctx)=>{
    ctx.body = 'admin/user/delete';
})



module.exports = router.routes();
