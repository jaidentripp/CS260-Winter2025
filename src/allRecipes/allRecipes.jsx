import React, { useState, useEffect } from 'react';
import './allRecipes.css';

export function AllRecipes() {
  const [recipies, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    //Simulating API call to fetch recipies
    //*replace with API call
    const mockRecipes = [
      { id: 1, image: 'placeholder.jpg', alt: 'recipe1' },
      { id: 2, image: 'placeholder.jpg', alt: 'recipe2' },
      { id: 3, image: 'placeholder.jpg', alt: 'recipe3' },
    ];

    setTimeout(() => {
      setRecipes(mockRecipes);
    }, 1000);
  };

  return (
    <main className="container-fluid bg-light text-center">
      <table>
        <thead>
          <tr>
            <th>All Recipes</th>
          </tr>
        </thead>
        <tbody>
          {recipies.map((recipie) => (
            <tr key={recipe.id}>
              <td>
                <img width="400px" src={recipe.image} alt={recipe.alt} />
              </td>
            </tr>
          ))}
          {/* <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe1"/> </td>
          </tr>
          <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe2"/> </td>
          </tr>
          <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe3"/> </td>
          </tr> */}
        </tbody>
      </table>
    </main>
  );
}