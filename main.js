Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_Snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '">';
    });
}

console.log("ml5 version = " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zq2452G73/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model is Loaded");
}

prediction1 = "";
prediction2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The First Prediction is" + prediction1;
    speakData2 = "And the Second Prediction is " + prediction2;
    var utter_this = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utter_this);

}

function check() {
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
if (error) {
    console.log(error);
}
else{
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML=result[0].label;
    document.getElementById("result_emotion_name2").innerHTML=result[1].label;

    prediction1=result[0].label;
    prediction2=result[1].label;
    speak();

    if (result[0].label=='Happy') {
        document.getElementById("update_emoji").innerHTML="&#128522;";
    }

    if (result[0].label=='Sad') {
        document.getElementById("upadate_emoji").innerHTML="&#128532;";
    }

    if (result[0].label=='Angry') {
        document.getElementById("update_emoji").innerHTML="&#128545;";
    }

    if (result[1].label=='Happy') {
        document.getElementById("update_emoji2").innerHTML="&#128522;";
    }

    if (result[1].label=='Sad') {
        document.getElementById("update_emoji2").innerHTML="&#128532;";
    }

    if (result[1].label=='Angry') {
        document.getElementById("update_emoji2").innerHTML="&#128545;";
    }
}

}
