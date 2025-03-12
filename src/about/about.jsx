import React from 'react';
import './about.css';

export function About() {
  const [imageSource, setImageSource] = useState("placeholder.jpg");

  return (
    <main>
        <div id="picture" class="picture-box"><img width="400px" src={imageSource} alt="random" /></div>
  
        <p>
          Simple supper is a website that allows you to not have to think about what you want to make for dinner. It 
          allows you to select which ingredients you have on hand and make the most of what you've got.
        </p>
        <p>
          Enjoy your meal!
        </p>
  
        <div id="quote">
          <div>Anyone can cook</div>
          <div>- Chef Auguste Gusteau</div>
        </div>

        <img src="anyoneCanCook.jpg" alt="anyoneCanCook" class="anyone-can-cook" width="160"/>

      </main>
  );
}