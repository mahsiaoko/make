var tableHead = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var tableWrapper = document.getElementById("table-wrapper");

//渲染数据
function renderTable(data) {
    tableWrapper.innerHTML = ""; //清除上次的数据
    var table = document.createElement("table");
    table.setAttribute("id", "mytable");
    tableWrapper.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);


    //添加表头
    for (let i = 0; i < tableHead.length; i++) {
        th = document.createElement('th');
        th.innerHTML = tableHead[i];
        tr.appendChild(th);
    }

    //添加表单内其他元素
    for (let i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (x in data[i]) { //遍历对象的属性x
            if (data[i].hasOwnProperty(x)) {    //确保实例属性
                if (x == "product" || x == "region") {          //{product: "手机",region: "华东",sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]}
                    var td = document.createElement("td");
                    td.innerHTML = data[i][x];
                    tr.appendChild(td);
                } else {
                    for (let j = 0; j < data[i][x].length; j++) { //data[i]对象的的第三个属性sale是数组，对齐进行遍历填充
                        var td = document.createElement("td");
                        //var inputData = document.createElement("input"),
                           //button = document.createElement("button");
                        //button.setAttribute("type", "button");
                        //button.innerHTML = "保存";
                        //td.appendChild(button);
                        //inputData.setAttribute("value", data[i][x][j]);
                        //td.appendChild(inputData);
                        td.innerHTML = data[i][x][j];
                        tr.appendChild(td);
                    }
                }
            }
        }
    }
}

// 表格显示调整，合并单元格
function tableDisplayOpt() {
    var table = document.getElementById("mytable");
    var regoinCheckedNum = getCheckedItem(regionArr).length;
    var productCheckedNum = getCheckedItem(productArr).length;

    // 当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，把商品列合并，留一个商品名称
    if (productCheckedNum == 1 && regoinCheckedNum > 1) {
        for (let i = 1; i < regoinCheckedNum + 1; i++) {
            if (i == 1) {
                table.rows[i].cells[0].setAttribute('rowspan', regoinCheckedNum);
            } else {
                table.rows[i].cells[0].setAttribute('style', 'display:none');
            }
        }
    }
    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，把地区列合并，留一个地区名称
    if (productCheckedNum > 1 && regoinCheckedNum == 1) {
        for (let i = 0; i < productCheckedNum; i++) {
            var tem = table.rows[i].cells[0];
            table.rows[i].cells[0] = table.rows[i].cells[1];
            table.rows[i].cells[1] = tem;
        }
        for (let i = 1; i < productCheckedNum + 1; i++) {
            if (i == 1) {
                table.rows[i].cells[0].setAttribute('rowspan',productCheckedNum);
            }else{
                table.rows[i].cells[0].setAttribute('style','display:none');
            }
        }
    }
    //当商品和地区都选择了多于一个，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
    if(productCheckedNum > 1 && regoinCheckedNum > 1){
        for(let i = 0;i<table.rows.length;i++){
            if(i % regoinCheckedNum ==1){
                table.rows[i].cells[0].setAttribute('rowspan',regoinCheckedNum);
            }else if(i!=0){
                table.rows[i].cells[0].setAttribute('style','display:none');
            }
        }
    }
}