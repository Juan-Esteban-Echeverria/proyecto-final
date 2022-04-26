const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => res.render('index')) //index
router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))
router.get('/buscar', (req, res) => res.render('buscar'))
router.get('/resultado', (req, res) => res.render('resultado'))
router.get('/estado', async (req, res) => res.render('estado'))

module.exports = router