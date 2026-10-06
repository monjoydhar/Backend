import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios
      .get('http://localhost:3000/api/notes')
      .then((response) => {
        setNotes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching notes:', error)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const title = e.target.title.value
    const description = e.target.description.value

    console.log(title, description)

    axios
      .post('http://localhost:3000/api/notes', { title, description })
      .then((response) => {
        console.log('Note added:', response.data)
        fetchNotes()
      })
      .catch((error) => {
        console.error('Error adding note:', error)
      })
  }

  function handleDelete(index) {
    const noteToDelete = notes[index]
    axios
      .delete(`http://localhost:3000/api/notes/${noteToDelete._id}`)
      .then((response) => {
        console.log('Note deleted:', response.data)
        fetchNotes()
      })
      .catch((error) => {
        console.error('Error deleting note:', error)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='Note-from'>
        <input name="title" type="text" placeholder='Title' />
        <input name="description" type="text" placeholder='Description' />
        <button>Add Note</button>
      </form>

      <div className="notes">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button onClick={() => handleDelete(index)}>Delete Note</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
