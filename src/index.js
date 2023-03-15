
const Koa = require('koa');
const Router = require('koa-router');
const databaseInit = require('./config/databaseInit');
const seedDbFromJson = require('./services/databaseService');
//const json = require('koa-json');
const newsService = require('./services/newsService');

//If there is no need of seed uncomment databaseInit() and comment seedDbFromJson();

//seedDbFromJson();
databaseInit();


const app = new Koa();
const router = new Router();

router.get('/news', async (ctx) => {
    const title = ctx.query.title;
    const from = ctx.query.from;
    const to = ctx.query.to;
    const exactDate = ctx.query.exactDate;
    let news = await newsService.getAll();

    try {
        //Filtering by title
        if (title) {
            news = news.filter(news => news.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (from) {
            const fromCompare = new Date(from).toISOString().split('T')[0];
            news = news.filter(news => new Date(news.publishedAt).toISOString().split('T')[0] >= fromCompare);
        }
        if (to) {
            const toCompare = new Date(to).toISOString().split('T')[0];
            news = news.filter(news => new Date(news.publishedAt).toISOString().split('T')[0] <= toCompare);
        }
        if (exactDate) {
            const exactDateCompare = new Date(exactDate).toISOString().split('T')[0];
            news = news.filter(news => new Date(news.publishedAt).toISOString().split('T')[0] === exactDateCompare);
        }


    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: err.message };
    }

    ctx.body = news;

});
router.get('/', async ctx => {
    try {
        const news = await newsService.getAll();
        ctx.body = news;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: err.message };
    }
});


//app.use(json());
app.use(router.routes());


router.get('/test', ctx => (ctx.body = 'Hello from Test'));



app.listen(3000, () => console.log('Server is listening...'));
