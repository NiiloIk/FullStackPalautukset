import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter }) => {
  return (
    <>
      <div>
        filter names: <input onChange={filter} />
      </div>
    </>
  )
}

const PersonForm = ({ setName, newName, setNumber, newNumber, addPerson }) => {

  return (
    <>
      <form>
        <table>
          <tbody>
            <tr>
              <td>name:</td><td><input onChange={setName} value={newName}/></td>
            </tr>
            <tr>
              <td>number:</td><td><input onChange={setNumber} value={newNumber}/></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons, clickHandler }) => {

  return (
    <>
    <ul>
      {persons.map((person) =>
        <li className='persons' key={person.id}>
          {person.name} {person.number} 
          <button  onClick={() => clickHandler(person.id)}>
            delete
          </button>
        </li>
      )}
    </ul>
    </>
  )
}

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  } else if (error){
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
      <div className="success">
        {message}
      </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const setName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const setNumber = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const setNewFilter = (event) => {
    setFilter(event.target.value)
  }

  const setNewMessage = (message, error) => {
    error ? setError(true) : setError(false)
    
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const personExists = persons.find((person) => person.name === newName)
    if (personExists) {
      let input = window.confirm(
        newName + " already exists. Replace old number with a new one?")
      if (input) {
        const changedNumber = { ...personExists, number: newNumber}

        personService
          .update(personExists.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
            setNewMessage('Number updated', false)
          })
          .catch(() => {
            setNewMessage(`Information of ${personExists.name} has already been deleted`, true)
            setPersons(persons.filter(n => n.id !== id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setNewMessage('Added ' + returnedPerson.name, false)
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    let input = window.confirm("Delete person?")
    if (input) {
      personService
        .deletePerson(id)
        .then(() => {
          setNewMessage("Person deleted", false)
        })
        .catch(() => {
          setNewMessage(`information of ${persons.find(person => id === person.id).name} has already been removed from server`, 
          true)
      })
      
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  const peopleToShow = filter.length < 1 ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter filter={setNewFilter}/>
      
      <h2>Add a new person</h2>
      <PersonForm 
        setName={setName} 
        newName={newName} 
        setNumber={setNumber} 
        newNumber={newNumber} 
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={peopleToShow} clickHandler={removePerson}/>
    </div>
  )
}

export default App