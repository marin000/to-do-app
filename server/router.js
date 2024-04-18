const express = require('express');
const todosController = require('./controllers/todos');
const todosValidator = require('./validators/todos');
const router = express.Router();

router.post('/api/todos', todosValidator.validate('create'), todosController.create);
router.get('/api/todos', todosController.fetch);

module.exports = router;