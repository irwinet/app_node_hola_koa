const Koa = require('koa');
const app = new Koa();

/*
//x-response-time
app.use(async (ctx, next) => {
    const start = Date.now(); // 1
    await next(); // 2
    const ms = Date.now() - start; // 8
    ctx.set('X-Response-Time', `${ms}ms`) // 9
});

//logger
app.use(async (ctx, next)=>{
    const start = Date.now(); // 3
    await next(); // 4
    const ms = Date.now() - start; // 6
    console.log(`${ctx.method} ${ctx.url} - ${ms}`) // 7
});

//response
app.use(ctx => {
    ctx.body = 'Hola Mundo!' // 5
});
*/

function logger(format) {
    format = format || ':method ":url"';
    return async function (ctx, next) {
        const str = format.replace(':method', ctx.method)
            .replace(':url', ctx.url);

        console.log(str);
        await next();
    }
}

app.use(logger());
app.use(logger(':method :url'));

app.listen(3000);