import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTodos([newTask, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTask = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm addTask={addTask} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
