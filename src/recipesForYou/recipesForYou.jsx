//import React from 'react';
import React, { useState, useEffect } from 'react';
import './recipesForYou.css';

export function RecipesForYou() {
  const proteinOptions = ['Chicken', 'Beef', 'Pork', 'Fish', 'Turkey'];
  const produceOptions = ['Potato', 'Carrot', 'Apple', 'Onion', 'Tomato'];
  const otherOptions = ['Salt', 'Pepper', 'Olive Oil', 'Garlic', 'Butter'];

  // State management
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedProduce, setSelectedProduce] = useState([]);
  const [selectedOther, setSelectedOther] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to fetch recipes from TheMealDB API
  // const fetchRecipes = async (ingredients) => {
  //   setLoading(true);
  //   const recipes = [];
  //   for (const ingredient of ingredients) {
  //     try {
  //       const respone = await 
  //       fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  //       const data = await response.json();
  //       if (data.meals) {
  //         recipes.push(...data.meals);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching recipes:', error);
  //     }
  //   }
  //   const uniqueRecipes = Array.from(new Set(recipes.map(r => r.idMeal))).map(id => recipes.find(r => r.idMeal === id));
  //   setFilteredRecipes(uniqueRecipes);
  //   setLoading(false);
  // };

  const fetchRecipes = async (ingredients) => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        ingredients.map(ingredient =>
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`)
        )
      );
      
      const data = await Promise.all(responses.map(res => res.json()));
      
      const recipes = data.flatMap(response => response.meals || []);
      
      // Remove duplicates using a Set
      const uniqueRecipes = [...new Map(recipes.map(recipe => 
        [recipe.idMeal, recipe])).values()];
      
      setFilteredRecipes(uniqueRecipes);
    } catch (error) {
      console.error('API Error:', error);
      setFilteredRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleRecipeClick = (id) => {
    fetchRecipeDetails(id);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };


  // Mock recipe data
  // const mockRecipes = [
  //   { 
  //     id: 1, 
  //     title: 'Chicken Pot Pie',
  //     image: 'https://via.placeholder.com/400', 
  //     ingredients: ['Chicken', 'Potatoes', 'Carrots', 'Cream of mushroom soup']
  //   },
  //   { 
  //     id: 2, 
  //     title: 'Beef Stew',
  //     image: 'https://via.placeholder.com/400', 
  //     ingredients: ['Ground Beef', 'Potatoes', 'Carrots', 'Beef broth']
  //   },
  //   // Add more mock recipes as needed
  // ];

  // Filter recipes when selections change
  // useEffect(() => {
  //   const filterRecipes = () => {
  //     setLoading(true);
      
  //     // Combine all selected ingredients
  //     const selectedIngredients = [
  //       ...selectedProteins,
  //       ...selectedProduce,
  //       ...selectedOther
  //     ];

  //     // Filter recipes that include at least one selected ingredient
  //     const matchingRecipes = mockRecipes.filter(recipe =>
  //       selectedIngredients.some(ingredient => 
  //         recipe.ingredients.includes(ingredient)
  //       )
  //     );
  //     // Simulate API delay
  //     setTimeout(() => {
  //       setFilteredRecipes(matchingRecipes);
  //       setLoading(false);
  //     }, 500);
  //   };

  //   if (selectedProteins.length > 0 || selectedProduce.length > 0 || selectedOther.length > 0) {
  //     filterRecipes();
  //   } else {
  //     setFilteredRecipes([]);
  //   }
  // }, [selectedProteins, selectedProduce, selectedOther]);

  useEffect(() => {
    const selectedIngredients = [...selectedProteins, ...selectedProduce, ...selectedOther];

    if (selectedIngredients.length > 0) {
      fetchRecipes(selectedIngredients);
    } else {
      setFilteredRecipes([]);
    }
  }, [selectedProteins, selectedProduce, selectedOther]);

  // Dropdown component with state management
  function Dropdown({ title, options, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCheckboxChange = (option, isChecked) => {
      if (isChecked) {
        onSelect([...selected, option]);
      } else {
        onSelect(selected.filter(item => item !== option));
      }
    };

    return (
      <div className={`dropdown ${isOpen ? 'on' : ''}`}>
        <label className="dropdown-label" onClick={() => setIsOpen(!isOpen)}>
          {title} ({selected.length})
        </label>
        <div className="dropdown-list">
          {options.map((option, index) => (
            <label key={index} className="dropdown-option">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="container-fluid bg-light text-center">
      <h2>Recipes for You</h2>
      <h3>Select ingredients you have or would like to use</h3>
      
      <h5>Protein</h5>
      <Dropdown title="Select" 
      options={proteinOptions}
      selected={selectedProteins}
      onSelect={setSelectedProteins} />
      
      <h5>Produce</h5>
      <Dropdown title="Select" 
      options={produceOptions}
      selected={selectedProduce}
      onSelect={setSelectedProduce} />
      
      <h5>Other Ingredients</h5>
      <Dropdown title="Select" 
      options={otherOptions} 
      selected={selectedOther}
      onSelect={setSelectedOther}/>

      <br />

      {selectedRecipe && (
        <div className="recipe-details-modal">
          <div className="recipe-details-content">
            <button onClick={closeRecipeDetails} className="close-button">&times;</button>
            <h2>{selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            <h3>Ingredients:</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedRecipe[`strIngredient${i}`];
                const measure = selectedRecipe[`strMeasure${i}`];
                return ingredient && (
                  <li key={i}>{`${measure} ${ingredient}`}</li>
                );
              })}
            </ul>
            <h3>Instructions:</h3>
            <p>{selectedRecipe.strInstructions}</p>
          </div>
        </div>
      )}

      <h3>These recipes use the ingredients you have...</h3>
      <div className="recipe-grid">
        {loading ? (
          <p>Loading recipes...</p>
        ) : filteredRecipes.length === 0 ? (
          <p>No matching recipes found. Try selecting different ingredients.</p>
        ) : ( filteredRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
              <img 
              src={recipe.strMealThumb || 'https://via.placeholder.com/400'} 
              alt={recipe.strMeal} 
              />
              <h4>{recipe.strMeal}</h4>
            </div>
          ))
        )}
      </div>
      {/* <table>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading recipes...</td>
            </tr>
          ) : filteredRecipes.length === 0 ? (
            <tr>
              <td>No matching recipes found. Try selecting different ingredients.</td>
            </tr>
          ) : (
            filteredRecipes.map((recipe) => (
              <tr> key={recipe.id}
                <td>
                  <img width="400px" src={recipe.image} alt={recipe.title} />
                  <p>{recipe.title}</p>
                  <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}
    </main>
  );
}

  function Dropdown({ title, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedState, setCheckedState] = useState(
      new Array(options.length).fill(false)
    );
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOnChange = (position) => {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    };
  
    return (
      <div className={`dropdown ${isOpen ? 'on' : ''}`}>
        <label className="dropdown-label" onClick={toggleDropdown}>
          {title}
        </label>
        <div className="dropdown-list">
          {options.map((option, index) => (
            <label key={index} className="dropdown-option">
              <input
                type="checkbox"
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }
