const express = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User.model.js');
const router = express.Router();



//Quand mon utilisateur n'a pas encore de compte
router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

const salt = bcryptjs.genSaltSync(10);

router.post('/signup', (req, res, next) => {
    const {
        username,
        password
    } = req.body;

    
    const passwordHashed = bcryptjs.hashSync(password, salt);
  
    
     if(username==="" || password===""){
        res.render('auth/signup', {
            errorMessage: 'Vides'
        })
        return;
    }else if(username === username){
        res.render('auth/signup', {
            errorMessage: 'Déjà pris'
        })
    }
    //else if(username === username){
      //  res.render('auth/signup', {
        //    errorMessage: 'Deja pris'
        //})
        //return;   
   // }


    User.create({
        username: username,
        password: passwordHashed
    }).then(newUser => {
        res.send('ouiiiiiiiiii')
    }).catch(err => next(err))
})




//Quand mon utilisateur a déjà un compte enregistré
router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', (req, res, next) => {
    const {
        username,
        password
    } = req.body
    if (!username || !password) {
        res.render('auth/login', {
            errorMessage: "Please fill in all the fields"
        });
        return;
    }


    User.findOne({
        username: username
    }).then(user => {
        if (!user) {
            res.render('auth/login', {
                errorMessage: "Incorrect email/password",
            })
            return;
        }
        if (bcryptjs.compareSync(password, user.password)) { //user.password = user de la base de données
            req.session.user = user;
            res.send("loggued !")
        } else {
            res.render('auth/login', {
                errorMessage: 'Incorrect email/password'
            })
        }
    }).catch(err => next(err))
})




router.get('/private', (req, res, next) => {
    res.render('auth/private', {
        user: req.session.user
    })
})

router.get('/main', (req, res, next) => {
    res.render('auth/main')
})


module.exports = router;