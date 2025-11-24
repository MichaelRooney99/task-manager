import React, { useState } from "react";
import "./task-manager.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design wireframes",
      category: "Design",
      completed: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Build React components",
      category: "Development",
      completed: true,
      priority: "high"
    },
    {
      id: 3,
      title: "Write documentation",
      category: "Documentation",
      completed: false,
      priority: "medium"
    }
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Development");
  const [selectedPriority, setSelectedPriority] = useState("medium");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          category: selectedCategory,
          completed: false,
          priority: selectedPriority
        }
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length
  };

  return (
    <div className="kiosk-container" role="main">
      {/* Animated particles */}
      <div className="particles" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              left: `${10 + i * 20}%`,
              animation: `float${i} 25s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="task-manager-container">
        {/* Back to Portfolio Button */}
        <a
          href="https://michaelrooney.dev"
          className="back-to-portfolio"
          aria-label="Back to Portfolio"
        >
          ← Portfolio
        </a>

        {/* Header */}
        <div className="header">
          <h1>Task Manager</h1>
          <p>Stay organized and productive</p>
        </div>

        {/* Stats Cards */}
        <div
          className="stats-container"
          role="region"
          aria-label="Task statistics"
        >
          {[
            { label: "Total Tasks", value: stats.total, icon: "📋" },
            { label: "Active", value: stats.active, icon: "⚡" },
            { label: "Completed", value: stats.completed, icon: "✅" }
          ].map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div
                className="stat-icon"
                role="img"
                aria-label={`${stat.label} icon`}
              >
                {stat.icon}
              </div>
              <div className="stat-value" aria-live="polite">
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        <div
          className="glass-card add-task-section"
          role="region"
          aria-labelledby="add-task-heading"
        >
          <h2 id="add-task-heading">➕ Add New Task</h2>
          <div className="task-form">
            <label htmlFor="new-task-input" className="sr-only">
              Task title
            </label>
            <input
              id="new-task-input"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Enter task title..."
              aria-label="Enter task title"
              className="task-input"
            />
            <div className="form-row">
              <label htmlFor="task-category" className="sr-only">
                Category
              </label>
              <select
                id="task-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Select task category"
                className="form-select"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Documentation">Documentation</option>
                <option value="Testing">Testing</option>
                <option value="Meeting">Meeting</option>
              </select>
              <label htmlFor="task-priority" className="sr-only">
                Priority
              </label>
              <select
                id="task-priority"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                aria-label="Select task priority"
                className="form-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button
                onClick={addTask}
                aria-label="Add task"
                className="btn btn-primary"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          className="filter-container"
          role="group"
          aria-label="Filter tasks"
        >
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              aria-label={`Show ${f} tasks`}
              className={`btn-filter ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div
          className="task-list"
          role="region"
          aria-labelledby="task-list-heading"
          aria-live="polite"
        >
          <h2 id="task-list-heading" className="sr-only">
            Task List
          </h2>
          {filteredTasks.length === 0 ? (
            <div className="glass-card empty-state">
              <div className="empty-icon" role="img" aria-label="No tasks icon">
                📝
              </div>
              <p className="empty-text">No tasks found</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="glass-card task-card">
                <label htmlFor={`task-${task.id}`} className="sr-only">
                  {task.completed
                    ? "Mark task as incomplete"
                    : "Mark task as complete"}
                </label>
                <input
                  id={`task-${task.id}`}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark "${task.title}" as ${
                    task.completed ? "incomplete" : "complete"
                  }`}
                  className="task-checkbox"
                />
                <div className="task-content">
                  <h3
                    className={`task-title ${
                      task.completed ? "completed" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="task-tags">
                    <span
                      className="task-tag category"
                      role="text"
                      aria-label={`Category: ${task.category}`}
                    >
                      {task.category}
                    </span>
                    <span
                      className={`task-tag priority-${task.priority}`}
                      role="text"
                      aria-label={`Priority: ${task.priority}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete task "${task.title}"`}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
