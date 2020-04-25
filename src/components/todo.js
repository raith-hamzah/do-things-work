import React, { useState, useRef, useEffect } from "react"
import "./todo.css"
import { SAVE_TODO, DELETE_TODO } from "./todoList"

function Todo({ description, name, index, dispatch, fixed, id, complete }) {
  const [disabled, setDisabled] = useState(true)
  const titleInput = useRef(null)
  const editButton = useRef(null)

  // run submit so that inputs save on enter
  function handleSubmit(event) {
    event.preventDefault()
    setDisabled(!disabled)
  }

  function handleDelete(event) {
    event.preventDefault()
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
              payload: {
                name: e.target.value,
                description,
                fixed,
                index,
                id,
                complete,
              },
            })
          }}
        />
        <textarea
          className={`todo__input ${disabled && fixed ? "todo--fixed" : ""}`}
          value={description}
          placeholder='how is it broken?'
          disabled={disabled}
          onChange={e => {
            dispatch({
              type: SAVE_TODO,
              payload: {
                name,
                description: e.target.value,
                fixed,
                index,
                id,
                complete,
              },
            })
          }}
        />
        <hr />
        <label
          className={disabled && fixed ? "todo--fixed" : ""}
          htmlFor={`${id}-complete`}
        >
          Date it needs to be fixed by
        </label>
        <input
          className={`todo__input todo__date ${
            disabled && fixed ? "todo--fixed" : ""
          }`}
          type='date'
          checked={fixed}
          value={formatDate(complete)}
          id={`${id}-complete`}
          name={`${id}-complete`}
          disabled={disabled}
          onChange={e => {
            dispatch({
              type: SAVE_TODO,
              payload: {
                name,
                description,
                fixed,
                complete: new Date(e.target.value),
                index,
                id,
              },
            })
          }}
        />
        <hr />
        <label htmlFor={`${id}-complete`}>Date it got fixed</label>
        <input
          className={`todo__input todo__date ${
            disabled && fixed ? "todo--fixed" : ""
          }`}
          type='date'
          value={formatDate(fixed)}
          id={`${id}-complete`}
          name={`${id}-complete`}
          onChange={e => {
            dispatch({
              type: SAVE_TODO,
              payload: {
                name,
                description,
                fixed: new Date(e.target.value),
                complete,
                index,
                id,
              },
            })
          }}
        />
      </form>
    </section>
  )
}

// formats the date to YYYY-MM-DD for date inputs
const formatDate = date => {
  if (date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() + offset * 60 * 1000)
    return date.toISOString().split("T")[0]
  }
  return ""
}

export default Todo
