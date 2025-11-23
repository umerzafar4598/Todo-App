import { useState } from "react";
import InputArea from "./InputArea";
import TodoItem from "./TodoItem";

export default function ToDoCard() {
  const [todos, setTodos] = useState([]);

  // -----------------------------
  // ADD NEW TODO + AUTO SORT
  // -----------------------------
  function addTodo(inputData) {
    const newTodo = {
      id: Date.now(),
      title: inputData.title,
      deadline: inputData.date,
      done: false,
    };

    setTodos((prev) => {
      const updated = [...prev, newTodo];

      // Sort by date (closest deadline first)
      updated.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );

      return updated;
    });
  }

  // -----------------------------
  // DELETE TODO
  // -----------------------------
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // -----------------------------
  // MARK AS DONE + SORT AGAIN
  // -----------------------------
  function markTodoDone(id) {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );

      // Put unfinished first, then finished
      updated.sort((a, b) => {
        if (a.done !== b.done) return a.done - b.done;

        // still sort by closest date
        return new Date(a.deadline) - new Date(b.deadline);
      });

      return updated;
    });
  }

  return (
    <section className="todo-container">
      <div className="todo-card">
        <div className="title-and-input">
          <h2 className="card-title">User's To Do List</h2>
          <InputArea onAdd={addTodo} />
        </div>

        {/* Todo Items */}
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            deadline={item.deadline}
            done={item.done}
            onDelete={deleteTodo}
            onMarkDone={markTodoDone}
          />
        ))}
      </div>
    </section>
  );
}
