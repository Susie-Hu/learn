window.onload = function(){
	var data

	function addData(){
		//是否需要添加数据校验
		//获取输入框的数据，去掉数据两端的空格
		data = document.getElementById("kw").value.trim();
	}
	function writeDataLine(fp,txt){

	}
	function readDataLine(fp){

	}

	function addDataRow(txt,id){
	    var tr = document.createElement("tr");
	    tr.setAttribute("class","dataRow");
	    tr.setAttribute("id",id);
	    var td1 = document.createElement("td");
	    var td2 = document.createElement("td");
	    var td3 = document.createElement("td");

	    var txt1 = document.createTextNode(txt);
	    var checkbox = document.createElement("input");
	    checkbox.setAttribute("type","checkbox");
	    var btn = document.createElement("button");
	    btn.setAttribute("name","check")
	    var btntxt = document.createTextNode("查询");
	    btn.appendChild(btntxt);

	    // btn.setAttribute("onclick",addBtnHandle1("this"));

	    td1.appendChild(txt1);
	    td2.appendChild(checkbox);
	    td3.appendChild(btn);
	    
	    tr.appendChild(td1);
	    tr.appendChild(td2);
	    tr.appendChild(td3);
	    return tr
	    // var table = document.getElementById("aqi-table");
	    // table.appendChild(tr);
	}
	//使用table的insertRow()代替
	function addResponseRow (txt){
		var tr = document.createElement("tr");
	    tr.setAttribute("class","responseRow");
	    var td = document.createElement("td");
	    td.setAttribute("colspan","2");
	    var txt = document.createTextNode(txt);

	    td.appendChild(txt);
	    tr.appendChild(td);
	    return tr
	}

	function packUpResponse(tr){
		tr.parentNode.removeChild(tr);
	}

	// 渲染表格
	function renderTable(button){
		var table = document.getElementById("dataTable");
		if ( button == undefined ){
			if (data != ''){
				var id = document.getElementsByName("check").length;
				table.appendChild(addDataRow(data,id));
				// //添加响应
				// table.insertBefore(obj,addResponseRow());
			}
		}
		else{
			if ( data != ''){
				// table.appendChild(addDataRow(data));
				//添加响应
				// table.insertBefore(obj,addResponseRow());
				tr = button.parentNode.parentNode;
				idResult = tr.getAttribute("id")+"Result";
				//如果存在result,则替换txt，负责新建一行
				if (document.getElementById(idResult)){
					result = document.getElementById(idResult);
					result.cells[0].innerHTML = data;
				}
				else{
					row = tr.rowIndex;
					newRow = table.insertRow(row);
					// alert(row)
					col1 = newRow.insertCell(0);
					col2 = newRow.insertCell(1);
					col1.setAttribute("colspan","2");
					col1.innerHTML = data;
					var btn = document.createElement("button");
					var txt = document.createTextNode("收起");
					btn.setAttribute("name","Packup")
					btn.appendChild(txt);
					col2.appendChild(btn);
					newRow.setAttribute("id",idResult);
				}
			}
		}
		
	}
	function addBtnHandle(){
		addData();
		renderTable();
	}
	function addBtnCheck(button){
		addData();
		renderTable(button);

		tr = button.parentNode.parentNode;
		idResult = tr.getAttribute("id")+"Result";

		packUp = document.getElementById(idResult);
		packUp.onclick = function(){
			packUpResponse(this);
		}
	}
	function init(){
		var btn = document.getElementById("add");
		btn.onclick = function (){
			addBtnHandle();
			var btnList = document.getElementsByName("check");
			if (btnList.length > 0){
        		btnList[btnList.length-1].onclick = function(){
        			addBtnCheck(this);
        		}
			}
      }

	}
	init();

}