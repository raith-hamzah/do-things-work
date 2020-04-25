import React, { useState } from "react"
import "./todo.css"
import { ADD_TODO } from "./todoList"

function CreateTodo({ dispatch }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({
      type: ADD_TODO,
      payload: { name, description, fixed: false, id: Date.now() },
    })
    setName("")
    setDescription("")
  }

  return (
    <section className='todo todo--active todo--creator'>
      <form onSubmit={handleSubmit}>
        <button type='submit' className='todo__edit'>
          Add
        </button>
        <input
          className='todo__name'
          value={name}
          placeholder='name of appliance'
          onChange={e => setName(e.target.value)}
        />
        <textarea
          className='todo__description'
          value={description}
          placeholder='how is it broken?'
          onChange={e => setDescription(e.target.value)}
        />
      </form>
    </section>
  )
}

export default CreateTodo
