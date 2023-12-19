function changePage(offset) {
    currentPage += offset;
    updateBackgroundThumbnails();
}

function getCurrentOpacity() {
    var opacitySlider = document.getElementById('backgroundOpacitySlider');
    return parseFloat(opacitySlider.value);
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('mainMenuBtn').addEventListener('click', function() {
        var addMenu = document.getElementById('addMenu');
        addMenu.style.display = addMenu.style.display === 'none' ? 'block' : 'none';
    });



// popup for add text

document.getElementById('addTextBtn').addEventListener('click', function() {
    document.getElementById('addTextPopup').style.display = 'block';
});
// function closeAddTextPopup() {
//     document.getElementById('addTextPopup').style.display = 'none';
// }
});  

function addTextToCanvas() {
    var text = document.getElementById('textArea').value;
    var textColor = document.getElementById('textColor').value;
    var selectedFont = document.getElementById('fontSelector').value;

    if (text.trim() !== "") {
        var fabricText = new fabric.IText(text, {
            left: canvas.width / 2,
            top: canvas.height / 2.5,
            fontSize: 20,
            fill: textColor,
            fontFamily: selectedFont, 
            selectable: true,
            dynamicMinWidth: 50,
            splitByGrapheme: false // 确保文本不自动换行
        });

        // 文本变化时调整文本框宽度
        fabricText.on('changed', function() {
            var textWidth = fabricText.calcTextWidth();
            fabricText.set('width', Math.max(fabricText.dynamicMinWidth, textWidth));
            canvas.requestRenderAll();
        });

        canvas.add(fabricText);
        canvas.bringToFront(fabricText);
        document.getElementById('addTextPopup').style.display = 'none';
        closeAddTextPopup();
    }
}




function closeAddTextPopup() {
    document.getElementById('addTextPopup').style.display = 'none';
}






function deleteSelectedObject() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
    }
}



//edit text / shapes
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('modifyBtn').addEventListener('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            // check if Itext or textbox
            if (activeObject.type === 'i-text' || activeObject.type === 'textbox') {
                document.getElementById('modifyPopup').style.display = 'block';
                document.getElementById('colorPickerPopup').style.display = 'none';
            } else {
                document.getElementById('colorPickerPopup').style.display = 'block';
                document.getElementById('modifyPopup').style.display = 'none';
            }
        }
    });
    

});



function openModifyPopup() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text' || activeObject.type === 'textbox') {
        var modifyTextArea = document.getElementById('modifyTextArea');
        var modifyFontSelector = document.getElementById('modifyFontSelector');

        modifyTextArea.value = activeObject.text;
        modifyFontSelector.value = activeObject.fontFamily || 'Arial'; 
        document.getElementById('modifyPopup').style.display = 'block';
    }
}


function modifySelectedText() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text' || activeObject.type === 'textbox') {
        var newText = document.getElementById('modifyTextArea').value;
        var newTextColor = document.getElementById('modifyTextColor').value;
        var newFont = document.getElementById('modifyFontSelector').value;

        activeObject.set({
            text: newText,
            fill: newTextColor,
            fontFamily: newFont
        });

        //Redrawing Text 
        activeObject.set("text", activeObject.text + " "); 
        activeObject.set("text", activeObject.text.trim()); 

        canvas.renderAll();
        document.getElementById('modifyPopup').style.display = 'none';
    }
}

function showBackgroundPopup() {
    var background = canvas.backgroundImage;
    var opacitySlider = document.getElementById('backgroundOpacitySlider');
    var opacityValue = document.getElementById('backgroundOpacityValue');

    if (background) {
        opacitySlider.value = background.opacity;
        opacityValue.textContent = Math.round(background.opacity * 100) + '%';
    } else {
        opacitySlider.value = 1; 
        opacityValue.textContent = '100%';
    }



    document.getElementById('backgroundPopup').style.display = 'block';

}

function closeBackgroundPopup() {
    document.getElementById('backgroundPopup').style.display = 'none';
}

