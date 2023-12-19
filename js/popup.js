
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addShapeBtn').addEventListener('click', function() {
        document.getElementById('shapePopup').style.display = 'block';
    });
});



canvas.on('selection:created', function(event) {
    var selectedObject = event.target;
    if (selectedObject && selectedObject.type !== 'image') { // 检查是否为图形，而不是图片
        document.getElementById('colorPickerPopup').style.display = 'block';
    }
});

canvas.on('selection:updated', function(event) {
    var selectedObject = event.target;
    if (selectedObject && selectedObject.type !== 'image') { 
        document.getElementById('colorPickerPopup').style.display = 'block';
    }
});


function applyColor() {
    var color = document.getElementById('colorPicker').value;
    var activeObject = canvas.getActiveObject();

    if (activeObject) {
        activeObject.set('fill', color);
        canvas.renderAll();
    }

    document.getElementById('colorPickerPopup').style.display = 'none';
}

function closepopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}


// duiqi
document.getElementById('alignButton').addEventListener('click', function() {
    if (canvas.getActiveObject() && canvas.getActiveObject().type === 'activeSelection') {
        document.getElementById('alignPopup').style.display = 'block';
    }
});


document.getElementById('alignLeft').addEventListener('click', alignLeft);
document.getElementById('alignTop').addEventListener('click', alignTop);
document.getElementById('alignCenter').addEventListener('click', alignCenter);
document.getElementById('alignHorizontal').addEventListener('click', alignHorizontal);
// 为其他按钮绑定监听器...

function alignLeft() {
    var activeObjects = canvas.getActiveObject();
    if (activeObjects && activeObjects.type === 'activeSelection') {
        var groupBoundingRect = activeObjects.getBoundingRect(true);

        activeObjects.forEachObject(function(el) {
            var left = groupBoundingRect.left - activeObjects.left;
            el.set({ left: left });
            el.setCoords();
        });

        canvas.requestRenderAll();
    }
}


function alignTop() {
    var activeObjects = canvas.getActiveObject();
    if (activeObjects && activeObjects.type === 'activeSelection') {
        var groupBoundingRect = activeObjects.getBoundingRect(true);

        activeObjects.forEachObject(function(object) {
            var top = groupBoundingRect.top - activeObjects.top;
            object.set({ top: top });
            object.setCoords();
        });

        canvas.requestRenderAll();
    }
}




function alignCenter() {
    var activeObjects = canvas.getActiveObject();
    if (activeObjects && activeObjects.type === 'activeSelection') {
        var groupBoundingRect = activeObjects.getBoundingRect(true);

        activeObjects.forEachObject(function(el) {
            var scaledWidth = el.width * el.scaleX;
            var left = groupBoundingRect.left - activeObjects.left - scaledWidth / 2;
            el.set({ left: left });
            el.setCoords();
        });

        canvas.requestRenderAll();
    }
}


