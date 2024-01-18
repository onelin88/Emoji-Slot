// array with the different targets
const emojis = ['🤌', '🍆', '💩', '🖕', '🤦‍♂️', '🤡'];
const numberOfTargets = emojis.length;
const targetHit = '✅';
const miss = '❌';

// game variables
let score = 0;
let multiplier = 0;
let combo = 0;
let time = 0;
let targetB = 0;
const rowBonus = 10000;
const columnBonus = 10000;
let rows = 3;
let columns = 3;
const targetArray = [];

// event listener for play button
document.querySelector('#play').addEventListener('click', playGame);

const playAudio = new Audio('./sounds/play.wav');
playAudio.volume = 0.5;
const winAudio = new Audio('./sounds/hoiyah.wav');
winAudio.volume = 0.5;
const fireAudio = new Audio('./sounds/fire.wav');
fireAudio.volume = 0.5;
const missAudio = new Audio('./sounds/miss.wav');
missAudio.volume = 0.5;

function updateCSSGrid() {
    const cssGrid = document.querySelector('#targetTable');
    cssGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    cssGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

function createTargetArray() {
    for (let r = 0; r < rows; r++) {
        targetArray[r] = [];
        for (let c = 0; c < columns; c++) {
            targetArray[r][c] = 0;
        }
    }
}

function generateEmojis() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            targetArray[r][c] = emojis[Math.floor(Math.random() * numberOfTargets)];
        }
    }
}

const gridContainer = document.querySelector('#targetTable');

function createDivElements() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const newDiv = document.createElement('div');
            newDiv.className = `row-${r}-col-${c} targets`;
            gridContainer.appendChild(newDiv);
        }
    }
}

function displayEmojis() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let rc = `row-${r}-col-${c}`;
            const gridHTML = document.querySelector(`.${rc}`);
            gridHTML.innerHTML = targetArray[r][c];
        }
    }
}

function removeTargets() {
    const allTargets = document.querySelectorAll('.targets');
    allTargets.forEach(target => {
        target.remove();
    });
}

// countdown timer taking the time and subtracting 1 every 1000ms (1second)
setInterval(() => {
    time++;
    document.querySelector('#time').innerHTML = time;
}, 1000)

// variables that select elements using querySelector
const timeLeft = document.querySelector('#timeLeft');
const targetBounty = document.querySelector('#targetBounty');
const queryScore = document.querySelector('#score');
const scoreMultiplier = document.querySelector('#scoreMultiplier');
const bonusWin = document.querySelector('#bonusWin');
const winStyle = "10px solid green";

// initializes the game when the play button is pressed in the browser
function playGame() {
    // randomly select 1 of the targets from the array and apply it to the variable
    targetB = emojis[Math.floor(Math.random() * numberOfTargets)];
    targetBounty.innerHTML = targetB;
    // targetBounty.style.animation = 'blinking 1s infinite';

    checkMultiplier(multiplier);
    removeTargets();
    updateCSSGrid();
    createTargetArray();
    generateEmojis();
    createDivElements();
    displayEmojis();
    createListeners();
    checkRows(targetArray);
    checkCols(targetArray);

    playAudio.play();

}

function checkMultiplier(multiplier) {
    const targets = document.querySelector('#targetTable');
    if (multiplier == 0) {
        rows = 3;
        columns = 3;
        targets.style.fontSize = '6em';
    }

    if (multiplier >= 10) {
        rows = 4;
        columns = 4;
        targets.style.fontSize = '5em';
    }
    
    if (multiplier >= 20) {
        rows = 5;
        columns = 5;
        targets.style.fontSize = '4em';
    }

    if (multiplier >= 30) {
        rows = 6;
        columns = 6;
        targets.style.fontSize = '2em';
    }

    if (multiplier >= 40) {
        rows = 6;
        columns = 6;
    }

    if (multiplier >= 50) {
        rows = 7;
        columns = 7;
    }
}

function createListeners() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const selector = '.row-' + r + '-col-' + c
            const targetElement = document.querySelector(selector)
            targetElement.addEventListener('click', () => {
                // Event handling code for each element
                if (targetArray[r][c] == targetB) {
                    fireAudio.play();
                    runAnimation();
                    multiplier++;
                    combo++;
                    scoreMultiplier.innerHTML = multiplier;
                    score = (1 * multiplier) + score;
                    queryScore.innerHTML = score;

                    if (combo >= 5) {
                        targetArray[r][c] = targetHit; //"<img src='images/woosh.gif' size=40 width=40/>"
                    }
                    else {
                        targetArray[r][c] = targetHit;
                    }
                    displayEmojis(); // testing for now
                }
                else {
                    missAudio.play();
                    multiplier = 0;
                    combo = 0;
                    scoreMultiplier.innerHTML = multiplier;
                    score -= 100;
                    queryScore.innerHTML = score;
                    targetArray[r][c] = miss;
                    displayEmojis();
                }
            });
        }
    }
}

function runAnimation() {
    scoreMultiplier.classList.add('flashAnimation');
    scoreMultiplier.addEventListener('animationend', function () {
        scoreMultiplier.classList.remove('flashAnimation');
    })

}

function checkRows(arr) {
    arr.forEach((item, i) => {
        let rowMatch = true;

        for (let j = 0; j < item.length - 1; j++) {
            if (item[j] !== item[j + 1]) {
                rowMatch = false;
                break;
            }
        }
        if (rowMatch) {
            rowWinner(i);
            winAudio.play();
        }
    });
}

function checkCols(arr) {
    const numRows = arr.length;
    const numCols = arr[0].length;

    for (let j = 0; j < numCols; j++) {
        let colMatch = true;

        for (let i = 0; i < numRows-1; i++) {
            if (arr[i][j] !== arr[i+1][j]) {
                colMatch = false;
                break;
            }
        }

        if (colMatch) {
            colWinner(j);
            winAudio.play();
        }
    }
}

function rowWinner(row) {
    for (let c = 0; c < columns; c++) {
        let rc = `row-${row}-col-${c}`;
        const singleRow = document.querySelector(`.${rc}`);
        singleRow.style.animation = 'blinking 1s infinite';
    }
    if (rows <= 3) {
        score += 1000;
    } else if (rows >= 4) {
        score += 5000;
    } else if (rows >= 5) {
        score += 10000;
    } else if (rows >= 6) {
        score += 20000;
    }
}

function colWinner(col) {
    for (let r = 0; r < rows; r++) {
        let rc = `row-${r}-col-${col}`;
        const singleCol = document.querySelector(`.${rc}`);
        singleCol.style.animation = 'blinking 1s infinite';
    }
    score += columnBonus;
}

const showPopup = document.querySelector('.showPopup');
const popUpContainer = document.querySelector('.popUpContainer');
const closeButton = document.querySelector('.closeButton');

showPopup.onclick = () => {
    popUpContainer.classList.add('active');
}

closeButton.onclick = () => {
    popUpContainer.classList.remove('active');
}