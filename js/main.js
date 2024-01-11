// array with the different targets
const targetArray = ['🤌', '🍆', '✊🏿', '💩', '🖕', '🤦‍♂️', '🤡'];
const numberOfTargets = targetArray.length;

// game variables
let score = 0;
let multiplier = 0;
let time = 120;
let targetB = 0;

// variables for each row and column r = row, c = column
let r1c1 = 0;
let r1c2 = 0;
let r1c3 = 0;
let r1c4 = 0;
let r1c5 = 0;
let r2c1 = 0;
let r2c2 = 0;
let r2c3 = 0;
let r2c4 = 0;
let r2c5 = 0;
let r3c1 = 0;
let r3c2 = 0;
let r3c3 = 0;
let r3c4 = 0;
let r3c5 = 0;
let r4c1 = 0;
let r4c2 = 0;
let r4c3 = 0;
let r4c4 = 0;
let r4c5 = 0;
let r5c1 = 0;
let r5c2 = 0;
let r5c3 = 0;
let r5c4 = 0;
let r5c5 = 0;

// countdown timer taking the time and subtracting 1 every 1000ms (1second)
setInterval(() => {
    time--;
    document.querySelector('#timeLeft').innerHTML = time;
}, 1000)

// bonuses for matching 5 in a row, or 4 in a column
const rowBonus = 10000;
const columnBonus = 5000;

// variables that select elements using querySelector
const timeLeft = document.querySelector('#timeLeft');
const targetBounty = document.querySelector('#targetBounty');
const row1col1 = document.querySelector('#row-1-col-1');
const row1col2 = document.querySelector('#row-1-col-2');
const row1col3 = document.querySelector('#row-1-col-3');
const row1col4 = document.querySelector('#row-1-col-4');
const row1col5 = document.querySelector('#row-1-col-5');
const row2col1 = document.querySelector('#row-2-col-1');
const row2col2 = document.querySelector('#row-2-col-2');
const row2col3 = document.querySelector('#row-2-col-3');
const row2col4 = document.querySelector('#row-2-col-4');
const row2col5 = document.querySelector('#row-2-col-5');
const row3col1 = document.querySelector('#row-3-col-1');
const row3col2 = document.querySelector('#row-3-col-2');
const row3col3 = document.querySelector('#row-3-col-3');
const row3col4 = document.querySelector('#row-3-col-4');
const row3col5 = document.querySelector('#row-3-col-5');
const row4col1 = document.querySelector('#row-4-col-1');
const row4col2 = document.querySelector('#row-4-col-2');
const row4col3 = document.querySelector('#row-4-col-3');
const row4col4 = document.querySelector('#row-4-col-4');
const row4col5 = document.querySelector('#row-4-col-5');
const queryScore = document.querySelector('#score');
const scoreMultiplier = document.querySelector('#scoreMultiplier');
const bonusWin = document.querySelector('#bonusWin');
const winStyle = "10px solid green";

// event listeners
document.querySelector('#play').addEventListener('click', playGame);
document.querySelector('#row-1-col-1').addEventListener('click', checkr1c1);
document.querySelector('#row-1-col-2').addEventListener('click', checkr1c2);
document.querySelector('#row-1-col-3').addEventListener('click', checkr1c3);
document.querySelector('#row-1-col-4').addEventListener('click', checkr1c4);
document.querySelector('#row-1-col-5').addEventListener('click', checkr1c5);
document.querySelector('#row-2-col-1').addEventListener('click', checkr2c1);
document.querySelector('#row-2-col-2').addEventListener('click', checkr2c2);
document.querySelector('#row-2-col-3').addEventListener('click', checkr2c3);
document.querySelector('#row-2-col-4').addEventListener('click', checkr2c4);
document.querySelector('#row-2-col-5').addEventListener('click', checkr2c5);
document.querySelector('#row-3-col-1').addEventListener('click', checkr3c1);
document.querySelector('#row-3-col-2').addEventListener('click', checkr3c2);
document.querySelector('#row-3-col-3').addEventListener('click', checkr3c3);
document.querySelector('#row-3-col-4').addEventListener('click', checkr3c4);
document.querySelector('#row-3-col-5').addEventListener('click', checkr3c5);
document.querySelector('#row-4-col-1').addEventListener('click', checkr4c1);
document.querySelector('#row-4-col-2').addEventListener('click', checkr4c2);
document.querySelector('#row-4-col-3').addEventListener('click', checkr4c3);
document.querySelector('#row-4-col-4').addEventListener('click', checkr4c4);
document.querySelector('#row-4-col-5').addEventListener('click', checkr4c5);

