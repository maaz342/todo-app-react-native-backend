const Todo = require('../models/Todo.js');
const auth = require('../middleware/auth.js');
const express = require("express");
const router = express.Router();

// Get all to-dos for the authenticated user
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

// Add a new to-do for the authenticated user
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

// Edit a to-do for the authenticated user
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    // Find the to-do by id and userId (to ensure the user is the owner)
    let todo = await Todo.findOne({ _id: req.params.id, userId });

    if (!todo) {
      return res.status(404).json({ msg: 'To-do not found' });
    }

    // Update the task
    todo.task = req.body.task || todo.task;

    // Save the updated to-do
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a to-do for the authenticated user
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    // Find the to-do by id and userId (to ensure the user is the owner)
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
