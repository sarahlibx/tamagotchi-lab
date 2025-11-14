// Display three buttons when the page is initially displayed.
// Display three stats that randomly increment a value between 0 and 3 at a set interval.
// To keep the creature happy, a player must keep three stats within a given range - greater than 0 and less than 10.
// A player can click a button to set the corresponding stat to 0.
// Include loss logic and display a message when the player has lost.
// Provide a Play Again button that will reset the game.

// 1) Define the required variables used to track the state of the game.

// 2) Store cached element references.

// 3) Upon loading, the game state should be initialized, and a function should be called to render this game state.

// 4) The state of the game should be rendered to the user.

// 5) Handle the game over logic. 

// 6) Handle each instance of a player clicking a button with the use of a `handleClick()` function.

// 7) Create reset functionality.


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
const object = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0
};

//store game timer
let timer;

//present if player has lost
let gameOver;


/*------------------------ Cached Element References ------------------------*/
// store spans inside the stat-wrapper
const boredomStatEl = document.querySelector('#boredom-stat');
const hungetStatEl = document.querySelector('#hunger-stat');
const sleepinessStatEl = document.querySelector('#sleepiness-stat');

// store button elements inside of game interface section
const playBtnEl = document.querySelector('#play');
const feedBtnEl = document.querySelector('#feed');
const sleepBtnEl = document.querySelector('#sleep');

// game status
const gameMessageEl = document.querySelector('#message');

// play again
const resetBtnEl = document.querySelector('#restart');

/*-------------------------------- Functions --------------------------------*/
// game state initialization
const init = () => {
    resetBtnEl.classList.add('hidden');
    gameMessageEl.classList.add('hidden');

    object.boredom = 0;
    object.hunger = 0;
    object.sleepiness = 0;

    gameOver = false;

    timer = setInterval(function() {
        runGame();
    }, 2000);
}

const runGame = () => {
    // update as tamagotchi objects updated
    updateStates();
    // if any object value over 10, game over
    checkGameOver();
    // reset game
    renderGame();
};

// update text content of each element w/updatedState random #
const renderGame = () => {
    boredomStatEl.textContent = object.boredom;
    hungetStatEl.textContent = object.hunger;
    sleepinessStatEl.textContent = object.sleepiness;

    if (gameOver === true) {
        window.clearInterval(timer);
        resetBtnEl.classList.remove('hidden');
        gameMessageEl.classList.remove('hidden');
    }
};

const getRandomIncrement = () => {
    return Math.floor(Math.random() * 3);
}

const updateStates = () => {
    for (const key in object) {
        object[key] += getRandomIncrement();      
    }
    return object;
};

const checkGameOver = () => {
    for (const key in object) {
        if (object[key] > 10) {
            gameOver = true;
        }
    }
}

const playBtnClick = () => {
    object.boredom = 0;
    renderGame();
}

const sleepBtnClick = () => {
    object.sleepiness = 0;
    renderGame();
}

const feedBtnClick = () => {
    object.hunger = 0;
    renderGame();
}

init();

/*----------------------------- Event Listeners -----------------------------*/

 playBtnEl.addEventListener('click', playBtnClick);

 sleepBtnEl.addEventListener('click', sleepBtnClick);

 feedBtnEl.addEventListener('click', feedBtnClick);

 resetBtnEl.addEventListener('click', init);
