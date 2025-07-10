const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: req.user.userId, // Attach the logged-in user's ID
    });

    await newTask.save();

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error("❌ Task creation error:", err); // 👈 Add this line
    res.status(500).json({ message: "Task creation failed" });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the task belongs to the logged-in user
    const task = await Task.findOne({ _id: id, user: req.user.userId });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    // Update fields
    task.title = title || task.title;
    task.description = description || task.description;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};


// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Only delete if the task belongs to the user
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };