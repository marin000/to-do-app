const express = require('express');
const todosController = require('./controllers/todos');
const todosValidator = require('./validators/todos');
const router = express.Router();

router.post('/api/todos', todosValidator.validate('create'), todosController.create);
router.get('/api/todos', todosValidator.validate('fetch'), todosController.fetch);
router.get('/api/todos/:id', todosValidator.validate('checkId'), todosController.getById);
router.patch('/api/todos/:id', todosValidator.validate('update'), todosController.update);
router.delete('/api/todos/:id', todosValidator.validate('checkId'), todosController.deleteTodo);

module.exports = router;