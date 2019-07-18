var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var app = new koa();
const routers = require('./router')
var errorHandle = require('./middleware/errorHandle')
var koajwt = require('koa-jwt');


// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
const cors = require('koa2-cors');

app
    .use(cors())
    .use(bodyParser())

    .use(errorHandle) // Custom 401 handling if you don't want to expose koa-jwt errors to users   
    .use(koajwt({secret: 'my_token'}).unless({
        path: [/\/koaapi/, /\/login/],
      })) // Middleware below this line is only reached if JWT token is valid

    .use(routers.routes())
    .use(routers.allowedMethods())


app.listen(4000, () => {
    console.log('sever is running at 4000')
});