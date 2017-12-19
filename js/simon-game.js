$(document).ready(function () {

  playSimon();

});

let array = [],
  strict = false,
  arrayCheck = [],
  turn = 0,
  divs = ["0", "1", "2", "3"],
  j = 0,
  greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  failSound = new Audio('https://www.soundjay.com/misc/fail-buzzer-04.mp3'),
  successSound = new Audio('http://soundbible.com/grab.php?id=1003&type=mp3');

const green = document.getElementById('0');
const red = document.getElementById('1');
const yellow = document.getElementById('2');
const blue = document.getElementById('3');
const white = document.getElementById('white');
const pads = $(".col-xs-6");
const unam = $("div:not(.btn)");
const startButton = document.getElementById('start');
const strictButton = document.getElementById('strict');


const playSimon = () => {
  const stopDisplay = () => {
    green.style.background = '#0a0';
    red.style.background = 'red';
    yellow.style.background = 'yellow';
    blue.style.background = 'blue';
  }

  const randomizer = () => {
    turn++;
    white.innerHTML = turn;
    const random = Math.floor(Math.random() * divs.length);
    array.push(divs[random]);
    displaySet(array);
  }

  const currentDisplay = (colour) => {
    switch (colour) {
      case "0":
        green.style.background = 'darkgreen';
        greenAudio.play();
        break;
      case "1":
        red.style.background = 'darkred';
        redAudio.play();
        break;
      case "2":
        yellow.style.background = '#e6d47e';
        yellowAudio.play();
        break;
      case "3":
        blue.style.background = 'darkblue';
        blueAudio.play();
        break;
    }
    window.setTimeout(function () {
      stopDisplay();
    }, 200);
  }

  const displaySet = (array) => {
    let i = 0;
    const interval = setInterval(function () {
      currentDisplay(array[i]);
      i++;
      if (i >= array.length) {
        clearInterval(interval);
      }
    }, 650);
  }

  const checkIds = () => {
    pads.on('click', function () {
      const ID = $(this).attr('id');
      currentDisplay(ID);
      arrayCheck.push(ID);
      if (ID !== array[j]) {
        j = 0;
        white.innerHTML = 'X';
        failSound.play();
        pads.unbind();
        if (strict) {
          return false;
        }
        setTimeout(function () {
          white.innerHTML = turn;
          displaySet(array);
          checkIds();
        }, 1000);
      } else if (typeof array[20] !== 'undefined') {
        alert('winner!');
        pads.unbind();
      } else if (typeof array[j + 1] === 'undefined') {
        pads.unbind();
        setTimeout(function () {
          successSound.play();
          j = 0;
          randomizer();
          checkIds();
        }, 1500);
      } else {
        j++;
      }
    });
  }

  const reset = () => {
    stopDisplay();
    unam.unbind();
    array = [];
    turn = 0;
    j = 0;
    arrayCheck = [];
    randomizer();
    displaySet(array);
    checkIds();
  }

  startButton.addEventListener('click', function () {
    strict = false;
    this.style.color = 'green';
    strictButton.style.color = 'black';
    reset();
  });

  strictButton.addEventListener('click', function () {
    strict = true;
    this.style.color = 'red';
    startButton.style.color = 'black';
    reset();
  });

}
