const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: "6869558f6cc6822c9633d1b0", // 👈 hardcoded for now
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
    const tasks = await Task.find();
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

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, user: "6869558f6cc6822c9633d1b0" },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
