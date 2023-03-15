
const Koa = require('koa');
const Router = require('koa-router');
const databaseInit = require('./config/databaseInit');
const seedDbFromJson = require('./services/databaseService');
const newsService = require('./services/newsService');

//If there is no need of seed uncomment databaseInit() and comment seedDbFromJson();

//seedDbFromJson();
databaseInit();

const app = new Koa();
const router = new Router();

router.get('/fenews/filter', async (ctx) => {
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
        //Filter by start date
        if (from) {
            const fromCompare = new Date(from).toISOString().split('T')[0];
            news = news.filter(news => new Date(news.publishedAt).toISOString().split('T')[0] >= fromCompare);
        }
        //Filer by end Date
        if (to) {
            const toCompare = new Date(to).toISOString().split('T')[0];
            news = news.filter(news => new Date(news.publishedAt).toISOString().split('T')[0] <= toCompare);
        }
        //Filter by exact date
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
router.get('/fenews/sort', async (ctx) => {
    const titleSort = ctx.query.title;
    const date = ctx.query.date;
    let news = await newsService.getAll();

    try {
        //Sort by title
        if (titleSort == 'asc') {
            news = news.sort((a, b) => {
                const aFirstWord = a.titleSort.split(/[\s]+/, 1)[0].replace(/^['‘"]+|['‘"]+$/g, '');
                const bFirstWord = b.titleSort.split(/[\s,]+/, 1)[0].replace(/^['‘"]+|['‘"]+$/g, '');
                return aFirstWord.toLowerCase() < bFirstWord.toLowerCase()
                    ? -1
                    : 1;
            });
        } else if (titleSort == 'desc') {
            news = news.sort((a, b) => {
                const aFirstWord = a.titleSort.split(/[\s]+/, 1)[0].replace(/^['‘"]+|['‘"]+$/g, '');
                const bFirstWord = b.titleSort.split(/[\s,]+/, 1)[0].replace(/^['‘"]+|['‘"]+$/g, '');
                return aFirstWord.toLowerCase() > bFirstWord.toLowerCase()
                    ? -1
                    : 1;
            });

        }
        //Sort by date
        if (date == "asc") {
            news = news.sort((a, b) => {
                return a.publishedAt < b.publishedAt
                    ? -1
                    : 1;
            });
        } else if (date == 'desc') {
            news = news.sort((a, b) => {
                return a.publishedAt < b.publishedAt
                    ? 1
                    : -1;
            });
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: err.message };
    }

    ctx.body = news;

});

app.use(router.routes());

app.listen(3000, () => console.log('Server is listening...'));
