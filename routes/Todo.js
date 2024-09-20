const Todo = require('../models/Todo.js');
const auth = require('../middleware/auth.js');
const express = require("express");
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    const newTodo = new Todo({
      task: req.body.task,
      userId,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    let todo = await Todo.findOne({ _id: req.params.id, userId });

    if (!todo) {
      return res.status(404).json({ msg: 'To-do not found' });
    }

    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId });

    if (!todo) {
      return res.status(404).json({ msg: 'To-do not found' });
    }

    res.json({ msg: 'To-do deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
