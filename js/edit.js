//edit text / shapes
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('modifyBtn').addEventListener('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            // Check if single textbox
            if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
                document.getElementById('modifyPopup').style.display = 'block';
                document.getElementById('colorPickerPopup').style.display = 'none';
            } 
            // check if several textbox
            else if (activeObject.type === 'activeSelection') {
                // if all text box
                var allText = activeObject.getObjects().every(obj => obj.type === 'i-text' || obj.type === 'textbox');
                if (allText) {
                    document.getElementById('modifyPopup').style.display = 'block';
                    document.getElementById('colorPickerPopup').style.display = 'none';
                    document.getElementById('modifyTextArea').style.display = 'none';
                } else {
                    // if have other element:
                    document.getElementById('modifyPopup').style.display = 'none';
                }
            } else {
                document.getElementById('colorPickerPopup').style.display = 'block';
                document.getElementById('modifyPopup').style.display = 'none';
            }
        }
    });
});

function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    // check is single textbox
    if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
        var newText = document.getElementById('modifyTextArea').value;
        var newTextColor = document.getElementById('modifyTextColor').value;
        var newFont = document.getElementById('modifyFontSelector').value;

        activeObject.set({
            text: newText,
            fill: newTextColor,
            fontFamily: newFont
        });

        // re draw
        activeObject.set("text", activeObject.text + " "); 
        activeObject.set("text", activeObject.text.trim()); 
    }
    // check if several textbox
    else if (activeObject && activeObject.type === 'activeSelection') {
        var newTextColor = document.getElementById('modifyTextColor').value;
        var newFont = document.getElementById('modifyFontSelector').value;

        activeObject.forEachObject(function(obj) {
            if (obj.type === 'i-text' || obj.type === 'textbox') {
                obj.set({
                    fill: newTextColor,
                    fontFamily: newFont
                });
            }
        });
    }

    canvas.renderAll();
    document.getElementById('modifyPopup').style.display = 'none';
}
