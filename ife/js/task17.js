window.onload = function(){
  /* 数据格式演示
  var aqiSourceData = {
    "北京": {
      "2016-01-01": 10,
      "2016-01-02": 10,
      "2016-01-03": 10,
      "2016-01-04": 10
    }
  };
  */

  // 以下两个函数用于随机模拟生成测试数据
  function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
  }
  function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
      datStr = getDateStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);
      dat.setDate(dat.getDate() + 1);
    }
    return returnData;
  }

  var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
  };

  // 用于渲染图表的数据
  var chartData = {};

  // 记录当前页面的表单选项
  var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
  }
  
  // 新增一个柱子
   function addone(height,width,distance,value){
    var wrap = document.getElementById("chart");
    var div = document.createElement("div");
    //div.setAttribute("style","height:"+value+"px");
    div.setAttribute("style","background-color:blue;display:inline-block;margin-top:0px;margin-bottom:0;margin-left:0");
    div.style.height=height;
    // 设置宽度
    if (width > 20) {
      div.style.width=20;
    }
    else{
      div.style.width=width;
    }
    div.style.marginRight=distance;
    // 设置颜色
    if (height >= 400*0.8){
      div.style.backgroundColor="black";
    }
    else if (height >= 400*0.6 && height < 400*0.8) {
      div.style.backgroundColor="purple";
    }
    else if (height >= 400*0.4 && height < 400*0.6) {
      div.style.backgroundColor="red";
    }
    else if (height >= 400*0.2 && height < 400*0.4) {
      div.style.backgroundColor="blue";
    }
    else{
      div.style.backgroundColor="green";
    }
    div.setAttribute("name","chart");
    div.setAttribute("value",value);
    div.onmouseover = function(){
      document.title = div.getAttribute("value");
    }
    div.onmouseout = function(){
      document.title = "task17";
    }
    wrap.appendChild(div);
   }
  /**
   * 渲染图表
   */
  function renderChart() {
    //remove all
    var charts = document.getElementsByName("chart");
    for (var i = charts.length - 1; i >= 0; i--) {
      charts[i].parentNode.removeChild(charts[i]);
    }

    max=0;
    count=0;
    for (i in chartData){
      // document.write("北京"+aqiSourceData["北京"][x]+"<br/>")
      if (max < chartData[i]){
        max = chartData[i];
      }
      count++;
    }
    // alert(count)
    for ( x in chartData ){
      height = 400/max*chartData[x];
      width = 500*0.8/count;
      distance = 500*0.2/count;
      value = x + ":"+chartData[x];
      addone(height,width,distance,value);
    }
  }

  /**
   * 日、周、月的radio事件点击时的处理函数
   */
  function graTimeorcitySelectChange() {
    // 确定是否选项发生了变化
    // 获取时间间隔
    var graTime = document.getElementsByName("gra-time");
    var timeInterval
    for (var i = graTime.length - 1; i >= 0; i--) {
       if (graTime[i].checked) {
          timeInterval = graTime[i].value;
          // alert(timeInterval);
       } 
    } 
    //alert(timeInterval);
    // 获取当前的城市
    var selectCity = document.getElementById("city-select");
    var index = selectCity.selectedIndex;
    var city = selectCity[index].text;
    //alert(city);
    setChartData(city,timeInterval);

    // 调用图表渲染函数
    renderChart();
  }

  /**
   * select发生变化时的处理函数
   */
  // function citySelectChange() {
  //   // 确定是否选项发生了变化 

  //   // 获取时间间隔
  //   var graTime = document.getElementsByName("gra-time");
  //   var timeInterval
  //   for (var i = graTime.length - 1; i >= 0; i--) {
  //      if (graTime[i].checked) {
  //         timeInterval = graTime[i].value;
  //         // alert(timeInterval);
  //      } 
  //   } 
  //   // 获取当前的城市
  //   var selectCity = document.getElementById("city-select");
  //   var index = selectCity.selectedIndex;
  //   var city = selectCity[index].text;
  //   //alert(city);
  //   setChartData(city,timeInterval);

  //   // 调用图表渲染函数
  //   renderChart();
  //   // 设置对应数据

  //   // 调用图表渲染函数
  // }

  /**
   * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
   */
  function initGraTimeForm() {
      var graTime = document.getElementsByName("gra-time");
      for (var i = graTime.length - 1; i >= 0; i--) {
        graTime[i].onclick = function(){
          graTimeorcitySelectChange();
        }
      }
  }

  /**
   * 初始化城市Select下拉选择框中的选项
   */
  function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var selectCity = document.getElementById("city-select");
    selectCity.onchange = function(){
      graTimeorcitySelectChange();
    }

  }

  function setChartData(city,timeInterval){
    chartData = {};
    var numday = 0;
    var score = 0;
    if (timeInterval == "day") {
      for (date in aqiSourceData[city]){
        chartData[date] = aqiSourceData[city][date]
      }
    }
    else if (timeInterval == "week"){
      for (date1 in aqiSourceData[city]){
        var date = new Date(date1);
        var week = date.getDay()+1;
        numday++;
        score +=aqiSourceData[city][date1];
        if (week == 7){
          chartData[date1] = score/numday;
          numday = 0;
          score = 0;
        }
      }
      //添加最后一周的数据,如果最后一天不是周末
      if (week != 7){
        chartData[date1] = score/numday;
      }
    }
    else if (timeInterval == "month"){
      for (date1 in aqiSourceData[city]){
        var date = new Date(date1);
        var dateflag = date.getDate();
        if ( dateflag == 1) {
          flag = date.getFullYear()+"-"+date.getMonth();
          chartData[flag] = score/numday;
          numday = 1;
          score = aqiSourceData[city][date1];
        }
        else{
          numday++;
          score += aqiSourceData[city][date1];
        }
      }
      //添加最后一个月的数据
      nowMouth = date.getMonth()+1;
      flag = date.getFullYear()+"-"+nowMouth;
      chartData[flag] = score/numday;
    }
  }

  /**
   * 初始化图表需要的数据格式
   */
  function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    setChartData("北京","day");
    renderChart();
    

  }

  // 补充城市
  function ExistValue(selectCity,value){
    for (var i = selectCity.length - 1; i >= 0; i--) {
      if( selectCity[i].value == value ){
        return true;
      }
      else{
        return false;
      }
    }
  }

  function addcity(){
    var selectCity = document.getElementById("city-select");
    for(city in aqiSourceData){
      // alert(city);
      if (!ExistValue(selectCity,city)){
        var varItem = new Option(city);
        selectCity.options.add(varItem);
      }

    }
  }
  /**
   * 初始化函数
   */
  function init() {
    addcity();
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
  }

  init();
}