const express = require('express');
const app = express();
const markdown = require('markdown-it')
const fs = require('fs')
const path = require('path');
const mimeTypes = require('mime-types');
const marked = require('marked');

var publicDir = require('path').join(__dirname,'/public');
const directoryPath = path.join(__dirname, '/public/Content');

const fileNames = fs.readdirSync(directoryPath);


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
  app.get('/src/app.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/src/app.js');
  });
  
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('index', { articles: articles })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.post('/index', (req, res) => {

})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});