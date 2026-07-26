const map = document.getElementById("map");
const nonCornerBox = document.getElementById("nonCornerBox");
const cornerBox = document.getElementById("cornerBox");
const rightOrWrong = document.getElementById("rightOrWrong");
const consecutive = document.getElementById('consecutive');
const nextBtn = document.getElementById("next");
const images = { 'n': 0, 'ne': 45, 'e': 90, 'se': 135, 's': 180, 'sw': 225, 'w': 270, 'nw': 315 };
const dirs = { 'n': 0, 'e': 90, 's': 180, 'w': 270 };
const dirNames = { 'n': "North", 'e': "East", 's': "South", 'w': "West" };
const turns = { 'forward': 0, 'forward-right': 45, 'right': 90, 'aft-right': 135, 'aft': 180, 'aft-left': 225, 'left': 270, 'forward-left': 315 };
const turnSwapped = Object.keys(turns).reduce((acc, key) => { acc[turns[key]] = key; return acc; }, {});
const targetAudio = new Audio('./audio/target.mp3');
const nAudio = new Audio('./audio/n.mp3');
const eAudio = new Audio('./audio/e.mp3');
const sAudio = new Audio('./audio/s.mp3');
const wAudio = new Audio('./audio/w.mp3');
const audioMap = { 'n': nAudio, 'e': eAudio, 's': sAudio, 'w': wAudio };

let consecutiveCount = 0;
let consecutiveCountDisabled = true;
let rNumI;
let rNumD;
let rImg;
let cAns;
let whereToTurn;

function helpBtnClicked() {
    alert(`The yellow triangle on the map is your airplane. You are pointed in the same direction as the yellow triangle, facing the red circle. To complete the task correctly, you must click the parking lot (gray square within the large green square) that would turn you towards the cardinal direction assigned by the voice. 
Make sure your audio is on. Click Play to start.`);
}

function playAudio(url) {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener('ended', () => resolve());
        audio.play();
    });
}

async function playSounds(dir) {
    await playAudio('./audio/target.mp3');
    await playAudio(`./audio/${dir}.mp3`);
    console.log(`./audio/${audioMap[dir]}.mp3`)
    console.log('Sequence finished!');
}

function changeImage() {

    consecutiveCountDisabled = false;
    nextBtn.innerText = "Next"
    rightOrWrong.innerText = 'Answer for results'

    rNumI = Math.floor(Math.random() * Object.keys(images).length);
    rImg = Object.keys(images)[rNumI];
    map.src = `./images/${rImg}.jpg`;

    rNumD = Math.floor(Math.random() * Object.keys(dirs).length);
    rDir = Object.keys(dirs)[rNumD];
    playSounds(rDir);


    whereToTurn = dirs[rDir] - images[rImg];
    if (whereToTurn < 0) { whereToTurn = whereToTurn + 360 };
    if (rNumI % 2 === 0) {
        cornerBox.hidden = true;
        nonCornerBox.hidden = false;
    } else {
        cornerBox.hidden = false;
        nonCornerBox.hidden = true;
    }

    console.log(turnSwapped[whereToTurn])
}

function ans(direction) {
    console.log(direction)
    if (direction === turnSwapped[whereToTurn]) {
        rightOrWrong.innerText = 'Correct!';
        if (!consecutiveCountDisabled) {
            consecutiveCount++;
        }
    } else {
        rightOrWrong.innerText = 'Wrong!';
        if (!consecutiveCountDisabled) {
            consecutiveCount = 0;
        }
    }

    consecutiveCountDisabled = true;

    consecutive.innerText = consecutiveCount;
}
