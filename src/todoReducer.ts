import { Todo } from "./App";

type State = Todo[];

export enum Actions {
	ADD = "ADD",
	DELETE = "DELETE",
	TOGGLE_COMPLETE = "TOGGLE_COMPLETE",
	UPDATE_TITLE = "UPDATE_TITLE",
}

type Action =
	| { type: Actions.ADD; payload: { index: number } }
	| { type: Actions.UPDATE_TITLE; payload: Pick<Todo, "title" | "id"> }
	| { type: Actions.DELETE; payload: Pick<Todo, "id"> }
	| { type: Actions.TOGGLE_COMPLETE; payload: Pick<Todo, "id" | "done"> };

type Reducer = (state: State, action: Action) => State;

export const initializer = (): Todo[] => {
	return [
		{
			title: "",
			done: false,
			id: new Date().getTime(),
			isRoot: true,
		},
	];
};

export const todoReducer: Reducer = (state, action) => {
	switch (action.type) {
		case Actions.ADD:
			const { index } = action.payload;
			return [
				...state.slice(0, index + 1),
				{ title: "", done: false, id: new Date().getTime(), isRoot: false },
				...state.slice(index + 1),
			];
		case Actions.UPDATE_TITLE:
			return state.map((todo) =>
				todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo,
			);
		case Actions.DELETE:
			return state.filter((todo) => todo.id !== action.payload.id);
		case Actions.TOGGLE_COMPLETE:
			return state.map((todo) =>
				todo.id === action.payload.id ? { ...todo, done: action.payload.done } : todo,
			);
		default:
			return state;
	}
};
