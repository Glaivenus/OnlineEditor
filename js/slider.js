var zoomLevel = 1;

document.getElementById('zoomInBtn').addEventListener('click', function() {
    zoomLevel *= 1.1;  // 放大 10%
    canvas.setZoom(zoomLevel);
});

document.getElementById('zoomOutBtn').addEventListener('click', function() {
    zoomLevel /= 1.1;  // 缩小 10%
    canvas.setZoom(zoomLevel);
});


var isPanning = false;
var lastPanPoint;

canvas.on('mouse:down', function(options) {
    if (options.e.altKey === true) { // 可以改为按下特定按钮时启用
        isPanning = true;
        lastPanPoint = canvas.getPointer(options.e);
        canvas.selection = false; // 禁用选择
    }
});

canvas.on('mouse:move', function(options) {
    if (isPanning && lastPanPoint) {
        var currentPoint = canvas.getPointer(options.e);
        var deltaX = currentPoint.x - lastPanPoint.x;
        var deltaY = currentPoint.y - lastPanPoint.y;
        canvas.relativePan({ x: deltaX, y: deltaY });
        lastPanPoint = currentPoint;
    }
});

canvas.on('mouse:up', function() {
    isPanning = false;
    lastPanPoint = null;
    canvas.selection = true; // 重新启用选择
});
