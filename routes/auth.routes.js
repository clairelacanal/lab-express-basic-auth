const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model.js');
const router = express.Router();

router.get('/signup',(req, res, next) => {
    res.render('auth/signup')
})

const salt = bcryptjs.genSaltSync(10);

router.post('/signup',(req,res,next) => {
    const {username, password } = req.body;
    
    const passwordHashed = bcryptjs.hashSync(password, salt);

    User.create({
        username: username,
        password: passwordHashed
    }).then(newUser => {
        res.send('ouiiiiiiiiii')
    }).catch(err => next(err));
})
module.exports = router;