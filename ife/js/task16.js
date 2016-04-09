window.onload = function(){
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
  function errorInfo(obj,info,id){
    var p = document.createElement("p");
    var txt = document.createTextNode(info);
    p.appendChild(txt);
    p.setAttribute("id",id)
    p.setAttribute("style","color:red;display:inline")
    obj.parentNode.appendChild(p);
  }

  function deleteErrorInfo(obj){
    obj.parentNode.removeChild(obj);
  }
  function addAqiData() {
    aqiData["city"] = null;
    aqiData["score"] = null;
    var cityobj = document.getElementById("aqi-city-input");
    var scoreobj = document.getElementById("aqi-value-input");
    city = cityobj.value.trim();
    score = scoreobj.value.trim();
    // 待添加校验
    var regchinese = /[^\u0000-\u00FF]/
    var regNum = /^[0-9]*$/
    if (regchinese.test(city) && city != ''){
      aqiData["city"] = city;
      if (document.getElementById("cityErrorInfo")) {
        deleteErrorInfo(document.getElementById("cityErrorInfo"))
      };
    }
    else{
      //错误提示信息
      // alert("请输入中文");
      if(!document.getElementById("cityErrorInfo")){
        errorInfo(cityobj,"请输入中文城市名！","cityErrorInfo")
      }
    }
    if (regNum.test(score) && score != ''){
      aqiData["score"] = score;
      if(document.getElementById("scoreErrorInfo")){
        deleteErrorInfo(document.getElementById("scoreErrorInfo"))
      }
    }
    else{
      // alert("请输入数字");
      if(!document.getElementById("scoreErrorInfo")){
        errorInfo(scoreobj,"请输入数字空气质量数！","scoreErrorInfo")
      }
    }
  }

  function addrow(city,value,operator){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var txt1 = document.createTextNode(city);
    var txt2 = document.createTextNode(value);
    var txt3 = document.createTextNode(operator);
    td1.appendChild(txt1);
    td2.appendChild(txt2);
    if (operator == "操作"){
      td3.appendChild(txt3);
    }
    else{
      var btn = document.createElement("button");
      btn.setAttribute("name","delete")
      btn.appendChild(txt3);
      td3.appendChild(btn);
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    return tr
    // var table = document.getElementById("aqi-table");
    // table.appendChild(tr);
  }
  function deleterow(button){
    td = button.parentNode;
    tr = td.parentNode;
    tr.parentNode.removeChild(tr);
  }
  /**
   * 渲染aqi-table表格
   */
   // 使用flag标记是增加还是删除
   // 使用tablerows来判断是否需要添加表头
  function renderAqiList(flag,button) {
    if (flag == "add") {
      undefined = undefined;
      if (aqiData["city"] != undefined && aqiData["score"] != undefined) {
        var table = document.getElementById("aqi-table");
        tableRows = table.rows.length;
        // alert(tableRows);
        if (tableRows == 0){
          table.appendChild(addrow("城市","质量","操作"));
          table.appendChild(addrow(aqiData["city"],aqiData["score"],"删除"));
        }
        else{
          table.appendChild(addrow(aqiData["city"],aqiData["score"],"删除"));
        }
      }
    }
    else if(flag == "delete"){
      deleterow(button);
    }
    else{
      alert("发生错误！");
    }
    

  }

  /**
   * 点击add-btn时的处理逻辑
   * 获取用户输入，更新数据，并进行页面呈现的更新
   */
  function addBtnHandle() {
    addAqiData();
    renderAqiList("add");
  }

  /**
   * 点击各个删除按钮的时候的处理逻辑
   * 获取哪个城市数据被删，删除数据，更新表格显示
   */
  function delBtnHandle(obj) {
    // do sth.
    // alert(obj)
    // alert("delete")
    renderAqiList("delete",obj);
  }

  function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = function () {
      addBtnHandle();

      var btnList = document.getElementsByName("delete");
      // for (var i = btnList.length - 1; i >= 0; i--) {
      //   btnList[i].onclick = function(){
      //     delBtnHandle();
      //   }
      // }
      //给当前添加的一行添加删除按钮事件
      // 使用this传递被点击button元素
      if (btnList.length > 0){
        btnList[btnList.length-1].onclick = function(){
          delBtnHandle(this);
        }
        // alert(btnList.length)
      }
      
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数


  }

  init();
}



