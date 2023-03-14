
const Koa = require('koa');
const Router = require('koa-router');
const databaseInit = require('./config/databaseInit');
const seedDbFromJson = require('./services/databaseService');
const json = require('koa-json');
const newsService = require('./services/newsService');



//If there is no need of seed uncomment databaseInit() and comment seedDbFromJson();

seedDbFromJson();
//databaseInit();


const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
    const title = ctx.query.title;
    const from = new Date(ctx.query.from);
    const to = new Date(ctx.query.to);
    let news = await newsService.getAll();

    //TODO use db filtration instead of inmemory filtering
    try {
        if (title) {
            await news.filter(news => news.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (from) {
            news = news.filter(news => news.publishedAt >= from);
        }
        if (to) {
            news = news.filter(news => news.publishedAt <= to);
        }

        const filteredDate = newsService.filterDate(from, to);

        console.log(filteredDate);
        console.log(news.publishedAt);
        ctx.body = news;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: err.message };
    }
    (next);
});
router.get('/news', async ctx => {
    try {
        const publications = await newsService.getAll();
        ctx.body = publications;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: err.message };
    }
});


app.use(json());
app.use(router.routes());


router.get('/test', ctx => (ctx.body = 'Hello from Test'));



app.listen(3000, () => console.log('Server is listening...'));
