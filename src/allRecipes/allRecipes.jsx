import React, { useState, useEffect } from 'react';
import './allRecipes.css';

export function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [visibleRecipes, setVisibleRecipes] = useState(20);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
      'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];
    let allRecipes = [];

    try {
      for (const letter of letters) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();
        if (data.meals) {
          allRecipes = [...allRecipes, ...data.meals]
        }
      }
      console.log('All recipes:', allRecipes);
      //setRecipes(data.meals || []);
      setRecipes(allRecipes);
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

  const loadMore = () => {
    setVisibleRecipes(prevVisible => prevVisible + 20);
  };

  return (
    <main className="container-fluid bg-light text-center">
      <h2>All Recipes</h2>
      {/* {loading ? (
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
      )} */}

        {/* {loading ? (
          <p>Loading recipes...</p>
        ) : recipes && recipes.length > 0 ? (
          <div className="recipe-grid">
             {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="recipe-item" onClick={() => handleRecipeClick(recipe.idMeal)}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <p>{recipe.strMeal}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )} */}

      {/* {loading ? (
        <p>Loading recipes...</p>
      ) : recipes && recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.slice(0, 20).map((recipe) => ( // This will display up to 20 recipes
            <div key={recipe.idMeal} className="recipe-item" onClick={() => handleRecipeClick(recipe.idMeal)}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <p>{recipe.strMeal}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )} */}

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes && recipes.length > 0 ? (
        <>
          <div className="recipe-grid">
            {recipes.slice(0, visibleRecipes).map((recipe) => (
              <div key={recipe.idMeal} className="recipe-item" onClick={() => handleRecipeClick(recipe.idMeal)}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <p>{recipe.strMeal}</p>
              </div>
            ))}
          </div>
          {visibleRecipes < recipes.length && (
            <button onClick={loadMore}>Load More</button>
          )}
        </>
      ) : (
        <p>No recipes found.</p>
      )}

      {selectedRecipe && (
        <div className="recipe-details">
          <button onClick={() => setSelectedRecipe(null)} className="close-button">&times;</button>
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