import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import Recipe from './Recipe'

const App = () => {

  const APP_ID = '52e793d7';
  const APP_KEY = '2d1cd82c4198f341a8094d7b83fd4957';

  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  

  useEffect(() => {
    getRecipes();
    console.log('we are fetching data');
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
    <center><h1>Recipe Finder</h1></center>
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">
          Search
    </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients} />
        
      ))};
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'));
