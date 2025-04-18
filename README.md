# CS260StartupProject
Startup web program project

### Elevator Pitch
Have you ever gotten home from work, school, or errands and want to make a meal but you're not sure what to make? You know roughly what ingredients you want to use - what type of protein you're wanting, what vegetables you have in your fridge, and other ingredients you have in your cupboards or pantry. But you're not wanting to search through your recipie book or try to throw things together in an attempt to make something worth eating. Simple Supper will assist in making the decision of dinner easier. This recipe application allows you to mark what ingredients you already have on hand and shows recipes that use those ingredients. 

### Key Features 
* Secure login over HTTPS
* Ability to select the ingredients user has
* Display of recipe choices
* Ability to select and save recipes
* Reviews and comments from other users 

### Technology Description
I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for browsing recipes. Hyperlinks to choice recipes.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login, choice display, saving recipes, display other users comments and reviews, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving saved recipes
  - submitting comments and reviews
  - retrieving ingredients
  - retrieving recipes from Edamam recipes API
- **DB/Login** - Store ingredients and saved recipes in database. Register and login users. Credentials securely stored in database. Can't save a recipe unless authenticated.
- **WebSocket** - As each user saves a recipe, their saved recipes are broadcast to all other users.

### Design Images

![StartUpDesign](https://github.com/user-attachments/assets/031e5dc9-6550-418b-a472-9908c7528c46)

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

 - [x] HTML pages - Four HTML page that represent the ability to login, look at all available recipes, recipes that would use the ingrediants you have, and an about page.
 - [x] Links - The login page automatically links to the all recipes page. All other pages are linked together from the menu at the top of the page.
 - [x] Text - Each each page is represented by textual description.
 - [x] Images - I put in placeholder images where the recipes will go and where other images will be placed.
 - [x] DB/Login - Input box and submit button for login. The recipes represent data pulled from the database.
 - [x] WebSocket - The saved recipes will be shown in recipes for you page.

## CSS Deliverable

For this deliverable I properly styled the application into its final appearance.

- [x] Header, footer, and main content body.
- [x] Navigation elements - changed the color of the navigation bar, navigation elements, and logo. Also changed the formatting of the navigation elements.
- [x] Responsive to window resizing - my website looks good on all window sizes.
- [x] Application Elements - used good contrast as well as whitespace/formatting.
- [x] Application text content - consistent fonts.
- [x] Application images - able to load images and some images are placeholders for where recipes will be grabbed from the API.

## React Part 1

For this deliverable I did the following. I checked the box [x] and added a description for things I completed.

- [x] Bundled using Vite - Easy to install and use Vite.
- [x] Components - Easy to bring the code over from HTML and CSS, but had to rework them quite a bit to achieve prefered styling.
- [x] Router - Easy to creating the component routing.

## React Part 2

For this deliverable I did the following. I checked the box [x] and added a description for things I completed.

- [x] All functionality implemented or mocked out - Functionality is working in preparation for further steps
- [x] Hooks - Used useState and useEffect on the Login, All Recipes, and Recipes for You pages
- [x] 'Create Account' and 'Login' functionality fixed
- [ ] 

## Service

For this deliverable I did the following. I checked the box [x] and added a description for things I completed. 

- [x] Node.js/Express HTTP service - done!
- [x] Static middleware for frontend - done!
- [x] Calls to third party endpoints - I use a recipe generating API to call recipes that have the ingredients that the user has on hand.
- [x] Backend service endpoints - Simple endpoints in service/index for login authentication.
- [x] Frontend calls service endpoints -  All mocked functionality removed from the frontend and replaced with calls to the service.
- [x] Supports registration, login, logout, and restricted endpoint - Fully support authentication and restrict access to recipes.
- [ ] 

## DB/Login Deliverable

For this deliverable I did the following. I checked the box [x] and added a description for things I completed. 
- [x] Stores data in MongoDB - Stores login info in MongoDB from ```service/database.js```.
- [x] Stores credentials in MongoDB - Auth stored in MongoDB from ```service/database.js```.
