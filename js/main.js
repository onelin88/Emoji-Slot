// array with the different targets
const emojis = ['🤌', '🍆', '✊🏿', '💩', '🖕', '🤦‍♂️', '🤡'];
const numberOfTargets = emojis.length;
const targetHit = '🎯';
const miss = '❌';
// game variables
let score = 0;
let multiplier = 0;
let combo = 0;
let time = 120;
let targetB = 0;
const rowBonus = 10000;
const columnBonus = 5000;
let rows = 5;
let columns = 5;
const targetArray = [];


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
    time--;
    document.querySelector('#timeLeft').innerHTML = time;
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
    // refresh borders at the start of the function to reset any green win borders
    // const refreshBorders = [row1col1, row1col2, row1col3, row1col4, row1col5, row2col1, row2col2, row2col3, row2col4, row2col5, row3col1, row3col2, row3col3, row3col4, row3col5, row4col1, row4col2, row4col3, row4col4, row4col5]
    // refreshBorders.forEach((border, i) => {
    //     border.style.border = "1px solid grey";
    // })
    // bonusWin.innerHTML = " ";

    // randomly select 1 of the targets from the array and apply it to the variable
    targetB = emojis[Math.floor(Math.random() * numberOfTargets)]
    targetBounty.innerHTML = targetB;
    // for (let r = 0; r < rows; r++) {
    //     for (let c = 0; c < columns; c++) {
    //         targetArray[r][c] = emojis[Math.floor(Math.random() * numberOfTargets)];
    //     }
    // }
    removeTargets();
    updateCSSGrid();
    createTargetArray();
    generateEmojis();
    createDivElements();
    displayEmojis();
    createListeners();

    // check for consecutive rows or columns
    // checkRows();
    // checkColumns();
}

