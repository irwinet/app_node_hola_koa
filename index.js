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


/*
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
*/

const compose = require('koa-compose');

async function random(ctx, next) {
    if (ctx.path == '/random') {
        ctx.body = Math.floor(Math.random() * 10);
    }
    else {
        await next();
    }
}

async function backwards(ctx, next) {
    if (ctx.path == '/backwards') {
        ctx.body = 'sdrawcab';
    }
    else {
        await next();
    }
}

async function pi(ctx, next) {
    if (ctx.path == '/pi') {
        ctx.body = String(Math.PI);
    }
    else {
        await next();
    }
}

const all = compose([random, backwards, pi]);

app.use(all);

app.listen(3000);