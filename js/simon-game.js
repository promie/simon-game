//Variables
userSeq = [];
simonSeq = [];
const NUM_OF_LEVELS = 20;
let id, colour, level = 0;
let boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green
	"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
	"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
	"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
]


//Start Board game
$(document).ready(function(){

    $('#start').on('click', function(){
        level++;
        simonSequence();
    });

    //user pad listener;
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
            userSeq= [];
            simonSequence();
        }

        //Checking for winners
        if(userSeq.length == NUM_OF_LEVELS){
            $('#white').text('Y');
        }

    });

});

// Checking user sequence against simons
function checkUserSequence(){
    for(var i = 0; i < userSeq.length; i++) {
        if(userSeq[i] != simonSeq[i]) {      
          return false;
        }
      }
      return true;
}

//Display Error
function displayError(){

    console.log('error!');

    let counter = 0;
    let myError = setInterval(function(){
        $('#white').text('--');
        counter++;
        if(counter == 3){
            $('#white').text(level);
            clearInterval(myError);
            userSeq = [];
            counter = 0;
        }
    }, 500);
}


//Simon sequence 
function simonSequence(){
    
    console.log(level);
    $('#white').text(level);
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
function getRandomNum(){
    let random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}

//add Temporary Class and sound

function addClassSound(id, colour){
    $('#'+id).addClass(colour + '-active');
    playSound(id);
    setTimeout (function(){
        $('#'+id).removeClass(colour + '-active');
    },500);
}

//play board sound
function playSound(id){
    var sound = new Audio(boardSound[id]);

    sound.play();
}




//On-Off Function
const onOFF = () =>{
    const status = document.getElementById('on-off');
    
    if(!status.checked){
        document.querySelector('.title').innerHTML = 'OFF';
    }else{
        document.querySelector('.title').innerHTML = 'ON';
    }
}