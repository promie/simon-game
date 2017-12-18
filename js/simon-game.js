//Variables
userSeq = [];
simonSeq = [];
let isON = false;
const NUM_OF_LEVELS = 20;
let id, colour, level = 0;
const boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green
	"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
	"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
	"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
]
const start = document.getElementById('start');
const whitePad = document.getElementById('white');
const green = document.getElementById('0');
const red = document.getElementById('1');
const yellow = document.getElementById('2');
const blue = document.getElementById('3');
const success = document.getElementById('success');
const fail = document.getElementById('fail');
const reset = document.getElementById('reset');
const levelNum = document.getElementById('level-num');
const failNum = document.getElementById('fail-num');
const control = document.getElementById('control');

//Start Board game
$(document).ready(function(){

    if(isON !== false){
        init();
    }else{
        changeColorBackground('grey');
    }

});

//Start Game
const startGame = () =>{
    start.addEventListener('click', function(){
        level++;
        levelNum.innerHTML = level;
        simonSequence();
        reset.style.display = 'block';
        this.style.display = 'none';
        control.style.display = 'none';
    })
}

//userPadListener
const userPad = () =>{

    $('.pad').click(function(){
        id = $(this).attr('id');
        colour = $(this).attr('class').split(' ')[1];
        userSeq.push(id);
        console.log(id + ' ' + colour);
        addClassSound(id, colour);
        
        //Checking user sequence
        if(!checkUserSequence()){
            displayError();
            userSeq = [];
        }

        //checking end of sequence
        if(userSeq.length === simonSeq.length && userSeq.length < NUM_OF_LEVELS){
            level++
            levelNum.innerHTML = level;
            userSeq= [];
            simonSequence();
        }

        //Checking for winners
        if(userSeq.length == NUM_OF_LEVELS){
            whitePad.innerHTML = 'Y';
        }
    });
}

// Checking user sequence against simons
const checkUserSequence = () =>{
    for(var i = 0; i < userSeq.length; i++) {
        if(userSeq[i] != simonSeq[i]) {      
          return false;
        }
      }
      return true;
}

//Display Error
const displayError = () =>{
    console.log('error!');
    let counter = 0;
    let myError = setInterval(function(){
        whitePad.innerHTML = '--';
        counter++;
        if(counter == 3){
            whitePad.innerHTML = level;
            clearInterval(myError);
            userSeq = [];
            counter = 0;
        }
    }, 500);
}


//Simon sequence 
const simonSequence = () =>{
    console.log(level);

    whitePad.innerHTML = level;
    levelNum.innerHTML = level;
    getRandomNum();
    let i = 0;
    let myInterval = setInterval(function(){
        id = simonSeq[i];
        colour = $('#'+id).attr('class').split(' ')[1];
        console.log(id + ' ' + colour);
        addClassSound(id, colour);
        i++
        if(i === simonSeq.length){
            clearInterval(myInterval);
        }
    }, 1000);
}

//Generate Random number
const getRandomNum = () =>{
    const random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}

//add Temporary Class and sound
const addClassSound = (id, colour) =>{
    let element = document.getElementById(`${id}`);
    element.classList.add(`${colour}-active`);
    playSound(id);

    setTimeout(function(){
        element.classList.remove(`${colour}-active`);
    }, 500);
}

//play board sound
const playSound = (id) =>{
    const sound = new Audio(boardSound[id]);
    sound.play();
}

//On-Off Function
const init = () =>{
    const status = document.getElementById('on-off');
    
    if(!status.checked){
        console.log('OFF');
        isON = false;
        changeColorBackground('grey');
        hideControl();
    }else{
        console.log('ON');
        isON = true;
        changeColorBackground('normal');
        displayControl('block');
        startGame();
        userPad();  
    }
}

//Change Background Colour
const changeColorBackground = (colour) =>{
    switch(colour){
        case 'grey':
            green.style.backgroundColor = `${colour}`;
            red.style.backgroundColor = `${colour}`;
            yellow.style.backgroundColor = `${colour}`;
            blue.style.backgroundColor = `${colour}`;
            break;
        case 'normal':
            green.style.backgroundColor = '#0a0';
            red.style.backgroundColor = 'red';
            yellow.style.backgroundColor = 'yellow';
            blue.style.backgroundColor = 'blue';
    }
} 

// show the display()

const displayControl = (type) =>{
    success.style.display = `inline-${type}`;
    fail.style.display = `inline-${type}`;
    start.style.display = `${type}`;
}

const hideControl = () =>{
    success.style.display = 'none';
    fail.style.display = 'none';
    start.style.display = 'none'; 
    reset.style.display = 'none';
}

//reset Button
reset.addEventListener('click', function(){
    control.style.display = 'block';
    this.style.display = 'none';
    start.style.display = 'block';    
});
