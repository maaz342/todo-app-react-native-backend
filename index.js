const express = require("express");
const connectDB= require('./config/db.js');
const authRoutes= require( './routes/auth.js');
const todoRoutes= require('./routes/Todo.js');

const app = express();

connectDB();

// Init Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));