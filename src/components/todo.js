import React, { useState, useRef, useEffect } from "react"
import "./todo.css"
import { SAVE_TODO, DELETE_TODO } from "./todoList"

function Todo({ description, name, index, dispatch, fixed, id }) {
  const [disabled, setDisabled] = useState(true)
  const titleInput = useRef(null)
  const editButton = useRef(null)

  // run submit so that inputs save on enter
  function handleSubmit(event) {
    event.preventDefault()
    setDisabled(!disabled)
  }

  function handleDelete() {
    dispatch({ type: DELETE_TODO, payload: { id, index } })
  }

  // returns focus to the edit button after a submit
  useEffect(() => {
    if (!disabled) {
      titleInput.current.focus()
    } else {
      editButton.current.focus()
    }
  }, [disabled])

  return (
    <section className={`todo ${!disabled ? "todo--active" : ""}`}>
      <form onSubmit={handleSubmit}>
        <button type='submit' className='todo__edit' ref={editButton}>
          {disabled ? "Edit" : "Save"}
        </button>
        {disabled && (
          <button className='todo__delete' onClick={handleDelete}>
            Delete
          </button>
        )}
        <input
          className={`todo__name ${disabled && fixed ? "todo--fixed" : ""}`}
          value={name}
          placeholder='name of appliance'
          disabled={disabled}
          ref={titleInput}
          onChange={e => {
            dispatch({
              type: SAVE_TODO,
              payload: { name: e.target.value, description, fixed, index, id },
            })
          }}
        />
        <textarea
          className={`todo__description ${
            disabled && fixed ? "todo--fixed" : ""
          }`}
          value={description}
          placeholder='how is it broken?'
          disabled={disabled}
          onChange={e => {
            dispatch({
              type: SAVE_TODO,
              payload: { name, description: e.target.value, fixed, index, id },
            })
          }}
        />
        <input
          className='todo__fixed'
          type='checkbox'
          checked={fixed}
          id={id}
          name={id}
          onClick={e => {
            dispatch({
              type: SAVE_TODO,
              payload: { name, description, fixed: !fixed, index, id },
            })
          }}
        />
        <label htmlFor={id}>Is it fixed?</label>
      </form>
    </section>
  )
}

export default Todo
