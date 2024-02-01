// array with the different targets
const emojis = ['🤌', '🍆', '💩', '🖕', '🤦‍♂️', '🤡'];
const numberOfTargets = emojis.length;
const targetHit = '✅';
const miss = '❌';

// game variables
let score = 0;
let multiplier = 0;
let combo = 0;
let time = 60;
let shotsTaken = 0;
let targetsKilled = 0;
let targetsMissed = 0;
let hoiyahs = 0;
let targetB = 0;
let victoryFlag = 0;
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
    if (victoryFlag >= 10) {
        let sameTarget = emojis[Math.floor(Math.random() * numberOfTargets)];
        let randomRow = Math.floor(Math.random() * rows);
        for (let i = 0; i < columns; i++) {
            targetArray[randomRow][i] = sameTarget;
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
let timerStarted = false;

function startTimer() {
    if (!timerStarted) {
        let startInterval = setInterval(() => {
            time--;
            document.querySelector('#time').innerHTML = time;
        }, 1000)
        timerStarted = true;
        setTimeout(() => {
            endGame();
            clearInterval(startInterval);
            time = 60;
        }, 60000)
    }
}

// variables that select elements using querySelector
const timeLeft = document.querySelector('#timeLeft');
const targetBounty = document.querySelector('#targetBounty');
const queryScore = document.querySelector('#score');
const scoreMultiplier = document.querySelector('#scoreMultiplier');
const bonusWin = document.querySelector('#bonusWin');
const winStyle = "10px solid green";

// initializes the game when the play button is pressed in the browser
function playGame() {
    targetB = emojis[Math.floor(Math.random() * numberOfTargets)];
    targetBounty.innerHTML = targetB;

    startTimer();
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

function endGame() {
    let accuracy = (targetsKilled / shotsTaken * 100).toFixed(2);
    removeTargets();
    endGameContainer.classList.add('active');
    document.querySelector('.finalScore').innerText = score;
    document.querySelector('.targetsKilled').innerText = targetsKilled;
    document.querySelector('.targetsMissed').innerText = targetsMissed;
    document.querySelector('.accuracy').innerText = accuracy;
    document.querySelector('.hoiyahs').innerText = hoiyahs;
    score = 0;
    multiplier = 0;
    combo = 0;
    time = 60;
    shotsTaken = 0;
    targetsKilled = 0;
    targetsMissed = 0;
    hoiyahs = 0;
    targetB = 0;
    victoryFlag = 0;
    rows = 3;
    columns = 3;
    timerStarted = false;
}

function checkMultiplier(multiplier) {
    const targets = document.querySelector('#targetTable');
    if (multiplier >= 0) {
        rows = 3;
        columns = 3;
        targets.style.fontSize = '5em';
    }

    if (multiplier >= 10) {
        rows = 4;
        columns = 4;
        targets.style.fontSize = '4em';
    }

    if (multiplier >= 20) {
        rows = 5;
        columns = 5;
        targets.style.fontSize = '3em';
    }

    if (multiplier >= 40) {
        rows = 6;
        columns = 6;
        targets.style.fontSize = '2em';
    }

    if (multiplier >= 60) {
        rows = 7;
        columns = 7;
        targets.style.fontSize = '1em';
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
                    targetsKilled++;
                    shotsTaken++;
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
                    shotsTaken++;
                    targetsMissed++;
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
    scoreMultiplier.addEventListener('animationend', () => {
        scoreMultiplier.classList.remove('flashAnimation');
    })

}

function checkRows(arr) {
    victoryFlag++;
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
            victoryFlag = 0;
            hoiyahs++;
        }
    });
}

function checkCols(arr) {
    const numRows = arr.length;
    const numCols = arr[0].length;

    for (let j = 0; j < numCols; j++) {
        let colMatch = true;

        for (let i = 0; i < numRows - 1; i++) {
            if (arr[i][j] !== arr[i + 1][j]) {
                colMatch = false;
                break;
            }
        }

        if (colMatch) {
            colWinner(j);
            winAudio.play();
            victoryFlag = 0;
            hoiyahs++;
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

    if (columns <= 3) {
        score += 1000;
    } else if (columns >= 4) {
        score += 5000;
    } else if (columns >= 5) {
        score += 10000;
    } else if (columns >= 6) {
        score += 20000;
    }
}

const showPopup = document.querySelector('.showPopup');
const popUpContainer = document.querySelector('.popUpContainer');
const closeButton = document.querySelector('.closeButton');
const endGameContainer = document.querySelector('.endGameContainer');
const closeEndGame = document.querySelector('.closeEndGame');

showPopup.onclick = () => {
    popUpContainer.classList.add('active');
}

closeButton.onclick = () => {
    popUpContainer.classList.remove('active');
}

closeEndGame.onclick = () => {
    endGameContainer.classList.remove('active');
}