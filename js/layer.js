document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('layerButton').addEventListener('click', function() {
        document.getElementById('Layerpopup').style.display = 'flex';
    });

});


document.getElementById('bringToFront').addEventListener('click', function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringToFront(activeObject);
        canvas.renderAll();
    }
});

document.getElementById('sendToBack').addEventListener('click', function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendToBack(activeObject);
        canvas.renderAll();
    }
});

document.getElementById('bringForward').addEventListener('click', function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringForward(activeObject);
        canvas.renderAll();
    }
});

document.getElementById('sendBackwards').addEventListener('click', function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendBackwards(activeObject);
        canvas.renderAll();
    }
});


