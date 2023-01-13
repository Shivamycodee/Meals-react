import React,{useState} from 'react';
import {useGlobalContext} from "../Context";

const Search = () =>{

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

    const [text,setText] = useState('');

    function handleChange(event){
         setText(event.target.value);
    }

    function handleSubmit(event){
          event.preventDefault();
          if(text){
              setSearchTerm(text);
          }
    }

    function handleRandomMeal(event){
        fetchRandomMeal();
        setText('');
        setSearchTerm('');

    }

    return (
      <header className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="type your meal..."
            type="text"
            className="form-input"
            value={text}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Search
          </button>
          <button
            style={{ background: "black", color: "white" }}
            type="button"
            className="btn btn-hipster"
            onClick={handleRandomMeal}
          >
            Supprise Me!
          </button>
        </form>
      </header>
    );
}

export default Search;