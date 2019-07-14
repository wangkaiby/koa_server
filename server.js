var koa = require('koa');
var router = require('koa-router')();
const ModelDb = require('./operate')
var bodyParser = require('koa-bodyparser');
var app = new koa();

app.use(bodyParser());



// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
// 下面以koa2-cors为例，
const cors = require('koa2-cors');

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/koaapi') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.post('/koaapi', async function (ctx) {
    const obj =ctx.request.body
     await ModelDb.save(obj)
    let data = await ModelDb.query()
    // ctx.response.body = data

    ctx.res.statusCode = '100'
    ctx.res.message = 'ok'
    ctx.body = {'data': data, 'status': ctx.res.statusCode, 'message':ctx.res.message}
});
router.get('/koaList', async function (ctx) {
    let data = await ModelDb.query()
    console.log(data, 333)

    // ctx.response.body = data

    ctx.res.statusCode = '100'
    ctx.res.message = 'ok'
    ctx.body = {'data': data, 'status': ctx.res.statusCode, 'message':ctx.res.message}
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, () => {
    console.log('sever is running at 4000')
});