$(document).ready(function(){
  $("button").click(function(event){
    $("button").addClass('started')
  })
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'airhornStart.mp3');
  audioElement.setAttribute('preload', 'auto');
  //audioElement.load()

  $.get();

  audioElement.addEventListener("load", function() {
    audioElement.play();
  }, true);

  $('.play').click(function() {
    audioElement.play();
  });

})