function changeBackground(index) {
    currentBackground = index;
    canvas.clear();
    updateBackground();

    addDefaultText();

    closeBackgroundPopup();
}


// Bg upload
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadBackgroundImage').addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (event) {
                var currentOpacity = getCurrentOpacity();


                fabric.Image.fromURL(event.target.result, function (img) {
                    var imgRatio = img.width / img.height;
                    var canvasRatio = canvas.width / canvas.height;
                    var scale = canvasRatio >= imgRatio ? canvas.height / img.height : canvas.width / img.width;

                    img.set({
                        opacity: currentOpacity,
                        originX: 'left',
                        originY: 'top',
                        scaleX: scale,
                        scaleY: scale
                    });

                    
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                    scaleCanvasObjects(scale); // Adjust elements
                    canvas.renderAll();
                });
            };

            reader.readAsDataURL(e.target.files[0]); 
        }
        canvas.clear();
        addDefaultText();
        addLogoToCanvas();
        addtkText();
        closeBackgroundPopup();
        canvas.renderAll;

        setTimeout(function() {
            e.target.value = '';
        }, 100);
    });
});


// Default Text
function addDefaultText() {
    var textColor = '#000000'; 
    var selectedFont = 'Arial'; 
    var fabricText = new fabric.Textbox(defaultText, {
        left: canvas.width / 2,
        top: canvas.height / 2,
        fontSize: 20,
        fill: textColor,
        fontFamily: selectedFont, 
        selectable: true,
        dynamicMinWidth: 50,
        splitByGrapheme: false
    });
    

    canvas.add(fabricText);
    canvas.bringToFront(fabricText);
}

//thank you
function addtkText() {
    var textColor = '#E0111A'; 
    var selectedFont = 'Ephesis'; 
    var fabricText = new fabric.IText('文本和图片请随意拖动', {
        left: canvas.width / 2,
        top: canvas.height / 2.5,
        fontSize: 20,
        fill: textColor,
        fontFamily: selectedFont, 
        selectable: true,
        dynamicMinWidth: 50,
        splitByGrapheme: false
    });

    canvas.add(fabricText);
    canvas.bringToFront(fabricText);
}




function closeBackgroundPopup() {
document.getElementById('backgroundPopup').style.display = 'none';
}

// change bg


function updateBackground(imageUrl) {  
    var currentOpacity = getCurrentOpacity();

    fabric.Image.fromURL(imageUrl, function (img) {
        // check img
        if (!img) {
            console.error('Failed to load image: ' + imageUrl);
            return;
        }

        var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        img.set({
            opacity: currentOpacity,
            originX: 'left',
            originY: 'top',
            scaleX: scale,
            scaleY: scale
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            scaleX: scale,
            scaleY: scale
        });
        canvas.renderAll();
    });
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadImage').addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (event) {
                var imgObj = new Image();
                imgObj.src = event.target.result;
    
                imgObj.onload = function () {
    
                    var fabricImage = new fabric.Image(imgObj, {
                        left: 50,
                        top: 50,
                        angle: 0,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                    canvas.add(fabricImage); 
                    canvas.renderAll();
                    canvas.bringToFront(fabricImage);
                };
            };
    
            reader.readAsDataURL(e.target.files[0]);
        }
    });
});


 


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('downloadBtn').addEventListener('click', function () {
        var canvasURL = canvas.toDataURL('image/png'); 
        var link = document.createElement('a'); 
        link.download = 'canvas.png';
        link.href = canvasURL; 
        link.click();
    });
});



//change bg transparent
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('backgroundOpacitySlider').addEventListener('input', function() {
    var opacity = parseFloat(this.value);
    updateBackgroundOpacity(opacity);
});
function updateBackgroundOpacity(opacity) {
    var background = canvas.backgroundImage;
    if (background) {
        background.opacity = opacity;
        canvas.renderAll();
    }
    document.getElementById('backgroundOpacityValue').textContent = Math.round(opacity * 100) + '%';
}
});



