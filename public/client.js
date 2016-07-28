$(document).ready(function(){

  // simulated time period for testing
  var delay = 120000

// diplays initial/default time on page
  $('.duration').text(convertToMin(delay))

  $(".gong").click(function(){

    // Play start sound
    var startTune = 'bellSound.mp3'
    playAudio(startTune)
    console.log("playing start tune")
    $(this).text("Stop")

    // execute finish audio and change text of button to 'start'
    setTimeout(function playFinishTune() {
      var endTune = 'airhorn.mp3';
      playAudio(endTune);
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

// button up increment and display
$('.button-up').click(function(){
  if (delay < 3600000) {
  delay+= 60000
  $('.duration').text(convertToMin(delay))
}
})

//button down decrement and display
$('.button-down').click(function(){
  if (delay > 60000) {
    delay-= 60000
    $('.duration').text(convertToMin(delay))
  }
})

// convert millseconds to minutes and format
function convertToMin(delay) {
  var min = delay/60000
  return ("0" + min.toString()).slice(-2) + ":" + "00"
}


})
