const Todos = require('../Models/Todos');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

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

const fetch = async (_req, res) => {
  try {
    const data = await Todos.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message, metadata: err.stack });
  }
}

module.exports = {
  create,
  fetch
};
