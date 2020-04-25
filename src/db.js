import Dexie from "dexie"

// Create an indexedDb database
let db
if (window.indexedDB) {
  db = new Dexie("todos")
  db.version(1).stores({ todos: "id,name,description,complete,fixed" })
} else db = null

export default db
