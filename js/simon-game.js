
$(document).ready(function() {

    changeColorBackground('grey');
    hideControl();
    init();
  
  });




  const start = document.getElementById('start');
  const whitePad = document.getElementById('white');
  const green = document.getElementById('0');
  const red = document.getElementById('1');
  const yellow = document.getElementById('2');
  const blue = document.getElementById('3');
  const success = document.getElementById('success');
  const fail = document.getElementById('fail');
  const strict = document.getElementById('strict');
  const levelNum = document.getElementById('level-num');
  const failNum = document.getElementById('fail-num');
  const control = document.getElementById('control');
  const github = document.getElementById('github');
  
  //sound
  const failSound = document.getElementById('fail-sound');
  const powerON = document.getElementById('power-on');
  const powerOFF = document.getElementById('power-off');
  let isON = false;

  //On-Off Function
  const init = () =>{
    const status = document.getElementById('on-off');


    
    if(status.checked === false){
        isON = false;
        powerOffSound();
        console.log('POWER OFF');
        changeColorBackground('grey');
        hideControl();

    }else{
        powerOnSound();
        console.log('POWER ON');
        changeColorBackground('normal');
        displayControl('block');
        codeDump();
    }
}

const powerOnSound = () =>{
    powerON.play();
}

const powerOffSound = () => {
    powerOFF.play();
}



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
    start.style.display = `inline-${type}`;
    strict.style.display = `inline-${type}`;
}

const hideControl = () =>{
    success.style.display = 'none';
    fail.style.display = 'none';
    start.style.display = 'none'; 
    strict.style.display = 'none';
    github.style.display = 'block';
}

const codeDump = () =>{
    var array = [],
    strict = false,
    arrayCheck = [],
    turn = 0,
    divs = ["0", "1", "2", "3"],
    j = 0,
    greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");



  // set colors back to normal
  function stopDisplay() {
    $("#0").css("background", "#0a0");
    $("#1").css("background", "red");
    $("#2").css("background", "yellow");
    $("#3").css("background", "blue");
  }

  function randomizer() { // add random button
    turn++;    
    $("#white").text(turn);
    var length = $(".col-xs-6").length;
    var random = Math.floor(Math.random() * length);
    array.push(divs[random]);
    displaySet(array);
  }
  // change colors
  function currentDisplay(color) {
    switch (color) {
      case "0":
        $("#0").css("background", "darkgreen");
        greenAudio.play();
        break;
      case "1":
        $("#1").css("background", "darkred");
        redAudio.play();
        break;
      case "2":
        $("#2").css("background", "#e6d47e");
        yellowAudio.play();
        break;
      case "3":
        $("#3").css("background", "darkblue");
        blueAudio.play();
        break;
    }
    window.setTimeout(function() {
      stopDisplay();
    }, 200);
  }

  function displaySet(array) {
    var i = 0;
    var interval = setInterval(function() {
      currentDisplay(array[i]);
      i++;
      if (i >= array.length) {
        clearInterval(interval);
      }
    }, 650);
  }

  function checkIds() {
    $(".col-xs-6").click(function() {
      var ID = $(this).attr("id");
      currentDisplay(ID);
      arrayCheck.push(ID);
      // if wrong button unbind and display error
      if (ID !== array[j]) {
        j = 0;
        $("#white").text("X");
        $(".col-xs-6").unbind();
        if(strict){
          return false;
        }
        setTimeout(function() {
          $("#white").text(turn);
          displaySet(array);
          checkIds();
        }, 1000);

      } else if (typeof array[20] !== 'undefined'){
        $(".col-xs-6").unbind();
        $(".text").show();
        
      } else if(typeof array[j+1] === 'undefined'){
        $(".col-xs-6").unbind();
        setTimeout(function() {
          j=0;
          randomizer();
          checkIds();
        }, 1000);
      }
      else{
        j++;
      }
    });
  }  
  
  function reset(){
    stopDisplay();
    //$("div:not(.btn)").unbind();
    array = []; turn = 0; j = 0; arrayCheck = [];
    $(".text").hide();    
    randomizer();
    displaySet(array);
    checkIds();
  }

  $(".start").click(function() {
    strict = false;
    document.getElementById('strict').style.color = 'black';
    this.style.color = 'green';
    reset();
  });
  
  $("#strict").click(function(){
    strict = true;
    start.style.color = 'black';
    this.style.color = 'red';
    reset();    
  });

}






