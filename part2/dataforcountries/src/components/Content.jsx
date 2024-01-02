import CountryList from "./CountryList"
import Country from "./Country"

const Content = ({ countryList, onCountrySelect, selectedCountry }) => {
    var content = null
    // Conditional rendering
    if (countryList === null) {
        return content
    }

    // More than 10 countryList found
    else if (countryList.length > 10) {
        content = <p>Too many matches, specify your filter</p>
    }

    // Between 1 and 10 countryList found and none selected
    else if (countryList.length > 1 && !selectedCountry) {
        content = <CountryList countryList={countryList} onClick={onCountrySelect} />
    }

    else if (countryList.length === 1 || selectedCountry){
        content = <Country country={selectedCountry || countryList[0]}/>
    }

    return content
}

export default Content