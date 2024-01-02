import { useState, useEffect } from "react"
import { Header, SubHeader } from "./Headers"
import weatherService from "../services/weatherService"

const weatherCodeToIcon = {
    '0': 'https://openweathermap.org/img/w/01d.png',  // Clear sky
    '1': 'https://openweathermap.org/img/w/02d.png',  // Mainly clear
    '2': 'https://openweathermap.org/img/w/03d.png',  // Partly cloudy
    '3': 'https://openweathermap.org/img/w/04d.png',  // Overcast
  
    '45': 'https://openweathermap.org/img/w/50d.png', // Fog and depositing rime fog
    '48': 'https://openweathermap.org/img/w/50d.png', // Fog and depositing rime fog
  
    '51': 'https://openweathermap.org/img/w/09d.png', // Drizzle: Light intensity
    '53': 'https://openweathermap.org/img/w/09d.png', // Drizzle: Moderate intensity
    '55': 'https://openweathermap.org/img/w/09d.png', // Drizzle: Dense intensity
  
    '56': 'https://openweathermap.org/img/w/13d.png', // Freezing Drizzle: Light intensity
    '57': 'https://openweathermap.org/img/w/13d.png', // Freezing Drizzle: Dense intensity
  
    '61': 'https://openweathermap.org/img/w/10d.png', // Rain: Slight intensity
    '63': 'https://openweathermap.org/img/w/10d.png', // Rain: Moderate intensity
    '65': 'https://openweathermap.org/img/w/10d.png', // Rain: Heavy intensity
  
    '66': 'https://openweathermap.org/img/w/13d.png', // Freezing Rain: Light intensity
    '67': 'https://openweathermap.org/img/w/13d.png', // Freezing Rain: Heavy intensity
  
    '71': 'https://openweathermap.org/img/w/13d.png', // Snow fall: Slight intensity
    '73': 'https://openweathermap.org/img/w/13d.png', // Snow fall: Moderate intensity
    '75': 'https://openweathermap.org/img/w/13d.png', // Snow fall: Heavy intensity
  
    '77': 'https://openweathermap.org/img/w/13d.png', // Snow grains
  
    '80': 'https://openweathermap.org/img/w/09d.png', // Rain showers: Slight intensity
    '81': 'https://openweathermap.org/img/w/09d.png', // Rain showers: Moderate intensity
    '82': 'https://openweathermap.org/img/w/09d.png', // Rain showers: Violent intensity
  
    '85': 'https://openweathermap.org/img/w/13d.png', // Snow showers slight
    '86': 'https://openweathermap.org/img/w/13d.png', // Snow showers heavy
  
    '95': 'https://openweathermap.org/img/w/11d.png', // Thunderstorm: Slight or moderate
    '96': 'https://openweathermap.org/img/w/11d.png', // Thunderstorm with slight hail
    '99': 'https://openweathermap.org/img/w/11d.png', // Thunderstorm with heavy hail
}

const CountryFlag = ({ imageUrl, altText }) => {
    return(
        <img src={imageUrl} alt={altText}/>
    )
}

const WeatherIcon = ({ weatherCode }) => {
    console.log("🚀 ~ file: Country.jsx:53 ~ WeatherIcon ~ weatherCode:", weatherCode)
    return (
        <img src={weatherCodeToIcon[weatherCode]} alt={`Weathercode ${weatherCode}`} />
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

const CountryWeather = ({ country }) => {
    const [weatherContent, setWeatherContent] = useState(null)

    useEffect(() => {
        if (country) {
            weatherService
                .getWeather(country.latlng[0], country.latlng[1])
                .then( result => {
                    console.log("🚀 ~ file: Country.jsx:33 ~ useEffect ~ result:", result)
                    const content = (
                        <>
                            <p>temperature {result.current.temperature_2m} Celcius</p>
                            <WeatherIcon weatherCode={result.current.weather_code}/>
                            <p>wind {result.current.wind_speed_10m} m/s</p>
                        </>
                    )
                    setWeatherContent(content)
                })
                .catch(error => {
                    console.log("🚀 ~ file: Country.jsx:44 ~ useEffect ~ error:", error)
                })
        }       
    }, [])

    return (
        <>
            <SubHeader text={`Weather in ${country.name.common}`} />
            {weatherContent}
        </>
    )
}

const Country = ({ country }) => {

    if (country === null){
        return null
    }

    return(
        <>
            <Header text={country.name.common}/>
            <p>Capital {country.capital}</p>
            <p>Area {country.area} km<sup>2</sup> </p>
            <SubHeader text={'Languages'} />
            <LanguageList languages={Object.entries(country.languages)}/>
            <CountryFlag imageUrl={country.flags.png} altText={country.flags.alt} />
            <CountryWeather country={country}/>
        </>
    )
}

export default Country