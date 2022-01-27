import React from 'react'
import './search-bar.styles.scss'

const SearchBar = (props) => {

    //console.log(props);
    return (

        <input
            className="search__bar"
            type="text"
            value={props.input}
            placeholder="what are you lookin for ?"
            onChange={props.handleChange} />

    )
}

export default SearchBar