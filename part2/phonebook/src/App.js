import { useState } from "react"

const App = () => {
  const [persons,setPersons] = useState([])
  const [allPersons,setAllPersons] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()
    const person = allPersons.filter((person) =>
    person.name ===newName
    )
    const personToAdd = person[0]
    const updatePerson ={...personToAdd,number:newNumber}

  const handleNameChange =(event) => {
    setNewName(event.target.value)
   }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  

  }
  return(
    <div>
      <h2>Phonebook</h2>
      <h2>Add new person</h2>
      
    </div>
  )
}
export default App