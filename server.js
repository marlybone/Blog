const express = require('express');
const app = express();
const articleRouter = require('./routes/article')


app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title:'test',
        date: Date.now(),
        description: 'This is a test'
    }]
    res.render('index', {articles: articles})
})

app.listen(5000);

