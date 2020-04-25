import React, { useState } from "react"
import "./todo.css"
import { ADD_TODO } from "./todoList"

function CreateTodo({ dispatch }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [complete, setComplete] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({
      type: ADD_TODO,
      payload: { name, description, fixed: false, id: Date.now(), complete },
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
          className='todo__input'
          value={description}
          placeholder='how is it broken?'
          onChange={e => setDescription(e.target.value)}
        />
        <label>Date it needs to be fixed by</label>
        <input
          className='todo__input todo__date'
          type='date'
          id='create-complete'
          name='create-complete'
          onChange={e => setComplete(new Date(e.target.value))}
        />
      </form>
    </section>
  )
}

export default CreateTodo
