const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/cadastro.html'));
});

router.get('/desktop', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/desktop.html'));
});

module.exports = router;
