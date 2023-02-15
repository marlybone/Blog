const express = require('express');
const app = express();
const articleRouter = require('./routes/article')
const mongoose = require('mongoose')


// mongoose.set('strictQuery', false)
// mongoose.connect('mongodb://localhost/blog', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });

    var authRouter = require('./routes/auth');


app.set('view engine', 'ejs')

app.use('/articles', articleRouter)
app.use(express.urlencoded({ extended: false }))
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    const articles = [{
        title:'test',
        date: new Date(),
        description: 'This is a test'
    }]
    res.render('index', {articles: articles})
})

app.listen(5000);

