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


































/*

const greenButton = document.getElementById('green'),
    redButton = document.getElementById('red'),
    yellowButton = document.getElementById('yellow'),
    blueButton = document.getElementById('blue'),
    greenSound = document.getElementById('green-sound'),
    redSound = document.getElementById('red-sound'),
    yellowSound = document.getElementById('yellow-sound'),
    blueSound = document.getElementById('blue-sound'),
    RED = 'RED',
    BLUE = 'BLUE',
    YELLOW = 'YELLOW',
    GREEN = 'GREEN';

const simonObject = {
    sendColour: function(colour){

        if(this.sequence.length === 0){
            // Start a new game
            this.nextSequence();
        }else{

            if(colour === this.sequence[this.step]){
                //Go to the next step
                if(this.step === this.sequence.length - 1){
                    console.log('Sequence Complete');
                    this.step = 0;
                    this.nextSequence();
                }else{
                    this.step++;
                }
            }else{
                //!! Lose Condition
                alert('WRONG!!!');
                this.sequence = [];
                this.step = 0;
            }
        }
    },
    sequence: [],
    colours: [GREEN, RED, YELLOW, BLUE],
    step: 0,
    nextSequence: function(){
        const randNum = Math.floor(Math.random() * this.colours.length)
        const nextColour = this.colours[randNum];
        this.sequence.push(nextColour);
        console.log(this.sequence);
    }
}


greenButton.addEventListener('click', function(){
    simonObject.sendColour(GREEN);
    playSound(GREEN);
});

redButton.addEventListener('click', function(){
    simonObject.sendColour(RED);
    playSound(RED);
});

yellowButton.addEventListener('click', function(){
    simonObject.sendColour(YELLOW);
    playSound(YELLOW);
});

blueButton.addEventListener('click', function(){
    simonObject.sendColour(BLUE);
    playSound(BLUE);
});

const playSound = (colour) =>{
    switch(colour){
        case 'GREEN':
            greenSound.play();
            break;
        case 'RED':
            redSound.play();
            break;
        case 'YELLOW':
            yellowSound.play();
            break;
        case 'BLUE':
            blueSound.play();
            break;
        default:
            break;
    }
}

const toggle = () =>{
    document.querySelector('.toggle-btn').addEventListener('click', function(){
        
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.title').html('POWER OFF');
        }else{
            $(this).addClass('active');
            $('.title').html('POWER ON');
        }
    });
}


*/


