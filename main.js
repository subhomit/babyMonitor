alarm_sound="";
objects = [];

function preload(){
    alarm_sound = loadSound("alarmsound.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded!");
    object_Detector.detect(video,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,380,380);
    object_Detector.detect(video,gotResults);
    for(i = 0; i < objects.length; i++){
        if(objects[i].label = "person"){
            document.getElementById("status").innerHTML = "Baby Detected";
            alarm_sound.stop();
        }
        else{
            document.getElementById("status").innerHTML = "Baby Not Detected";
            alarm_sound.play();
        }
    }
    if(objects.length = 0){
        document.getElementById("status").innerHTML = "Baby Not Detected";
        alarm_sound.play();
    }
    else{
        document.getElementById("objectsNum").innerHTML = "Number of Babies Detected = " + objects.length;
    }
}