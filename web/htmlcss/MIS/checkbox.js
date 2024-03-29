

var checkboxWrapper = document.getElementById("checkbox-wrapper");
var regionWrapper = document.getElementById("region-wrapper");
var productWrapper = document.getElementById("product-wrapper");
var regionCheckboxObj = [{
    value: "华东",
    text: "华东"
}, {
    value: "华南",
    text: "华南"
}, {
    value: "华北",
    text: "华北"
}]

var productCheckboxObj = [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}]

creatCheckBox(regionWrapper, regionCheckboxObj);

creatCheckBox(productWrapper, productCheckboxObj);

function creatCheckBox(checkBoxWrapper, objData) {
    //生成全选，<label for='id'>全选</label>  <input type='checkbox' checkbox-type='all' id=''>
    var id=checkBoxWrapper.id + 'all';
    var checkAllLabel=document.createElement('label');
    checkAllLabel.innerHTML='全部';
    checkAllLabel.setAttribute('for',id);
    checkBoxWrapper.appendChild(checkAllLabel);
    var checkAll = document.createElement('input');
    checkAll.setAttribute('type','checkbox');
    checkAll.setAttribute('id',id);
    checkAll.setAttribute('checkbox-type','all');          //自定义一个属性;
    checkBoxWrapper.appendChild(checkAll);
    //for循环生成子选项

    var checks = []; //子选项容器

    for (let i = 0; i < objData.length; i++) {
        var dataId = objData[i].value; //value值作为id
        var checkLabel = document.createElement("label");
        checkLabel.setAttribute("for", dataId);
        checkLabel.innerHTML = objData[i].text;
        checkBoxWrapper.appendChild(checkLabel);
        var childBox = document.createElement("input");
        childBox.setAttribute("type", "checkbox");
        childBox.setAttribute("value", objData[i].value);
        childBox.setAttribute("checkbox-type", "child");
        childBox.setAttribute("id", dataId);
        checkBoxWrapper.appendChild(childBox);
        checks.push(childBox);
    }

    checks[0].checked = true; //默认选中第一项
    checkBoxWrapper.onclick = function (event) {
        var target = event.target;
        var numChecked = 0; //计算选中了几项

        if (target.type == "checkbox") {
            var attribute = target.getAttribute("checkbox-type"); //读取自定义属性
            if (attribute == "all") {         //假如点击并选中全选复选框，则全部选中
                if (target.checked == true) { 
                    for (let j = 0; j < checks.length; j++) {
                        checks[j].checked = true; 
                    }
                } else { //点击取消全选复选框时，留下默认的情况，即第一个复选框被选中
                    for (let j = 0; j < checks.length; j++) {
                        if (j == 0) {
                            checks[j].checked = true; 

                        } else {
                            checks[j].checked = false; //除第一个之外全部取消

                        }
                    }
                }
            }
            for (let j = 0; j < checks.length; j++) {
                if (checks[j].checked == true) {
                    numChecked++;
                }
            }
            if (attribute == "child") {  //对全选这个选项未进行点击时，是否选中的判断
                if (numChecked == 3) {
                    checkAll.checked = true;
                }
                if (numChecked < 3) {
                    checkAll.checked = false;
                }
                if (numChecked == 0) {
                    numChecked = 1;
                    target.checked = true; //设置默认选中一项，剩余一项阻止，此时计数0
                }
            }
        }
    }
}