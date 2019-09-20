const router = require('express').Router();
const usersDB = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

router.post('/register', (req, res) => {
    // implement registration
    const {username, password} = req.body;
    const hash = bcrypt.hashSync(password, 8);
    if (username && password) {
        usersDB('users').insert({username: username, password: hash})
            .then(([id]) => res.status(201).json(id))
            .catch(err => res.status(500).json({error: "Server could not register a user"}))
    } else {
        res.send(401).json('Invalid credentials')
    }

});

router.post('/login', (req, res) => {
    // implement login
    const {username, password} = req.body;
    if (username && password) {
        usersDB('users').where({username})
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user);
                    res.status(200).json({
                        message: `${user.username}! was logged in`,
                        token
                    });
                }else {
                    res.status(401).json({message: 'Invalid Credentials'});
                }
            })
            .catch(err => res.status(500).json({error: "Server could not verify the user"}))
    } else {
        res.send(401).json('Invalid credentials')
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
