var OpacityControl = (function() {
    var canvas;

    function init(fabricCanvas) {
        canvas = fabricCanvas;
    }

    function getCurrentOpacity() {
        var opacitySlider = document.getElementById('opacitySlider');
        return opacitySlider ? parseFloat(opacitySlider.value) : 1;
    }

    function updateOpacity() {
        var opacity = getCurrentOpacity();
        var object = canvas.getActiveObject();

        if (object) {
            object.set('opacity', opacity);
            canvas.renderAll();
        }
    }

    function setupSlider(sliderId) {
        var opacitySlider = document.getElementById(sliderId);
        if (opacitySlider) {
            opacitySlider.addEventListener('input', function() {
                updateOpacity();
                document.getElementById('opacityValue').textContent = Math.round(this.value * 100) + '%';
            });
        }
    }

    return {
        init: init,
        setupSlider: setupSlider
    };
})();

//add shapes
document.getElementById('addShapeBtn').addEventListener('click', function() {
    var shapeMenu = document.getElementById('shapeMenu');
    shapeMenu.style.display = shapeMenu.style.display === 'none' ? 'block' : 'none';
});

function addShape(shapeType) {
    var shape;
    var cornerRadius = parseInt(document.getElementById('cornerRadiusInput').value) || 0;

    switch (shapeType) {
        case 'square':
            shape = new fabric.Rect({ width: 50, height: 50, rx: cornerRadius, ry: cornerRadius });
            break;
        case 'rectangle':
            shape = new fabric.Rect({ width: 100, height: 50, rx: cornerRadius, ry: cornerRadius });
            break;
        case 'triangle':
            shape = new fabric.Triangle({ width: 50, height: 50 });
            break;
        case 'circle':
            shape = new fabric.Circle({ radius: 25 });
            break;
        case 'star':
            // 五角星的创建可能需要更复杂的逻辑
            shape = createStar();
            break;
    }

    canvas.add(shape);
}

function createStar() {
    // 创建五角星的逻辑（需要自行实现）
}

