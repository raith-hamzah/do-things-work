import {
  reducer,
  ADD_TODO,
  SAVE_TODO,
  DELETE_TODO,
} from "../components/todoList"

test("reducer adds todos correctly", () => {
  const oldState = {
    todos: [
      {
        name: "todo1",
        description: "todo1",
        id: "1",
        fixed: false,
      },
    ],
  }
  const newTodo = {
    name: "todo2",
    description: "todo2",
    id: "2",
    fixed: false,
  }
  const action = {
    type: ADD_TODO,
    payload: newTodo,
  }

  const expectedState = { todos: [newTodo, oldState.todos[0]] }

  const newState = reducer(oldState, action)
  expect(newState).toEqual(expectedState)
})

test("reducer saves todos correctly", () => {
  const oldState = {
    todos: [
      {
        name: "todo1",
        description: "todo1",
        id: "1",
        fixed: false,
      },
      {
        name: "todo2",
        description: "todo2",
        id: "2",
        fixed: false,
      },
    ],
  }
  const updatedTodo = {
    name: "todo3",
    description: "todo3",
    id: "2",
    fixed: false,
  }
  const action = {
    type: SAVE_TODO,
    payload: { ...updatedTodo, index: 1 },
  }

  const expectedState = { todos: [oldState.todos[0], updatedTodo] }

  const newState = reducer(oldState, action)
  expect(newState).toEqual(expectedState)
})

test("reducer deletes todos correctly", () => {
  const oldState = {
    todos: [
      {
        name: "todo1",
        description: "todo1",
        id: "1",
        fixed: false,
      },
      {
        name: "todo2",
        description: "todo2",
        id: "2",
        fixed: false,
      },
    ],
  }

  const action = {
    type: DELETE_TODO,
    payload: { index: 1 },
  }

  const expectedState = { todos: [oldState.todos[0]] }

  const newState = reducer(oldState, action)
  expect(newState).toEqual(expectedState)
  action.payload.index = 0
  const emptyState = reducer(newState, action)
  expect(emptyState).toEqual({ todos: [] })
})
