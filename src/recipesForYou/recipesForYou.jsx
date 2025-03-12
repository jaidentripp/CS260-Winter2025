//import React from 'react';
import React, { useState } from 'react';
import './recipesForYou.css';

export function RecipesForYou() {
  const proteinOptions = ['Chicken', 'Ground Beef', 'Pork', 'Fish', 'Turkey'];
  const produceOptions = ['Potatoes', 'Carrots', 'Peaches', 'Cucumber', 'Green Beans', 'Apples'];
  const otherOptions = ['Cream of mushroom soup',
    'Brown gravy packet',
    'Cream of chicken soup',
    'Beef broth',
    'Italian seasoning'
  ];

  return (
    <main className="container-fluid bg-light text-center">
      <h2>Recipes for You</h2>
      <h3>Select ingredients you have or would like to use</h3>
      
      <h5>Protein</h5>
      <Dropdown title="Select" options={proteinOptions} />
      
      <h5>Produce</h5>
      <Dropdown title="Select" options={produceOptions} />
      
      <h5>Other Ingredients</h5>
      <Dropdown title="Select" options={otherOptions} />

      <br />
      <h3>These recipes use the ingredients you have...</h3>
      <table>
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
  /* return (
    <main className="container-fluid bg-light text-center">
    <h2>Recipes for You</h2>
      <h3>Select ingreditents you have or would like to use</h3>
        <h5>Protein</h5>
        <div className="dropdown" data-control="checkbox-dropdown">
          <label className="dropdown-label">Select</label>
          
          <div className="dropdown-list">
            <a href="#" data-toggle="check-all" className="dropdown-option">
              Check All  
            </a>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 1" />
              Chicken
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 2" />
              Ground Beef
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 3" />
              Pork
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 4" />
              Fish
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 5" />
              Turkey
            </label>      
          </div>
        </div>
      <h5>Produce</h5>
        <div className="dropdown" data-control="checkbox-dropdown">
          <label className="dropdown-label">Select</label>
          
          <div className="dropdown-list">
            <a href="#" data-toggle="check-all" className="dropdown-option">
              Check All  
            </a>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 1" />
              Potatoes
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 2" />
              Carrots
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 3" />
              Peaches
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 4" />
              Cucumber
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 5" />
              Apples
            </label>      
          </div>
        </div>
      <h5>Other Ingredients</h5>
        <div className="dropdown" data-control="checkbox-dropdown">
          <label className="dropdown-label">Select</label>
          
          <div className="dropdown-list">
            <a href="#" data-toggle="check-all" className="dropdown-option">
              Check All  
            </a>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 1" />
              Cream of mushroom soup
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 2" />
              Brown gravy packet
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 3" />
              Cream of chicken soup
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 4" />
              Beef broth
            </label>
            
            <label className="dropdown-option">
              <input type="checkbox" name="dropdown-group" value="Selection 5" />
              Italian seasoning
            </label>      
          </div>
        </div>
      <br />
      <h3>These recipes use the ingredients you have...</h3>
      <table>
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
  ); */

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