function createListeners(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const selector = '.row-'+ r +'-col-' + c
            const targetElement = document.querySelector(selector)
            targetElement.addEventListener('click', () => {
                // Event handling code for each element
                if (targetArray[r][c] == targetB) {
                    multiplier++;
                    combo++;
                    scoreMultiplier.innerHTML = multiplier;
                    score = (1 * multiplier) + score;
                    queryScore.innerHTML = score;
                    
                    if(combo >= 5){
                        targetArray[r][c] = "<img src='images/woosh.gif' size=40 width=40/>"
                    }
                    else{
                        targetArray[r][c] = targetHit;
                    }
                    displayEmojis(); // testing for now
                }
                else {
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

// event listeners
document.querySelector('#play').addEventListener('click', playGame);


function checkRows() {
    const rowOne = [row1col1, row1col2, row1col3, row1col4, row1col5];
    const rowTwo = [row2col1, row2col2, row2col3, row2col4, row2col5];
    const rowThree = [row3col1, row3col2, row3col3, row3col4, row3col5];
    const rowFour = [row4col1, row4col2, row4col3, row4col4, row4col5];
    if (r1c1 == r1c2 && r1c2 == r1c3 && r1c3 == r1c4 && r1c4 == r1c5) {
        score += rowBonus;
        bonusWin.innerHTML = rowBonus;
        rowOne.forEach((row, i) => {
            row.style.borderTop = winStyle;
            row.style.borderBottom = winStyle;
        })
        row1col1.style.borderLeft = winStyle;
        row1col5.style.borderRight = winStyle;
    }
    else if (r2c1 == r2c2 && r2c2 == r2c3 && r2c3 == r2c4 && r2c4 == r2c5) {
        score += rowBonus;
        bonusWin.innerHTML = rowBonus;
        rowTwo.forEach((row, i) => {
            row.style.borderTop = winStyle;
            row.style.borderBottom = winStyle;
        })
        row2col1.style.borderLeft = winStyle;
        row2col5.style.borderRight = winStyle;
    }
    else if (r3c1 == r3c2 && r3c2 == r3c3 && r3c3 == r3c4 && r3c4 == r3c5) {
        score += rowBonus;
        bonusWin.innerHTML = rowBonus;
        rowThree.forEach((row, i) => {
            row.style.borderTop = winStyle;
            row.style.borderBottom = winStyle;
        })
        row3col1.style.borderLeft = winStyle;
        row3col5.style.borderRight = winStyle;
    }
    else if (r4c1 == r4c2 && r4c2 == r4c3 && r4c3 == r4c4 && r4c4 == r4c5) {
        score += rowBonus;
        bonusWin.innerHTML = rowBonus;
        rowFour.forEach((row, i) => {
            row.style.borderTop = winStyle;
            row.style.borderBottom = winStyle;
        })
        row4col1.style.borderLeft = winStyle;
        row4col4.style.borderRight = winStyle;
    }
}

function checkColumns() {
    const columnOne = [row1col1, row2col1, row3col1, row4col1];
    const columnTwo = [row1col2, row2col2, row3col2, row4col2];
    const columnThree = [row1col3, row2col3, row3col3, row4col3];
    const columnFour = [row1col4, row2col4, row3col4, row4col4]
    const columnFive = [row1col5, row2col5, row3col5, row4col5]

    if (r1c1 == r2c1 && r2c1 == r3c1 && r3c1 == r4c1) {
        score += columnBonus;
        bonusWin.innerHTML = columnBonus;
        for (let i = 0; i < columnOne.length; i++) {
            columnOne[i].style.borderLeft = "10px solid green";
            columnOne[i].style.borderRight = "10px solid green";
        }
        row1col1.style.borderTop = "10px solid green";
        row4col1.style.borderBottom = "10px solid green";
    }
    
    else if (r1c2 == r2c2 && r2c2 == r3c2 && r3c2 == r4c2) {
        score += columnBonus;
        bonusWin.innerHTML = columnBonus;
        columnTwo.forEach((column, i) => {
            column.style.borderLeft = "10px solid green";
            column.style.borderRight = "10px solid green";
        })
        row1col2.style.borderTop = "10px solid green";
        row4col2.style.borderBottom = "10px solid green";
    }

    else if (r1c3 == r2c3 && r2c3 == r3c3 && r3c3 == r4c3) {
        score += columnBonus;
        bonusWin.innerHTML = columnBonus;
        columnThree.forEach((column, i) => {
            column.style.borderLeft = "10px solid green";
            column.style.borderRight = "10px solid green";
        })
        row1col3.style.borderTop = "10px solid green";
        row4col3.style.borderBottom = "10px solid green";
    }

    else if (r1c4 == r2c4 && r2c4 == r3c4 && r3c4 == r4c4) {
        score += columnBonus;
        bonusWin.innerHTML = columnBonus;
        columnFour.forEach((column, i) => {
            column.style.borderLeft = winStyle;
            column.style.borderRight = winStyle;
        })
        row1col4.style.borderTop = winStyle;
        row4col4.style.borderBottom = winStyle;
    }

    else if (r1c5 == r2c5 && r2c5 == r3c5 && r3c5 == r4c5) {
        score += columnBonus;
        bonusWin.innerHTML = columnBonus;
        columnFive.forEach((column, i) => {
            column.style.borderLeft = winStyle;
            column.style.borderRight = winStyle;
        })
        row1col5.style.borderTop = winStyle;
        row4col5.style.borderBottom = winStyle;
    }
}

function updateProgressBar(percent) {
    const progressBar = document.querySelector("#progressBar");
    progressBar.style.height = percent + '%';
}

let progress = 0;

const intervalId = setInterval(() => {
    progress = score / 100;
    updateProgressBar(progress);

    if (progress >= 100) {
        updateProgressBar(0);
    }
}, 100)

const showPopup = document.querySelector('.showPopup');
const popUpContainer = document.querySelector('.popUpContainer');
const closeButton = document.querySelector('.closeButton');

showPopup.onclick = () => {
    popUpContainer.classList.add('active');
}

closeButton.onclick = () => {
    popUpContainer.classList.remove('active');
}