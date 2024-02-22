const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
    res.send("Hello Auth");
});

module.exports = router