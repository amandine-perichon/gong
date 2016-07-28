$(document).ready(function(){

  $("button").click(function(){

    // simulated time period for testing
    var delay = 5000

    // execute finish audio and change text of button to 'start'
    setTimeout(function playFinishTune() {
      var tune = 'airhorn.mp3';
      playAudio(tune);
      console.log("playing end tune");
      $('.gong').text("Start")
    }, delay);

  })

  // play audio tune
  function playAudio(tune){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', tune);
    audioElement.setAttribute('preload', 'auto');
    audioElement.play();
  }

  // plays start tune on button click
  $('.gong').click(function() {
    var tune = 'bellSound.mp3';
    playAudio(tune)
    console.log("playing start tune");
    $(this).text("Stop")
  });

})
