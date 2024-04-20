const Todos = require('../Models/Todos');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const errorMessages = require('../constants/errorMessages');
const infoMessages = require('../constants/infoMessages');
const { sendSMS } = require('../services/sms');

const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    req.body._id = uuidv4();
    const newTodo = new Todos(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message, metadata: err.stack });
  }
}

const fetch = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const sortOrder = req.query.sort === 'ASC' ? { createdAt: 1 } : { createdAt: -1 };
    const data = await Todos.find({}).sort(sortOrder);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, metadata: err.stack });
  }
}

const getById = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: errorMessages.TODO_NOT_FOUND });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message, metadata: err.stack });
  }
}

async function update(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: errorMessages.TODO_NOT_FOUND });
    }

    const { text, done } = req.body;
    if (text) {
      todo.text = text;
    }

    if (typeof done === 'boolean') {
      todo.done = done;
      if (done) sendSMS(todo.text);
    }

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message, metadata: err.stack });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: errorMessages.TODO_NOT_FOUND });
    }
    res.status(200).json({ message: infoMessages.TODO_DELETED });
  } catch (err) {
    res.status(500).json({ error: err.message, metadata: err.stack });
  }
}

module.exports = {
  create,
  fetch,
  getById,
  update,
  deleteTodo
};
