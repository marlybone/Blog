const express = require('express');
const router = express.Router();
const Post = require('./../Post/post')

router.get('/', (req, res) => {
    res.send('hi, this is articles')
})

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.get('/:id', (req, res) => {

})

router.post('/', async (req, res) => {
    const post = new Post({
     title: req.body.title,
     description: req.body.description,
     markdown: req.body.markdown,  
    })
    try {
    post = await post.save()
    res.redirect(`/articles/${post.id}`)
    } catch (e) {
        res.render('articles/new', {article: article})
    }
})

module.exports = router