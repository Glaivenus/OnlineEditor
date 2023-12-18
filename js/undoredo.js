var saveOperateList = [];
var deleteOperateList = [];
var operIndex = -1;
var maxOperateLen = 5; // 限制操作记录的长度

function saveOperate() {
    const json = JSON.stringify(canvas.toJSON());

    // 清理删除操作列表并更新保存操作列表
    if (deleteOperateList.length > 0) {
        saveOperateList = saveOperateList.filter((_, index) => !deleteOperateList.includes(index));
        deleteOperateList = [];
    }
    
    saveOperateList.push(json);
    operIndex = saveOperateList.length - 1;

    // 限制操作记录长度
    if (saveOperateList.length > maxOperateLen) {
        saveOperateList.shift();
        operIndex--;
    }
}


function undoOperate() {
    if (operIndex > 0) {
        canvas.loadFromJSON(JSON.parse(saveOperateList[operIndex - 1]), canvas.renderAll.bind(canvas));
        if (!deleteOperateList.includes(operIndex - 1)) {
            deleteOperateList.push(operIndex);
        }
        operIndex -= 1;
    }
}


function redoOperate() {
    if (operIndex + 1 < saveOperateList.length) {
        canvas.loadFromJSON(JSON.parse(saveOperateList[operIndex + 1]), canvas.renderAll.bind(canvas));
        const index = deleteOperateList.indexOf(operIndex + 1);
        if (index !== -1) {
            deleteOperateList.splice(index, 1);
        }
        operIndex += 1;
    }
}


canvas.on('object:modified', saveOperate);
canvas.on('object:added', saveOperate);
canvas.on('object:removed', saveOperate);
