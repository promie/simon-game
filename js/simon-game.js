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
        console.log(`New Colour: ${colour}`)
    },
    sequence: [],
    colours: [GREEN, RED, YELLOW, BLUE],
    nextSequence: function(){
        const randNum = Math.floor(Math.random() * this.colours.length)
        const nextColour = this.colours[randNum];
        console.log(`The random colour is: ${nextColour}`);
    }
}

greenButton.addEventListener('click', function(){
    simonObject.sendColour(GREEN);
    playSound(GREEN);
});

red.addEventListener('click', function(){
    simonObject.sendColour(RED);
    playSound(RED);
});

yellow.addEventListener('click', function(){
    simonObject.sendColour(YELLOW);
    playSound(YELLOW);
});

blue.addEventListener('click', function(){
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






