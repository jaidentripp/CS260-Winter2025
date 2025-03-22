import React, { useState, useEffect } from 'react';
import './allRecipes.css';

export function AllRecipes() {
  const [recipies, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      const data = await response.json();
      setRecipes(data.meals || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const handleRecipeClick = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <main className="container-fluid bg-light text-center">
      <h2>All Recipes</h2>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-item" onClick={() => handleRecipeClick(recipe.idMeal)}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <p>{recipe.strMeal}</p>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className="recipe-details">
          <h3>{selectedRecipe.strMeal}</h3>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
          <h4>Ingredients:</h4>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = selectedRecipe[`strIngredient${i}`];
              const measure = selectedRecipe[`strMeasure${i}`];
              return ingredient && (
                <li key={i}>
                  {measure} {ingredient}
                </li>
              );
            })}
          </ul>
          <h4>Instructions:</h4>
          <p>{selectedRecipe.strInstructions}</p>
          <button onClick={closeRecipeDetails}>Close</button>
        </div>
      )}
    </main>
  );

  // return (
  //   <main className="container-fluid bg-light text-center">
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>All Recipes</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {loading ? (
  //           <tr>
  //             <td>Loading recipes...</td>
  //           </tr>
  //         ) : recipies.length == 0 ? (
  //           <tr>
  //             <td>No recipes found.</td>
  //           </tr>
  //         ) : (
  //         recipies.map((recipe) => (
  //           <tr key={recipe.id}>
  //             <td>
  //               <img width="400px" src={recipe.image} alt={recipe.alt} />
  //             </td>
  //           </tr>
  //           ))
  //         )}
  //         {/* <tr>
  //           <td> <img width="400px" src="placeholder.jpg" alt="recipe1"/> </td>
  //         </tr>
  //         <tr>
  //           <td> <img width="400px" src="placeholder.jpg" alt="recipe2"/> </td>
  //         </tr>
  //         <tr>
  //           <td> <img width="400px" src="placeholder.jpg" alt="recipe3"/> </td>
  //         </tr> */}
  //       </tbody>
  //     </table>
  //   </main>
  // );
}