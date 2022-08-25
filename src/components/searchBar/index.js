import React, { useState } from 'react'
import './index.css'

const SearchBar = () => {
  const [searchText,setSearchText] = useState('')
  const [results,setResults] = useState([])
  const [timerId,setTimerId] = useState([])


  const searchCountry =async (name) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const data = await response.json()
    setResults(data)
  }

  const handleSearch = e => {
    setSearchText(e.target.value);
    setResults([])
    if(e.target.value.trim()!==''){
    if(timerId){
        clearTimeout(timerId)
    }
    setTimerId(setTimeout(()=>searchCountry(e.target.value),1000));
   }
  }

  return (
    <div className="search">
      <div className="search-title">SearchBar </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={(e) => handleSearch(e)}
        />
        <div className="input-search-icon">

        </div>
        <div className="results-wrapper">
          {results.length > 0 && (
            <div>
              {results.map((i) => (
                <div className="search-result" key={i.name.official}>
                  {i.name.official}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar