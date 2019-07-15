var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var app = new koa();
const routers = require('./router')

// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
const cors = require('koa2-cors');

app
    .use(bodyParser())
    .use(cors())
    .use(routers.routes())
    .use(routers.allowedMethods());
    
 app.listen(4000, () => {
    console.log('sever is running at 4000')
});