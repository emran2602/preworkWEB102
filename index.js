/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {


    // loop over each item in the data
    for (const game of games){
        // // create a new div element, which will become the game card
        const gamediv  = document.createElement("div");
        gamediv.classList.add("game-card");

        gamediv.innerHTML = `
        <img class="game-img" src=${game.img} alt="game image" />
        <h1>${game.name}</h1>
        <h2> Pledged : ${game.pledged} Goal : ${game.goal}</h2> `;


        // // add the class game-card to the list


        // // set the inner HTML using a template literal to display some info 
        // // about each game
        // // TIP: if your images are not displaying, make sure there is space
        // // between the end of the src attribute and the end of the tag ("/>")


        // // append the game to the games-container
        gamesContainer.append(gamediv);
    
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);
  

// set the inner HTML using a template literal and toLocaleString to get a number with commas
let formattedTotalContributions = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `
<p> ${formattedTotalContributions}</p>
`;
console.log(contributionsCard)

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);
let formattedTotalRaised = totalRaised.toLocaleString('en-US');

raisedCard.innerHTML = `
<p> ${formattedTotalRaised} </p>
`;



// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numGames = GAMES_JSON.reduce( (acc,game) => {
    return acc + 1;
}, 0);
let formattedNumGames = numGames.toLocaleString('en-US');
gamesCard.innerHTML = `
<p> ${formattedNumGames} </p>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listofUnFunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal ; 
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listofUnFunded);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listofFunded = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal ; 
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listofFunded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly );
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


const numUnfunded = GAMES_JSON.filter( game => game.pledged < game.goal).length;
// create a string that explains the number of unfunded games using the ternary operator

let displayStr = `A total of ${formattedTotalRaised} has been raised for ${formattedNumGames} games. Currently, ${numUnfunded} ${numUnfunded > 1 ? "games" : "game"} remains unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const paragDiv = document.createElement("p");
paragDiv.innerHTML = `${displayStr}
`;
descriptionContainer.append(paragDiv);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first_game, second_game, restt] = sortedGames;
console.log("yooy");
console.log(first_game,second_game);


// create a new element to hold the name of the top pledge game, then append it to the correct element
const first_name_game = document.createElement("p");
first_name_game.innerHTML = `${first_game.name}`;
firstGameContainer.append(first_name_game)
// do the same for the runner up item
const sec_name_game = document.createElement("p");
sec_name_game.innerHTML = `${second_game.name}`;
secondGameContainer.append(sec_name_game)