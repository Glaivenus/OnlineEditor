document.addEventListener('DOMContentLoaded', function () {

    canvas.on('selection:created', function() {
        var activeObject = canvas.getActiveObject();
        console.log('Object selected:', activeObject);
        updateToolbar(activeObject);
    });
    
    canvas.on('selection:updated', function() {
        var activeObject = canvas.getActiveObject();
        console.log('Selection updated:', activeObject);
        updateToolbar(activeObject);
    });
    
    canvas.on('selection:cleared', function() {
        console.log('Selection cleared');
        updateToolbar(null);
    });
    
    

    function updateToolbar(selectedObject) {
        var textTools = document.getElementById('text-tools');


        var opacitySliderContainer = document.getElementById('opacitySliderContainer');
        if (selectedObject && (selectedObject.type === 'i-text' || selectedObject.type === 'image')) {
            opacitySliderContainer.style.display = 'block';
        } else {
            opacitySliderContainer.style.display = 'none';
        }
        
        
        if (!textTools || !opacitySliderContainer) {
            console.error('Toolbar elements not found');
            return;
        }
    
        // 检查选中的对象是否为文本框或图片，并相应更新工具栏
        if (selectedObject && (selectedObject.type === 'i-text' || selectedObject.type === 'textbox')) {
            
                // 初始化颜色选择器和字体选择器的值
                document.getElementById('modifyTextColor').value = selectedObject.fill;
                document.getElementById('modifyFontSelector').value = selectedObject.fontFamily;
            
            textTools.style.display = 'block';
            opacitySliderContainer.style.display = 'block';
        } else if (selectedObject && selectedObject.type === 'image') {
            textTools.style.display = 'none';
            opacitySliderContainer.style.display = 'block';
        } else {
            textTools.style.display = 'none';
            opacitySliderContainer.style.display = 'none';
        }
    }


    
    
        



});  