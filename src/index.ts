import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';

const app = new Koa();

app.use(bodyParser());

// Serve static files from the web directory
app.use(serve(path.join(__dirname, '../web')));

// Add /callback route
app.use(async (ctx, next) => {
    if (ctx.path === '/callback') {
        console.log('Request received at /callback:', {
            method: ctx.method,
            headers: ctx.headers,
            body: ctx.request.body,
            query: ctx.query,
        });
        ctx.body = 'Callback received';
    } else {
        await next();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
