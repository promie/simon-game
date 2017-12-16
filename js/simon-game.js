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






