const Todo=require('../models/Todo.js');
const auth= require('../middleware/auth.js');
const express = require("express");
const router = express.Router();

// Get user todos
router.get('/', auth, async (req, res) => {
  try {
    // Ensure req.user is defined
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

module.exports= router;