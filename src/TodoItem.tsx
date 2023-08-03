import React from "react";
import {
  AddTodoFunction,
  DeleteTodoFunction,
  Todo,
  ToggleTodoCompleteFunction,
  UpdateTodoTitleFunction,
} from "./App";

interface TodoItemProps {
  todo: Todo;
  index: number;
  addTodo: AddTodoFunction;
  updateTodoTitle: UpdateTodoTitleFunction;
  deleteTodo: DeleteTodoFunction;
  toggleTodoComplete: ToggleTodoCompleteFunction;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  addTodo,
  index,
  updateTodoTitle,
  deleteTodo,
  toggleTodoComplete,
}) => {
  React.useEffect(() => {
    return () => {
      const prevTodoInput = document.querySelector(
        `input[data-index="${index - 1}"]`,
      ) as HTMLInputElement;
      if (prevTodoInput) setTimeout(() => prevTodoInput.focus());
    };
  }, []);

  const handleKeydown = (e: React.KeyboardEvent) => {
    const isEmpty = todo.title.length === 0;
    switch (e.key) {
      case "Enter":
        if (!isEmpty) addTodo(index);
        break;
      case "Backspace":
        if (isEmpty && !todo.isRoot) deleteTodo(todo.id);
        break;
    }
  };

  return (
    <>
      <div className="hstack gap-3 flex-nowrap align-items-center bg-light p-3 border">
        <input
          type="checkbox"
          className="form-check-input flex-shrink-0 form-check-input-lg"
          style={{ width: "1.5em", height: "1.5em" }}
          checked={todo.done}
          onChange={(e) => toggleTodoComplete(todo.id, e.target.checked)}
        />
        <input
          type="text"
          className="border-0 border-bottom form-control form-control-sm flex-grow-1 rounded-0 shadow-none"
          placeholder="To-do"
          data-index={index}
          value={todo.title}
          autoFocus
          onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
          onKeyDown={handleKeydown}
          style={{ textDecoration: todo.done ? "line-through" : "none" }}
        />
        {!todo.isRoot && (
          <button
            className="flex-shrink-0 btn btn-light d-flex align-items-center justify-content-center"
            style={{ width: "2em", height: "2em" }}
            type="button"
            onClick={() => deleteTodo(todo.id)}
          >
            &times;
          </button>
        )}
      </div>
    </>
  );
};

export default TodoItem;
