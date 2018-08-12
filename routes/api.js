var router = require('koa-router')();
router.get('/' ,async (ctx)=>{
    ctx.body = '';
})

module.exports = router.routes();
