import React from 'react'
import './search-bar.styles.scss'

const SearchBar = ({ input, handleChange }) => {

    return (

        <input
            className="search__bar"
            type="text"
            placeholder="what are you lookin for ?"
            onChange={handleChange} />

    )
}

export default SearchBar