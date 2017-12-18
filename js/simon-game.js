$(document).ready(function() {
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
      $("div:not(.btn)").unbind();
      array = []; turn = 0; j = 0; arrayCheck = [];   
      randomizer();
      displaySet(array);
      checkIds();
    }
  
    $(".start").click(function() {
      strict = false;
      $(this).css('color', 'green');
      $('.strict').css('color', 'black');
      reset();
    });
    
    $(".strict").click(function(){
      strict = true;
      $(this).css('color', 'red');
      $('.start').css('color', 'black');
      reset();    
    });
  
  });