// initializes the game when the play button is pressed in the browser
function playGame() {
    // refresh borders at the start of the function to reset any green win borders
    const refreshBorders = [row1col1, row1col2, row1col3, row1col4, row1col5, row2col1, row2col2, row2col3, row2col4, row2col5, row3col1, row3col2, row3col3, row3col4, row3col5, row4col1, row4col2, row4col3, row4col4, row4col5]
    refreshBorders.forEach((border, i) => {
        border.style.border = "1px solid grey";
    })
    bonusWin.innerHTML = " ";
    
    const everyCell = [r1c1, r1c2, r1c3, r1c4, r1c5, r2c1, r2c2, r2c3, r2c4, r2c5, r3c1, r3c2, r3c3, r3c4, r3c5, r4c1, r4c2, r4c3, r4c4, r4c5]

    // randomly select 1 of the targets from the array and apply it to the variable
    targetB = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r1c1 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r1c2 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r1c3 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r1c4 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r1c5 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r2c1 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r2c2 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r2c3 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r2c4 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r2c5 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r3c1 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r3c2 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r3c3 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r3c4 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r3c5 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r4c1 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r4c2 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r4c3 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r4c4 = targetArray[Math.floor(Math.random() * numberOfTargets)]
    r4c5 = targetArray[Math.floor(Math.random() * numberOfTargets)]

    // show the randomly generated targets in the browser
    targetBounty.innerHTML = targetB;
    row1col1.innerHTML = r1c1;
    row1col2.innerText = r1c2;
    row1col3.innerText = r1c3;
    row1col4.innerText = r1c4;
    row1col5.innerText = r1c5;
    row2col1.innerText = r2c1;
    row2col2.innerText = r2c2;
    row2col3.innerText = r2c3;
    row2col4.innerText = r2c4;
    row2col5.innerText = r2c5;
    row3col1.innerHTML = r3c1;
    row3col2.innerText = r3c2;
    row3col3.innerText = r3c3;
    row3col4.innerText = r3c4;
    row3col5.innerText = r3c5;
    row4col1.innerText = r4c1;
    row4col2.innerText = r4c2;
    row4col3.innerText = r4c3;
    row4col4.innerText = r4c4;
    row4col5.innerText = r4c5;

    // everyCell.forEach((cell, i) => {
    //     if (cell == targetArray[1]) {
    //         console.log("hands");
    //     }
    // })
    // if (r1c1 == targetArray[1]) {
    //     row1col1.style.cursor = "grab";
    // }

    // check for consecutive rows or columns
    checkRows();
    checkColumns();
}

function checkr1c1() {
    if (r1c1 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r1c1 = "X";
        row1col1.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr1c2() {
    if (r1c2 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r1c2 = "X";
        row1col2.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr1c3() {
    if (r1c3 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r1c3 = "X";
        row1col3.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr1c4() {
    if (r1c4 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r1c4 = "X";
        row1col4.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr1c5() {
    if (r1c5 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r1c5 = "X";
        row1col5.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr2c1() {
    if (r2c1 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r2c1 = "X";
        row2col1.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr2c2() {
    if (r2c2 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r2c2 = "X";
        row2col2.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr2c3() {
    if (r2c3 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r2c3 = "X";
        row2col3.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr2c4() {
    if (r2c4 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r2c4 = "X";
        row2col4.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr2c5() {
    if (r2c5 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r2c5 = "X";
        row2col5.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr3c1() {
    if (r3c1 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r3c1 = "X";
        row3col1.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr3c2() {
    if (r3c2 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r3c2 = "X";
        row3col2.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr3c3() {
    if (r3c3 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r3c3 = "X";
        row3col3.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr3c4() {
    if (r3c4 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r3c4 = "X";
        row3col4.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr3c5() {
    if (r3c5 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        queryScore.innerHTML = score;
        r3c5 = "X";
        row3col5.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr4c1() {
    if (r4c1 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        r4c1 = "X";
        row4col1.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr4c2() {
    if (r4c2 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        r4c2 = "X";
        row4col2.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr4c3() {
    if (r4c3 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        r4c3 = "X";
        row4col3.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr4c4() {
    if (r4c4 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        r4c4 = "X";
        row4col4.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

function checkr4c5() {
    if (r4c5 == targetB) {
        multiplier++;
        scoreMultiplier.innerHTML = multiplier;
        score = (1 * multiplier) + score;
        r4c5 = "X";
        row4col5.innerHTML = " ";
    }
    else {
        multiplier = 0;
        scoreMultiplier.innerHTML = multiplier;
        score -= 100;
        queryScore.innerHTML = score;
    }
}

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

// function checkScore