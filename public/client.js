$(document).ready(function(){

  // simulated time period for testing
  var delay = 120000
  var d = new Date()
  var epoch = d.getTime()
  console.log(epoch)

// diplays initial/default time on page
  $('.duration').text(convertToMin(delay))

  $(".gong").click(function(){

    // var newD = new Date()
    d = new Date()
    epoch = d.getTime()
    // var newEpoch = newD.getTime()
    console.log(epoch)
    // console.log(d.getTime())

    // Play start sound
    var startTune = 'gong.mp3'
    playAudio(startTune)
    console.log("playing start tune")
    $(this).text("Stop")

    // execute finish audio and change text of button to 'start'
    setTimeout(function playFinishTune() {
      var endTune = 'gong.mp3';
      playAudio(endTune);
      console.log("playing end tune");
      $('.gong').text("Start")
    }, delay);

  })

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

$('.submit').click(function(){
  console.log(delay)
  console.log(epoch)
  $.ajax({
     type: 'POST',
     url: 'http://localhost:3000/result',
     dataType: 'json',
     data: {
        duration: delay,
        epoch: epoch
     },
     error: function () {
      console.log('OH NOOOOO ... POST')
     },
     cache: false
  })
})

$('.history').click(function(){
  $.ajax({
     type: 'GET',
     url: 'http://localhost:3000/history',
     dataType: 'html',
     success: function(data) {
       console.log(data)
       $(".logged-in").after(data)
     },
     error: function () {
      console.log('OH NOOOOO ... History')
     },
     cache: false
  })
})

// play audio tune
function playAudio(tune){
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', tune);
  audioElement.setAttribute('preload', 'auto');
  audioElement.play();
}

// convert millseconds to minutes and format
function convertToMin(delay) {
  var min = delay/60000
  return ("0" + min.toString()).slice(-2) + ":" + "00"
}

})
