import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>
      {person.name}  {person.number}
    </p>
  )
}

const Phonebook = (props) => {
  const filteredPersons = props.persons.filter(
    person => (person.name.toUpperCase().indexOf(props.filter.toUpperCase()) != -1)
  )
  return (
    <div>
      {filteredPersons.map(person => (<Person key={person.name} person={person} />))}
    </div>
  )
}

const AddNewForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  ) 
}

const Filter = (props) => {
  return (
    <div>
          filter shown with: <input onChange={props.handleFilterBy} value={props.filterBy}/>
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

  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [ newNumber, setNewNumber ] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => (person.name===newName)) !== -1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,      
      number: newNumber,
    }    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const [ filterBy, setFilterBy ] = useState('')

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterBy={handleFilterBy} filterBy={filterBy}/>
      <h2>Add new</h2>
      <AddNewForm 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filterBy}/>
    </div>
  )

}

export default App