import { Header, SubHeader } from "./Headers"

const CountryList = ({ countryList, onClick }) => {
    return (
        <ul>
            {countryList.map(country => (
                <li key={country.cca3}>
                    {country.name.common}
                    <button onClick={() => onClick(country)}>
                        show
                    </button>
                </li>    
            ))}
        </ul>
    )
}

const LanguageList = ({ languages }) => {
    console.log("🚀 ~ file: Content.jsx:14 ~ LanguageList ~ languages:", languages)
    return(
        <ul>
            {languages.map(language => (
                <li key={language[0]}>{language[1]}</li>
            ))}
        </ul>
    )
}

const CountryFlag = ({ imageUrl, altText }) => {
    return(
        <img src={imageUrl} alt={altText}/>
    )
}

// const CountryWeather = ({ country }) => {
//     const [weatherContent, setWeatherContent] = useState(null)

//     useEffect(() => {
//         weatherService
//             .getWeather(country.latlng[0], country.latlng[1])
//             .then( result => {
//                 console.log("🚀 ~ file: Content.jsx:44 ~ CountryWeather ~ result:", result)
//                 const content = (
//                     <>
//                         <p>temperature {result.current.temperature_2m} Celcius</p>
//                         <p>{result.current.weather_code}</p>
//                         <p>wind {result.current.wind_speed_10m} m/s</p>
//                     </>
//                 )
//                 setWeatherContent(content)
//             })
//     }, [weatherContent])
    
//     return(
//         <>
//             <SubHeader text={`Weather in ${country.name.common}`} />
//             {weatherContent}
//         </>
//     )
// }
        

const Country = ({ country }) => {
    return(
        <>
            <Header text={country.name.common}/>
            <p>Capital {country.capital}</p>
            <p>Area {country.area} km<sup>2</sup> </p>
            <SubHeader text={'Languages'} />
            <LanguageList languages={Object.entries(country.languages)}/>
            <CountryFlag imageUrl={country.flags.png} altText={country.flags.alt} />
            {/* <CountryWeather country={country}/> */}
        </>
    )
}

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