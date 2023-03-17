***<h2 style="text-align: center;">FeNewsAPI</h2>***
***
***
***

## News API with Node.js, Koa and MongoDB


The FeNewsApi is easy-to-use REST API delivering news data in handy JSON format. The API comes with a two news HTTP GET endpoints along with a few parameters you can use to narrow down your news data results. The endpoint `/fenews/filter` allows you to filter the news by date and/or title, while `/fenews/sort` allows you to sort ascending and descending by date and/or title of the news. The news contains information about id, title, short description and link to the full article.  

To get started right away, you don't need an account or API key. Just chose your endpoint and start testing the API.

Your request should start with the character `'?'` and if you use two parameters together you should use betweenn them the character `'&'`.


## API Features

___

Down below you will find the optional parameters you can use to sort and filter the results. If you don't add any parameters, you will see all news that are available, no matter of the endpoint you chose.

+ ### Filter endpoint


| Object | Description |
| ------ | ----------- |
| `exactDate`    | Use this parameter to filter news by the exact date you want to. The date should be in format YYY-MM-DD and be correct date. The 'exactDate' can't be used together with 'from' and 'to'!'. You can use it together with 'title' parameter. It is an optional parameter. |
| `exactDate`    | Use this parameter to filter news by the exact date you want to. The date should be in format YYY-MM-DD and be correct date. The 'exactDate' can't be used together with 'from' and 'to'!'. You can use it together with 'to' and/or 'from' parameter. It is an optional parameter. |
| `title`   | Use this parameter to filter news by word in the news title. You can use a word between 3 and 30 characters. It is an optional parameter |
| `from` | Use this parameter to filter news by the date you want to start from. The date should be in format YYY-MM-DD and be correct date. For example you should not use 2023-33-32. It is an optional parameter. |
| `to`    | Use this parameter to filter news by the date you want to start from. The date should be in format YYY-MM-DD and be correct date. For example you should not use 2023-33-32. It is an optional parameter. |
| `exactDate`    | Use this parameter to filter news by the exact date you want to. The date should be in format YYY-MM-DD and be correct date. The 'exactDate' can't be used together with 'from' and 'to'!'. You can use it together with 'title' parameter. It is an optional parameter. |

+ Example:
   
`fenews/filter?exactDate=2022-12-05&title=survey` - you will get an article with exact date 2022-12-05 and contains in the title word the 'survey':

```json
{
"_id": "64111d538688b233a39f3747",
"title": "Survey reveals how Australians were affected by the start of COVID-19",
"description": "A new report reveals how the first year of the COVID-19 pandemic impacted Australians, as many of us received government income support, worked from home under lockdown, watched more TV and worried over an uncertain future.",
"content": "https://phys.org/news/2022-12-survey-reveals-australians-affected-covid-.html",
"publishedAt": "2022-12-05T00:00:00.000Z",
"__v": 0
}
```

+ ### Sort endpoint


| Object | Description |
| ------ | ----------- |
| `title`    | Use this parameter to sort news by title ascending or descending. The values that are allowed are 'asc', and 'desc'  You can use it together with 'date' parameter. It is an optional parameter. |
| `date`    | Use this parameter to sort news by date ascending or descending. The values that are allowed are 'asc', and 'desc'  You can use it together with 'title' parameter. It is an optional parameter. |

+ Example:
   
`fenews/sort?title=asc` - you will get the news sorted ascending by the first word of their title:

```json
{
"_id": "64111d538688b233a39f3755",
"title": "Accacia tackles the real estate industry’s massive carbon emissions problem",
...
},
{
"_id": "64111d538688b233a39f3771",
"title": "Amid growing concerns from third-party developers, Twitter shuts down Toolbox and other projects",
...
},
{
"_id": "64111d538688b233a39f3753",
"title": "Antarctic ice: A better knowledge of the ocean improves the predictability of sea ice variability",
...
},
{
"_id": "64111d538688b233a39f376f",
"title": "Apple advances user security with powerful new data protections",
...
},
{
"_id": "64111d538688b233a39f376b",
"title": "Apple's revamped App Store pricing allows $0.29 software",
...
},
```
