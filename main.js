Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
    flip_horiz: true
})

camera = document.getElementById("camera")
Webcam.attach("#camera")


function clickpic() {
    Webcam.snap(
        function (data_uri) {
            document.getElementById("snapshot").innerHTML = "<img id='captured_image' src=' " + data_uri + "'>";
        }
    )
}


console.log("ml5:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EvnOGkaLT/model.json", model_loaded)

function model_loaded() {
    console.log("Model loaded successfully!!! ")
}

function checkpic() {
    img = document.getElementById("captured_image")
    classifier.classify(img, r_l)
}

function r_l(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("o_name").innerHTML = results[0].label
        percentage = results[0].confidence.toFixed(3)
        per = percentage* 100
        document.getElementById("o_accuracy").innerHTML = per + "%"
    }

}