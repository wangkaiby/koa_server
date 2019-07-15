var router = require('koa-router')();
var routeFn = require ('./routeFn')

router.prefix('/koaapi')
router.post('/addList', routeFn.saveDate)
router.get('/getList', routeFn.getDate)

module.exports = router