import React from "react";
import TodoItem from "./TodoItem";
import { initializer, todoReducer, Actions } from "./todoReducer";

export interface Todo {
  title: string;
  done: boolean;
  id: string | number;
  isRoot: boolean;
}

export type AddTodoFunction = (index: number) => void;
export type UpdateTodoTitleFunction = (id: Todo["id"], title: Todo["title"]) => void;
export type DeleteTodoFunction = (id: Todo["id"]) => void;
export type ToggleTodoCompleteFunction = (id: Todo["id"], done: Todo["done"]) => void;

const App: React.FC = () => {
  const [todos, dispatch] = React.useReducer(todoReducer, undefined, initializer);

  const addTodo: AddTodoFunction = (lastTodoItemIndex) => {
    dispatch({
      type: Actions.ADD,
      payload: {
        index: lastTodoItemIndex,
      },
    });
  };

  const updateTodoTitle: UpdateTodoTitleFunction = (id, title) => {
    dispatch({
      type: Actions.UPDATE_TITLE,
      payload: { id, title },
    });
  };

  const deleteTodo: DeleteTodoFunction = (id) => {
    dispatch({
      type: Actions.DELETE,
      payload: { id },
    });
  };

  const toggleTodoComplete: ToggleTodoCompleteFunction = (id, done) => {
    dispatch({
      type: Actions.TOGGLE_COMPLETE,
      payload: { id, done },
    });
  };

  return (
    <>
      <div
        className="container mx-auto py-5"
        style={{ maxWidth: 500 }}
      >
        <ul className="list-unstyled vstack gap-3">
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                index={index}
                addTodo={addTodo}
                updateTodoTitle={updateTodoTitle}
                deleteTodo={deleteTodo}
                toggleTodoComplete={toggleTodoComplete}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
