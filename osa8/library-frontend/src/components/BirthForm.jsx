import { useState } from "react"
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries"
import { useMutation } from "@apollo/client"

const BirthForm = ({ persons }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateBirthyear ] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()
    const updatedInfo = { name, setBornTo: Number(born)}

    updateBirthyear({ variables: updatedInfo })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {persons.map(p => 
            <option key={p.name} value={p.name}>{p.name}</option> 
            )}
          </select>
        </div>
        <div>
          born
          <input 
            type="text" 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default BirthForm