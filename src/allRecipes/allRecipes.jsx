import React from 'react';
import './allRecipes.css';

export function AllRecipes() {
  return (
    <main className="container-fluid bg-light text-center">
      <table>
        <thead>
          <tr>
            <th>All Recipes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe1"/> </td>
          </tr>
          <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe2"/> </td>
          </tr>
          <tr>
            <td> <img width="400px" src="placeholder.jpg" alt="recipe3"/> </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}