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
