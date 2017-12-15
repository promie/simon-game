
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const RED = 'RED';
const BLUE = 'BLUE';
const YELLOW = 'YELLOW';
const GREEN = 'GREEN';


const simonObject = {
    sendColour: function(colour){
        console.log(`New Colour: ${colour}`)
    }
}


//Click Events
greenButton.addEventListener('click', function(){
    simonObject.sendColour(GREEN);
});

red.addEventListener('click', function(){
    simonObject.sendColour(RED);
});

yellow.addEventListener('click', function(){
    simonObject.sendColour(YELLOW);
});

blue.addEventListener('click', function(){
    simonObject.sendColour(BLUE);
});






