import { useState, useEffect } from 'react'
import Content from './components/Content'
import countryService from './services/countryService'

function App() {

  const [filter, setFilter] = useState('')
  const [countryList, setCountryList] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    // Fetch countries
    countryService
      .getAll()
      .then(fetchedList => {
        // Write the filtered countries to the state
        setCountryList(fetchedList.filter(country =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())))
      })
    console.log("Filtered countrylist is: ", countryList)
  }, [filter])

  // Event handlers
  const onFilterChange = (event) => {
    // Update the value
    setFilter(event.target.value)

    // Reset the selected country
    setSelectedCountry(null)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setFilter(country.name.common)
  }

  return (
    <div>
      <p>find countries</p>
      <input value={filter} onChange={onFilterChange}/>
      <Content 
      countryList={countryList} onCountrySelect={handleCountrySelect} selectedCountry={selectedCountry} 
      />
    </div>
  )
}

export default App
