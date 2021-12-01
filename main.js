prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result_div").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 Version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0JNYvlyZX/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "And the Second Prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Amazing") {
            document.getElementById("result_gesture_name").innerHTML = "Amazing!";
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "Good") {
            document.getElementById("result_gesture_name").innerHTML = "Good!";
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "OK") {
            document.getElementById("result_gesture_name").innerHTML = "OK!";
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Bad") {
            document.getElementById("result_gesture_name").innerHTML = "Bad";
            document.getElementById("update_gesture").innerHTML = "&#128078;"
        }
        if(results[0].label == "Fist") {
            document.getElementById("result_gesture_name").innerHTML = "Fist Punch";
            document.getElementById("update_gesture").innerHTML = "&#9994;";
        }
        if(results[1].label == "Amazing") {
            document.getElementById("result_gesture_name2").innerHTML = "Amazing!";
            document.getElementById("update_gesture2").innerHTML = "&#128076;";
        }
        if(results[1].label == "Good") {
            document.getElementById("result_gesture_name2").innerHTML = "Good!";
            document.getElementById("update_gesture2").innerHTML = "&#128077;";
        }
        if(results[1].label == "OK") {
            document.getElementById("result_gesture_name2").innerHTML = "OK!";
            document.getElementById("update_gesture2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Bad") {
            document.getElementById("result_gesture_name2").innerHTML = "Bad";
            document.getElementById("update_gesture2").innerHTML = "&#128078;";
        }
        if(results[1].label == "Fist") {
            document.getElementById("result_gesture_name2").innerHTML = "Fist Punch";
            document.getElementById("update_gesture2").innerHTML = "&#9994;";
        }
    }
}