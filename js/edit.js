//edit text / shapes
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('modifyBtn').addEventListener('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
            document.getElementById('modifyTextArea').value = activeObject.text;
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


    document.getElementById('modifyBtn').addEventListener('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
                // 显示单个文本框的字号
                document.getElementById('fontSizeInput').value = activeObject.fontSize;
            } else if (activeObject.type === 'activeSelection') {
                // 检查是否所有文本框的字号相同
                var fontSize = activeObject.getObjects()[0].fontSize;
                var allSameFontSize = activeObject.getObjects().every(obj => obj.fontSize === fontSize);
    
                document.getElementById('fontSizeInput').value = allSameFontSize ? fontSize : '';
            }
            // 显示弹窗
            document.getElementById('modifyPopup').style.display = 'block';
        }
    });

    

});

function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    var newText = document.getElementById('modifyTextArea').value;
    var newTextColor = document.getElementById('modifyTextColor').value;
    var newFont = document.getElementById('modifyFontSelector').value;
    var newFontSize = parseInt(document.getElementById('fontSizeInput').value);

    if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
        var updateOptions = {
            fill: newTextColor,
            fontFamily: newFont,
            fontSize: newFontSize
        };
        // 仅当 newText 非空时更新文本内容
        if (newText.trim() !== "") {
            updateOptions.text = newText;
        }
        activeObject.set(updateOptions);
    } else if (activeObject && activeObject.type === 'activeSelection') {
        activeObject.forEachObject(function(obj) {
            if (obj.type === 'i-text' || obj.type === 'textbox') {
                obj.set({
                    fill: newTextColor,
                    fontFamily: newFont,
                    fontSize: newFontSize
                });
            }
        });
    }

    canvas.renderAll();
    document.getElementById('modifyPopup').style.display = 'none';
}

