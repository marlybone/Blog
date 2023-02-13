const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hi, this is articles')
})

module.exports = router