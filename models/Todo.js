const mongoose=require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
