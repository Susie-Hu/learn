window.onload=function(){
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function table_add(city,score){
 	var table = document.getElementById("aqi-table");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	var btn = document.createElement("button")
	var txt1 = document.createTextNode(city);
	var txt2 = document.createTextNode(score);
	var txt3 = document.createTextNode("删除");
	td1.appendChild(txt1);
	td2.appendChild(txt2);
	btn.appendChild(txt3);
	td3.appendChild(btn);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	table.appendChild(tr);
 }
function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var score = document.getElementById("aqi-value-input");
	aqiData["city"]=city.value;
	aqiData["score"]=score.value;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	table_add(aqiData["city"],aqiData["score"]);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(id) {
  // do sth.
  var child = document.getElementById(id);
  child.parentNode.parentNode.removeChild();
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick = function(){addBtnHandle();};
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
}