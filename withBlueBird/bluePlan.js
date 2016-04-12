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
	//请求
	var txtRes
	function getResult(){
		txtRes='';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onload = function(){
			if (xmlhttp.status >=200 && xmlhttp.status < 300 ||xmlhttp.status == 304){
				txtRes = xmlhttp.responseText;
				// renderTable(txtResult);
				alert(txtRes);
			}else{
				alert("Request was unsuccessful:"+xhr.status);
			}
		}
		xmlhttp.open("GET","./json/1.json",true);
		xmlhttp.send();
	}
	// $(function(){
	// 	$.ajax({
	// 		type:"GET",
	// 		url:"./json/1.json",
	// 		success:renderTable($('#resText'));
	// 	})
	// })

	function addDataRow(txt,id){
	    var tr = document.createElement("tr");
	    tr.setAttribute("class","dataRow");
	    tr.setAttribute("id",id);
	    var td1 = document.createElement("td");
	    var td2 = document.createElement("td");
	    var td3 = document.createElement("td");
	    var td4 = document.createElement("td");

	    td1.setAttribute("class","td0");
	    td2.setAttribute("class","td1");
	    td3.setAttribute("class","td2");
	    td4.setAttribute("class","td3");

	    var txt1 = document.createTextNode(txt);
	    var checkbox = document.createElement("input");
	    checkbox.setAttribute("type","checkbox");
	    var btn = document.createElement("button");
	    btn.setAttribute("name","check")
	    var btntxt = document.createTextNode("查询");
	    btn.appendChild(btntxt);

	    // 添加删除功能
	    var div = document.createElement("div");
	    div.setAttribute("style","background-color:red;;border-radius:50%;border:solid red 1px;display:inline-block");
	    div.setAttribute("name","delete");
	    var txt2 = document.createTextNode("X");
	    div.appendChild(txt2);

	    td1.appendChild(txt1);
	    td2.appendChild(checkbox);
	    td3.appendChild(btn);
	    td4.appendChild(div);
	    
	    tr.appendChild(td1);
	    tr.appendChild(td2);
	    tr.appendChild(td3);
	    tr.appendChild(td4);
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
	function packUpResponse(td){
		tr = td.parentNode;
		table = tr.parentNode;
		table.removeChild(tr);
	}

	function btnDelete(button){
		td = button.parentNode;
		tr = td.parentNode;
		table = tr.parentNode;
		table.removeChild(tr); 
		tr = button.parentNode.parentNode;
		idResult = tr.getAttribute("id")+"Result";
		//如果查询结果存在，删除这条查询时，也要同时删除结果
		if (document.getElementById(idResult)){
			tr = document.getElementById(idResult);
			tr.parentNode.removeChild(tr);
		}
	}

	// 渲染表格
	function renderTable(button){
		var table = document.getElementById("dataTable");
		//添加数据时，没有传递参数
		if ( button == undefined ){
			if (data != ''){
				var id = document.getElementsByName("check").length;
				table.appendChild(addDataRow(data,id));
				// //添加响应
				// table.insertBefore(obj,addResponseRow());
			}
		}
		//添加查询结果
		else{
			// if ( data != ''){
			// table.appendChild(addDataRow(data));
			//添加响应
			// table.insertBefore(obj,addResponseRow());
			// 判断结果行是否存在，存在修改文本，不存在新建一行
			tr = button.parentNode.parentNode;
			idResult = tr.getAttribute("id")+"Result";
			//如果存在result,则替换txt，负责新建一行
			if (document.getElementById(idResult)){
				result = document.getElementById(idResult);
				//添加result内容
				result.cells[0].innerHTML = "结果：";
			}
			else{
				//新建一行，但是为什么win下的chrome不支持rowIndex呢
				row = tr.rowIndex + 1;
				newRow = table.insertRow(row);
				// row的值一直为-1
				// alert(row)
				col1 = newRow.insertCell(0);
				col2 = newRow.insertCell(1);
				idResultTxt = idResult+"Txt"
				col1.setAttribute("colspan","2");
				col1.setAttribute("id",idResultTxt);
				col1.innerHTML = "结果：";
				var btn = document.createElement("button");
				var txt = document.createTextNode("收起");
				btn.setAttribute("name","Packup")
				btn.appendChild(txt);
				col2.appendChild(btn);
				newRow.setAttribute("id",idResult);
				newRow.setAttribute("class","dateResult");
			}
			// }
		}
		
	}
	function addBtnHandle(){
		addData();
		renderTable();
	}
	function btnCheck(button){
		//addData();
		renderTable(button);
		// getResult();
		// $(function(){
		// 	$.ajax({
		// 		type:"GET",
		// 		url:"./json/1.json",
		// 		success:renderTable($('#resText'));
		// 	})
		// })
		//给收起按钮添加点击事件
		tr = button.parentNode.parentNode;
		idResult = tr.getAttribute("id")+"Result";
		idResultTxt = idResult + "Txt"

		// 给结果填充内容
		// $('#'+idResultTxt).load('./json/1.json');
		css_locator = '#'+idResultTxt;
		$(css_locator).load('./json/1.json');

		packUpdr = document.getElementById(idResult);
		//怎么获取packUp行的button
		packUp = packUpdr.cells[1];
		packUp.onclick = function(){
			packUpResponse(this);
			// btnDelete(this);
		}
	}
	function init(){
		var btn = document.getElementById("add");
		btn.onclick = function (){
			addBtnHandle();
			//给查询按钮添加点击事件
			var btnList = document.getElementsByName("check");
			if (btnList.length > 0){
        		btnList[btnList.length-1].onclick = function(){
        			btnCheck(this);
        		}
			}
			//给删除按钮添加点击事件
			var delList = document.getElementsByName("delete");
			if (delList.length > 0){
        		delList[delList.length-1].onclick = function(){
        			btnDelete(this);
        		}
			}
      }

	}
	init();

}