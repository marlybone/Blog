const express = require('express');
const app = express();
const markdown = require('markdown-it')
const fs = require('fs')
const path = require('path');
const mimeTypes = require('mime-types');

app.use('/Views', express.static(path.join(__dirname, '/Views'), {
    setHeaders: function (res, path) {
      const mimeType = mimeTypes.lookup(path);
      if (mimeType === 'text/css') {
        res.set('Content-Type', mimeType);
      }
    },
  }));
  app.use(express.static('/src', {
    setHeaders: function (res, path) {
      const mimeType = mimeTypes.lookup(path);
      if (mimeType === 'text/css') {
        res.set('Content-Type', mimeType);
      }
    },
  }));
  
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Views'));

app.get('/', (req, res) => {
    const articles = [{
        title: 'test',
        date: new Date(),
        author: 'Marlon Steffenson',
    }, {
        title: 'test1',
        date: new Date(),
        author: 'Marlon Steffenson', 
    },{
        title: 'test3',
        date: new Date(),
        author: 'Marlon Steffenson', 
    },{
        title: 'test4',
        date: new Date(),
        author: 'Marlon Steffenson', 
    }

]
    res.render('index', { articles: articles })
})

app.post('/index', (req, res) => {

})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});