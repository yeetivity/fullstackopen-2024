import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import { Header, SubHeader } from './components/Headers'
import Filter from './components/Filter'
import DoubleInputForm from './components/DoubleInputForm'
 
const App = () => {
  const appName = 'Phonebook'

  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Event handlers
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const addNewContact = (event) => {
    event.preventDefault()
    console.log("🚀 ~ file: App.jsx:29 ~ handleNewName ~ event:", event.target.value)

    // Throw alert if name or phonenumber input is empty and stop further execution
    if (!newName.trim() || !newPhoneNumber.trim()) {
      alert('Please fill in a name and phonenumber')
      return
    }

    // Check if a contact with the same name already exists (ignoring leading and trailing spaces)
    const nameExists = contacts.some(contact => contact.name.trim().toLowerCase() === newName.trim().toLowerCase())

    // Check if a contact with the same phonenumber already exists (ignoring leading and trailing spaces)
    const phoneNumberExists = contacts.some(contact => contact.phoneNumber.trim() === newPhoneNumber.trim())

    // Throw alert if name already exists and stop further execution
    if (nameExists || phoneNumberExists) {
      alert(`A contact with this name ("${newName.trim()}") or phonenumber ("${newPhoneNumber.trim()}") already exists \n Please check your existing contacts`)
      return
    }

    // Create a new contact object with the trimmed name, the phone number, and a unique id
    const contactObject = {
      name: newName.trim(),
      phoneNumber: newPhoneNumber.trim(),
      id: contacts.length + 1,
    }
    setContacts(contacts.concat(contactObject))  // Add contact to the contact list
    setNewName('')  // Reset name value in the input field
    setNewPhoneNumber('')  // Reset phone number value in the input field
  }

  // Fetch the initial data from the server
  useEffect(() => {
    console.log('effect started')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log('data returned:', response.data)
        setContacts(response.data)
      })
  }, [])
  console.log('render', contacts.length, 'contacts')

  return (
    <div>
      <Header text = {appName}/>
      <Filter filterValue={filter} onChange={handleFilterChange}/>
      <SubHeader text={'Add new contact'}/>
      <DoubleInputForm 
       desc1={'name'} value1={newName} onChange1={handleNameChange}
       desc2={'phonenumber'} value2={newPhoneNumber} onChange2={handlePhoneNumberChange}
       btnTxt={'add'} onSubmit={addNewContact}/>
      <Contacts contacts={contacts} filterValue={filter}/>
    </div>
  )
}

export default App