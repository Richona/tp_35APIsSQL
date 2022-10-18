const express = require('express');
const router = express.Router();
const {list, newest, recomended, getById, create, update, destroy} = require('../controllers/moviesController');

router
    .get('/', list)
    .get('/new', newest)
    .get('/recommended', recomended)
    .get('/:id', getById)
//Rutas exigidas para la creación del CRUD
    .post('/', create)
    .patch('/:id', update)
    //.put('/:id', update)
    .delete('/:id', destroy)

module.exports = router;