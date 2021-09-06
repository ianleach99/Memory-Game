var colorOrder = [];
var selectionOrder = [];
var selectionIndex = 0;
var waitingSelection = false;
var isMuted = false;
var loseSound;
var winSound;
var selectSound;
var score;

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("stopBtn").addEventListener("click", endGame);
document.getElementById("muteBtn").addEventListener("click", muteToggle);
document.getElementById("greenBtn").addEventListener("click", greenClick);
document.getElementById("redBtn").addEventListener("click", redClick);
document.getElementById("yellowBtn").addEventListener("click", yellowClick);
document.getElementById("blueBtn").addEventListener("click", blueClick);

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//Picks a random color 
function pickRandomColor()
{
    let num = Math.floor(Math.random() * 4);
    return (num == 0 ? "green" : num == 1 ? "red"
            : num == 2 ? "yellow" : "blue");
}

//Adds a random color to the memory array
function pickAndAddColor()
{
    colorOrder.push(pickRandomColor());
}

//Animates a single square
function animate(colorId, colorChangedTo, continueAnimate = false, nextIndex = 0)
{
    let id = null;
    const elem = document.getElementById(colorId);
    let prevColor = elem.style.backgroundColor;
    let start = Date.now();
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame()
    {
        let timePassed = Date.now() - start;

        if(timePassed >= 700)
        {
            elem.style.backgroundColor = prevColor;
            clearInterval(id);
            if(continueAnimate)
            {
                animateColorOrder(nextIndex);
            }
        }else if(timePassed >= 200){
            elem.style.backgroundColor = colorChangedTo;
            if(!isMuted)
            {
                selectSound.play();
            }
            if(timePassed >= 350)
            {
                selectSound.stop();
            }
        }
    }
}

function animateColorOrder(index)
{   
    if(index >= colorOrder.length)
    {
        waitingSelection = true;
        return;
    }

    switch(colorOrder[index])
    {
        case "green":
            animate("greenBtn", "#2ba147", true, index + 1);
            break;
        case "red":
            animate("redBtn", "#a12b37", true, index + 1);
            break;
        case "yellow":
            animate("yellowBtn", "#c6c900", true, index + 1);
            break;
        case "blue":
            animate("blueBtn", "#007ec7", true, index + 1);
            break;
    }  
}

function pickAndAnimate()
{
    selectionIndex = 0;
    selectionOrder = [];
    pickAndAddColor();
    animateColorOrder(0);
}

function muteToggle()
{
    isMuted = !isMuted;
}

function increaseAndDisplayScore()
{
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function greenClick()
{
    if(waitingSelection)
    {
        waitingSelection = false;
        selectionOrder.push("green");
        selectionIndex = selectionOrder.length - 1;
        checkWinOrLose(selectionIndex);
    }
}

function redClick()
{
    if(waitingSelection)
    {
        waitingSelection = false;
        selectionOrder.push("red");
        selectionIndex = selectionOrder.length - 1;
        checkWinOrLose(selectionIndex);
    }
}

function yellowClick()
{
    if(waitingSelection)
    {
        waitingSelection = false;
        selectionOrder.push("yellow");
        selectionIndex = selectionOrder.length - 1;
        checkWinOrLose(selectionIndex);
    }
}

function blueClick()
{
    if(waitingSelection)
    {
        waitingSelection = false;
        selectionOrder.push("blue");
        selectionIndex = selectionOrder.length - 1;
        checkWinOrLose(selectionIndex);
    }
}

function checkWinOrLose(index)
{
    if(selectionIndex < colorOrder.length - 1)
    {
        if(selectionOrder[selectionIndex] != colorOrder[selectionIndex])
        {
            endGame();
            if(!isMuted)
            {
                loseSound.play();
            }
        }
        else{
            waitingSelection = true;
            if(!isMuted)
            {
                winSound.play();
            }
        }
    }
    else{
        if(selectionOrder[selectionIndex] != colorOrder[selectionIndex])
        {
            endGame();
            if(!isMuted)
            {
                loseSound.play();
            }
        }else{
            increaseAndDisplayScore();
            pickAndAnimate();
            if(!isMuted)
            {
                winSound.play();
            }
        }
    }
}

function startGame()
{
    endGame();

    winSound = new sound("selectcorrect.wav");
    loseSound = new sound("lose.wav");
    selectSound = new sound("select.wav");
    
    pickAndAnimate();
}

function endGame()
{
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    colorOrder = [];
    waitingSelection = false;
    selectionOrder = [];
    selectionIndex = 0;
}