/* ORIGINAL CODE


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
const strict = document.getElementById('strict');
const levelNum = document.getElementById('level-num');
const failNum = document.getElementById('fail-num');
const control = document.getElementById('control');
const github = document.getElementById('github');

//
const failSound = document.getElementById('fail-sound');
const powerON = document.getElementById('power-on');
const powerOFF = document.getElementById('power-off');



//Start Board game
$(document).ready(function(){

    if(isON){
        init();
    }else{
        changeColorBackground('grey');
    }

});

//Start Game
const startGame = () =>{
    
    if(isON){
        start.addEventListener('click', function(){
            level++;
            levelNum.innerHTML = level;
            simonSequence();
            strict.style.display = 'block';
            this.style.display = 'none';
            control.style.display = 'none';
        });    
    }
}

//userPadListener
const userPad = () =>{
    if(isON){
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

}

// Checking user sequence against simons
const checkUserSequence = () =>{
    if(isON){
        for(var i = 0; i < userSeq.length; i++) {
            if(userSeq[i] != simonSeq[i]) {      
              return false;
            }
          }
          return true;
    }
}

//Display Error
const displayError = () =>{

    if(isON){
        console.log('error!');
        let counter = 0;
        let myError = setInterval(function(){
            whitePad.innerHTML = '--';
            counter++;
            playFailSound();
            if(counter == 3){
                whitePad.innerHTML = level;
                clearInterval(myError);
                userSeq = [];
                counter = 0;
            }
        }, 500);
    }
}



//Simon sequence 
const simonSequence = () =>{
    if(isON){
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

}

//Generate Random number
const getRandomNum = () =>{
    if(isON){
        const random = Math.floor(Math.random() * 4);
        simonSeq.push(random);    
    }
}

//add Temporary Class and sound
const addClassSound = (id, colour) =>{
    if(isON){
        let element = document.getElementById(`${id}`);
        element.classList.add(`${colour}-active`);
        playSound(id);
    
        setTimeout(function(){
            element.classList.remove(`${colour}-active`);
        }, 500);    
    }
}

//play board sound
const playSound = (id) =>{
    if(isON){
        const sound = new Audio(boardSound[id]);
        sound.play();
    }

}

//On-Off Function
const init = () =>{
    const status = document.getElementById('on-off');
    
    if(!status.checked){
        console.log('OFF'); 
        changeColorBackground('grey');   
        hideControl();
        powerOffSound();
        isON = false;
        console.log(isON);

    }else{
        console.log('ON');
        powerOnSound();
        isON = true;
        console.log(isON);
        changeColorBackground('normal');
        displayControl('block');
        github.style.display = 'none';
        userSeq = [];
        simonSeq = [];
        level = 0;
        white.innerHTML = level;
        levelNum.innerHTML = level;
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
    start.style.display = `inline-${type}`;
    strict.style.display = `inline-${type}`;
}

const hideControl = () =>{
    success.style.display = 'none';
    fail.style.display = 'none';
    start.style.display = 'none'; 
    strict.style.display = 'none';
    github.style.display = 'block';
}

//strict Button
strict.addEventListener('click', function(){
    control.style.display = 'block';
    this.style.display = 'none';
    start.style.display = 'block';    
});

// Play Sound
const playFailSound = () =>{
    failSound.play();
}

const powerOnSound = () =>{
    powerON.play();
}

const powerOffSound = () => {
    powerOFF.play();
}

*/