const Koa = require('koa');
const compose = require('koa-compose');
const fs = require('mz/fs');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
var router = new Router();

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

/*

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
*/

/*
app.use(async function(ctx, next){
    console.log('>> one');
    await next();
    console.log('<< one')
});

app.use(async function(ctx, next){
    console.log('>> two');
    ctx.body = 'two';
    //await next();
    console.log('<< two')
});

app.use(async function(ctx, next){
    console.log('>> three');
    await next();
    console.log('<< three')
});
*/

/*
app.use(async function(ctx,next){
    const paths = await fs.readdir('docs');
    const files = await Promise.all(paths.map(path => fs.readFile(`docs/${path}`, 'utf8')));

    ctx.type = 'markdown';
    ctx.body = files.join(' ');
});
*/

//Debugging Koa
//DEBUG=koa* node --harmony index.js

/*
const publicFiles = serve(path.join(__dirname,'public'));
publicFiles._name = 'static /public';

app.use(publicFiles);
*/

router.get('/', (ctx, next) => {
    ctx.body = "home";
});

router.get('/users', (ctx, next) => {
    ctx.body = "users";
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);