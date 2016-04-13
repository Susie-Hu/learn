/**
 * Created by husiqin on 16/4/12.
 */
window.onload = function(){
    // 定义指令集
    var commands=["GO","TUN LEF","TUN RIG","TUN BAC"];
    // 获取指令,如果指令在指令集中，则将指令赋值给command，否则将error赋值给command
    var command;
    function getCommand(){
        inputTxt=document.getElementById("command").value.trim().toUpperCase();
        // alert(inputTxt);
        for (var i = commands.length - 1; i >= 0; i--) {
            // alert("commands:  "+commands[i]);
            if (commands[i] == inputTxt){
                command = inputTxt;
                break;
            }
            else{
                command = "error";
            }
        };
    }
    // 获取棋子
    function getChess(){
        chesses = document.getElementsByTagName("td");
        for (var i = chesses.length - 1; i >= 0; i--) {
            if (chesses[i].className == "check"){
                return chesses[i];
            }
        };
    }
    var rota = 0;
    function doGo(){
        // var chess = document.getElementsByName("chess")[0];
        chess = getChess();
        chessId = chess.getAttribute("id");
        // alert(chessId);
        var lastTwo = chessId.slice(-2);
        if (lastTwo == "10") {
            alert("走到头了！");
        }
        else{
            //修改现在的棋子
            chess.name = "notChess";
            chess.className = "uncheck";

            var row = chessId.slice(0,2);
            var col = chessId.slice(-1);
            if(row != "10"){
                row = chessId.slice(0,1);
            }
            colNew = parseInt(col) + 1;
            chessIdNew = row + colNew;
            // alert(chessIdNew);
            newChess = document.getElementById(chessIdNew);
            newChess.name = "chess";
            newChess.className = "check";
        }
    }

    //function doLef(){
    //     //var chess = document.getElementsByClassName("chess")[0];
    //    chess = getChess();
    //    flag = chess.style.transform;
    //    //alert(flag);
    //    rota -= 90;
    //    chess.style.transform = "rotate("+rota+"deg)";
    //}
    //function doRig(){
    //    // var chess = document.getElementsByName("chess")[0];
    //    chess = getChess();
    //    rota += 90;
    //    chess.style.transform =  "rotate("+rota+"deg)";
    //}
    //function doBac(){
    //    // var chess = document.getElementsByName("chess")[0];
    //    chess = getChess();
    //    rota +=180;
    //    chess.style.transform = "rotate("+rota+"deg)";
    //}
    // 定义执行事件
    function btnGo(){
        getCommand();
        if (command == "error") {
            alert("请输入正确的指令！");
        }
        else{
            // alert(command);
            switch(command){
                case "GO":doGo();
                break;
                case "TUN LEF":rota -= 90;//doLef();
                break;
                case "TUN RIG":rota += 90;//doRig();
                break;
                case "TUN BAC":rota += 180;//doBac();
                break;
            }
            rota = rota%360;
            chess = getChess();
            chess.style.transform = "rotate("+rota+"deg)";
        }
    }
    //生成棋盘
    function renderTable(){
        var table = document.getElementById("checkboard")
        for (i=0;i<11;i++){
            var tr = document.createElement("tr");
            for (j=0;j<11;j++){
                var tdId = i.toString()+ j.toString();
                var td = document.createElement("td");
                //设置单元格的id,定位
                td.setAttribute("id",tdId);
                //设置单元格的class属性
                if (i == 0 || j == 0){
                    td.setAttribute("class","labelBox");
                    td.innerText = i>j?i:j;
                }
                else {
                    td.setAttribute("class", "uncheck");
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
    //生成棋子
    function setChess(){
    //    随机生成行列数1-10,random()生成[0-1)中的数
        row = Math.floor(Math.random()*10+1);
        col = Math.floor(Math.random()*10+1);
        tdId = row.toString()+col.toString();
        //alert(tdId);
        document.getElementById(tdId).setAttribute("class","check");
        document.getElementById(tdId).setAttribute("name","chess");
    }
    //初始化
    function init(){
        renderTable();
        setChess();
        document.getElementById("go").onclick = function(){
            btnGo();
        }
        document.onkeydown = function(e){
            if(!e){
                e=window.event;
            }
            if (( e.keyCode || e.which ) == '13'){
                btnGo();
            }
        }
        
    }
    init();
}
