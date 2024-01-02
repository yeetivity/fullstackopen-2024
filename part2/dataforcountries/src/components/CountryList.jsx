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

export default CountryList