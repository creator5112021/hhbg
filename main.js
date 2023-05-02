previous_result = ""

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  net = ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw() {
  image(video,0,0,300,300)
  net.classify(video, gotResult)
}

function modelLoaded() {
console.log("model loaded")
}

function gotResult(error, result) {
  if(error) {
    console.log(error)
  }
  else {
    if ((result[0].confidence > 0.5) && (previous_result != result[0].label)) {

      previous_result = result[0].label
      synth = window.speechSynthesis
      utter_this = result[0].label
      speech = new SpeechSynthesisUtterance(utter_this)
      synth.speak(speech)
      document.getElementById("desa").innerHTML = result[0].label
      
    }
  }
}

