import { SubHeader } from "./Headers"

const Contacts = ({ contacts, filterValue }) => {
    console.log("🚀 ~ file: App.jsx:25 ~ Contacts ~ filterValue:", filterValue)
    const contactsToShow = (filterValue !== '')
      ? contacts.filter(contact => contact.name.toLowerCase().includes(filterValue.toLowerCase))
      : contacts
    console.log("🚀 ~ file: App.jsx:27 ~ Contacts ~ contactsToShow:", contactsToShow)
  
    return(
      <>
        <SubHeader text={'Contacts'} />
        {contactsToShow.map((contact) => (
          <p key={contact.id}> {contact.name} <br/> {contact.phoneNumber} </p>
        ))}
      </>
    )
  }

export default Contacts