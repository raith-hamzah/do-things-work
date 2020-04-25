import React from "react"
import Header from "./components/header"
import Container from "./components/container"
import TodoList from "./components/todoList"

function App(props) {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Container>
          <article>
            <h2>Welcome!</h2>
            <p>
              <em>do things work?</em> is the very most sophisticated tool on
              the market to manage all your broken household appliances. Simply
              add the thing that needs fixing and cite the way that it is
              broken. You'll be able to check it off when its fixed! Throwing it
              away? Simply delete the item from the list!
            </p>
          </article>
          <TodoList />
        </Container>
      </main>
    </React.Fragment>
  )
}

export default App
