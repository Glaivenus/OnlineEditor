//add shapes
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addShapeBtn').addEventListener('click', function() {
        document.getElementById('shapePopup').style.display = 'flex';
    });

});
function closeShapePopup() {
    document.getElementById('shapePopup').style.display = 'none';
}


function addShape(shapeType) {
    var shape;
    var cornerRadius = parseInt(document.getElementById('cornerRadiusInput').value) || 0;

    switch (shapeType) {
        case 'square':
            shape = new fabric.Rect({
                width: 100,
                height: 100,
                fill: 'green',
                left: 50,
                top: 50,
                rx: cornerRadius,
                ry: cornerRadius
            });
            break;
        case 'rectangle':
            shape = new fabric.Rect({
                width: 150,
                height: 100,
                fill: 'blue',
                left: 50,
                top: 50,
                rx: cornerRadius,
                ry: cornerRadius
            });
            break;
        case 'triangle':
            shape = new fabric.Triangle({
                width: 100,
                height: 100,
                fill: 'yellow',
                left: 50,
                top: 50
            });
            break;
        case 'circle':
            shape = new fabric.Circle({
                radius: 50,
                fill: 'red',
                left: 50,
                top: 50
            });
            break;
        case 'star':
            shape = createStar();
            break;
    }

    canvas.add(shape);
}

function createStar() {
    var star = new fabric.Polygon([
        { x: 350, y: 75 },
        { x: 380, y: 160 },
        { x: 470, y: 160 },
        { x: 400, y: 215 },
        { x: 423, y: 301 },
        { x: 350, y: 250 },
        { x: 277, y: 301 },
        { x: 300, y: 215 },
        { x: 230, y: 160 },
        { x: 320, y: 160 }
    ], {
        top: 50,
        left: 50,
        fill: 'orange'
    });
    return star;
}
