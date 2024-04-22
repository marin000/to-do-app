const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const config = require('../config/index');
const Todos = require('../Models/Todos');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

describe('Test api endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Todos.deleteMany();
  });

  it('Should create a new todo', async () => {
    const todoData = {
      text: 'Test Todo'
    };

    const response = await request(app)
      .post('/api/todos')
      .send(todoData)
      .expect(201);

    expect(response.body).toMatchObject(todoData);

    const todoInDB = await Todos.findOne({ text: 'Test Todo' });
    expect(todoInDB).toBeTruthy();
  });

  it('Should fetch all todos in descending order by default', async () => {
    const todo1 = await Todos.create({ _id: uuidv4(), text: 'Todo 1', createdAt: moment().subtract(3, 'days') });
    const todo2 = await Todos.create({ _id: uuidv4(), text: 'Todo 2', createdAt: moment().subtract(2, 'days') });
    const todo3 = await Todos.create({ _id: uuidv4(), text: 'Todo 3', createdAt: moment().subtract(1, 'days') });

    const response = await request(app)
      .get('/api/todos')
      .expect(200);

    const fetchedTodos = response.body;
    expect(fetchedTodos).toHaveLength(3);
    expect(fetchedTodos[0]._id).toEqual(todo3._id.toString());
    expect(fetchedTodos[1]._id).toEqual(todo2._id.toString());
    expect(fetchedTodos[2]._id).toEqual(todo1._id.toString());
  });

  it('Should fetch all todos in ascending order when sort=ASC is provided', async () => {
    const todo1 = await Todos.create({ _id: uuidv4(), text: 'Todo 1', createdAt: moment().subtract(3, 'days') });
    const todo2 = await Todos.create({ _id: uuidv4(), text: 'Todo 2', createdAt: moment().subtract(2, 'days') });
    const todo3 = await Todos.create({ _id: uuidv4(), text: 'Todo 3', createdAt: moment().subtract(1, 'days') });

    const response = await request(app)
      .get('/api/todos?sort=ASC')
      .expect(200);

    const fetchedTodos = response.body;
    expect(fetchedTodos).toHaveLength(3);
    expect(fetchedTodos[0]._id).toEqual(todo1._id.toString());
    expect(fetchedTodos[1]._id).toEqual(todo2._id.toString());
    expect(fetchedTodos[2]._id).toEqual(todo3._id.toString());
  });

  it('Should return 200 and the todo with the specified ID if it exists', async () => {
    const todo = await Todos.create({ _id: uuidv4(), text: 'Test Todo' });
    const response = await request(app).get(`/api/todos/${todo._id}`).expect(200);
    expect(response.body.text).toBe('Test Todo');
  });

  it('Should return 404 if the todo with the specified ID does not exist', async () => {
    const nonExistingId = uuidv4();

    const response = await request(app)
      .get(`/api/todos/${nonExistingId}`)
      .expect(404);

    expect(response.body.error).toBe('Todo not found!');
  });

  it('Should return 403 if request parameters are invalid', async () => {
    const response = await request(app)
      .get('/api/todos/invalid_id')
      .expect(403);

    expect(response.body.errors[0].msg).toBe('Invalid UUID');
  });

  it('Should update the text of a todo', async () => {
    const todo = await Todos.create({ _id: uuidv4(), text: 'Sample Todo', done: false });
    const newText = 'Updated Todo Text';
    const response = await request(app)
      .patch(`/api/todos/${todo._id}`)
      .send({ text: newText })
      .expect(200);

    expect(response.body.text).toBe(newText);
  });

  it('Should update the done status of a todo', async () => {
    const todo = await Todos.create({ _id: uuidv4(), text: 'Sample Todo', done: false });
    const response = await request(app)
      .patch(`/api/todos/${todo._id}`)
      .send({ done: true })
      .expect(200);

    expect(response.body.done).toBe(true);
  });

  it('Should return 404 if the todo ID does not exist', async () => {
    const nonExistingId = uuidv4();
    const response = await request(app)
      .patch(`/api/todos/${nonExistingId}`)
      .send({ text: 'Updated Text' })
      .expect(404);

    expect(response.body.error).toBe('Todo not found!');
  });

  it('Should return 403 if the request body is invalid', async () => {
    const todo = await Todos.create({ _id: uuidv4(), text: 'Sample Todo', done: false });
    const response = await request(app)
      .patch(`/api/todos/${todo._id}`)
      .send({ text: '0' })
      .expect(403);

    expect(response.body.errors[0].msg).toBe('Text is too short! Min 3 characters.');
  });

  it('Should delete a todo by ID', async () => {
    const todo = await Todos.create({ _id: uuidv4(), text: 'Test Todo' });

    const response = await request(app)
      .delete(`/api/todos/${todo._id}`)
      .expect(200);

    expect(response.body.message).toBe('Todo deleted successfully!');

    const deletedTodo = await Todos.findById(todo._id);
    expect(deletedTodo).toBeFalsy();
  });

  it('Should return 404 if the todo to delete does not exist', async () => {
    const nonExistingId = uuidv4();

    const response = await request(app)
      .delete(`/api/todos/${nonExistingId}`)
      .expect(404);

    expect(response.body.error).toBe('Todo not found!');
  });

  it('Should return 403 if request parameters are invalid', async () => {
    const response = await request(app)
      .delete('/api/todos/invalid_id')
      .expect(403);

    expect(response.body.errors[0].msg).toBe('Invalid UUID');
  });

});
