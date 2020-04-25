import React, { useReducer, useEffect } from "react"
import Todo from "./todo"
import CreateTodo from "./createTodo"
import db from "../db"

export const ADD_TODO = "ADD_TODO"
export const SAVE_TODO = "SAVE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const LOAD_TODOS = "LOAD_TODOS"

function TodoList() {
  const [state, dispatch] = useReducer(reducer, { todos: [] })

  useEffect(() => {
    db.todos.toArray().then(todos => {
      // reverse them because indexdb retrieves them in reverse
      dispatch({
        type: LOAD_TODOS,
        payload: todos.reverse(),
      })
    })
  }, [])

  return (
    <React.Fragment>
      <CreateTodo dispatch={dispatch} />
      {state.todos.map((todo, index) => (
        <Todo key={todo.id} {...todo} index={index} dispatch={dispatch} />
      ))}
    </React.Fragment>
  )
}

export function reducer(state, action) {
  const { name, description, fixed, index, id } = action.payload
  let newState
  if (action.type === ADD_TODO) {
    // Date acts as simple id to prevent rerenders when todo indexes change
    newState = {
      todos: [{ name, description, fixed: false, id }, ...state.todos],
    }
    if (db) {
      db.todos.add({ name, description, fixed: false, id })
    }
  }
  if (action.type === SAVE_TODO) {
    if (index === 0) {
      newState = {
        todos: [{ name, description, fixed, id }, ...state.todos.slice(1)],
      }
    } else {
      newState = {
        todos: [
          ...state.todos.slice(0, index),
          { name, description, fixed, id },
          ...state.todos.slice(index + 1),
        ],
      }
    }
    if (db) {
      db.todos.put({ name, description, fixed, id })
    }
  }
  if (action.type === DELETE_TODO) {
    if (index === 0) {
      newState = {
        todos: [...state.todos.slice(1)],
      }
    } else {
      newState = {
        todos: [
          ...state.todos.slice(0, index),
          ...state.todos.slice(index + 1),
        ],
      }
    }
    if (db) {
      db.todos.where("id").equals(id).delete()
    }
  }

  if (action.type === LOAD_TODOS) {
    newState = { todos: action.payload }
  }

  return newState
}

export default TodoList
