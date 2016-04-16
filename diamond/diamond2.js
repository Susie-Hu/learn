/**
 * Created by husiqin on 16/4/14.
 */
/**
 * Created by husiqin on 16/4/13.
 */
window.onload = function(){
    // 定义指令集
    var commands=["GO","TUN LEF","TUN RIG","TUN BAC","TRA LEF","TRA TOP","TRA RIG","TRA BOT","MOV LEF","MOV RIG","MOV TOP","MOV BOT"];
    // 获取指令,如果指令在指令集中，则将指令赋值给command，否则将error赋值给command
    var command = [];
    var errorTop = [];
    function getCommand(){
        var inputTxt=document.getElementById("commands").value.trim().toUpperCase();
        var commandsArray = inputTxt.split("\n")
        for (j = 0;j<commandsArray.length;j++){
            // alert(inputTxt);
            for (var i = commands.length - 1; i >= 0; i--) {
                // alert("commands:  "+commands[i]);
                if (commands[i] == commandsArray[j]){
                    command[j] = commandsArray[j];
                    break;
                }
                else{
                    command[j] = "error";
                }
            };
        }
        errorTop = [];
        for(i=0;i<command.length;i++){
            if(command[i] == "error"){
                errorTop[errorTop.length] = i;
            }
        }
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
            chess.style.transform = "rotate(0deg)";

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
            newChess.style.transform = "rotate("+rotaBegin+"deg)";
        }
    }
    function doGoLef(){
        // var chess = document.getElementsByName("chess")[0];
        chess = getChess();
        chessId = chess.getAttribute("id");
        // alert(chessId);
        var lastOne = chessId.slice(-1);
        if (lastOne == "1") {
            alert("走到头了！");
        }
        else{
            //修改现在的棋子
            chess.name = "notChess";
            chess.className = "uncheck";
            chess.style.transform = "rotate(0deg)";

            var row = chessId.slice(0,2);
            var col = chessId.slice(-2);
            if(row != "10"){
                row = chessId.slice(0,1);
            }
            if(col != "10"){
                col = chessId.slice(-1);
            }
            colNew = parseInt(col) - 1;
            chessIdNew = row + colNew;
            // alert(chessIdNew);
            newChess = document.getElementById(chessIdNew);
            newChess.name = "chess";
            newChess.className = "check";
            newChess.style.transform = "rotate("+rotaBegin+"deg)";
        }
    }

    function doGoTop(){
        // var chess = document.getElementsByName("chess")[0];
        chess = getChess();
        chessId = chess.getAttribute("id");
        // alert(chessId);
        var firstOne = chessId.slice(0,1);
        var firsttwo = chessId.slice(0,2);
        if (firstOne == "1" && firsttwo!="10") {
            alert("走到头了！");
        }
        else{
            //修改现在的棋子
            chess.name = "notChess";
            chess.className = "uncheck";
            chess.style.transform = "rotate(0deg)";

            var row = chessId.slice(0,2);
            var col = chessId.slice(-2);
            if(row != "10"){
                row = chessId.slice(0,1);
            }
            if(col != "10"){
                col = chessId.slice(-1);
            }
            rowNew = parseInt(row) - 1;
            chessIdNew = rowNew + col;
            // alert(chessIdNew);
            newChess = document.getElementById(chessIdNew);
            newChess.name = "chess";
            newChess.className = "check";
            newChess.style.transform = "rotate("+rotaBegin+"deg)";
        }
    }

    function doGoBot(){
        // var chess = document.getElementsByName("chess")[0];
        chess = getChess();
        chessId = chess.getAttribute("id");
        // alert(chessId);
        var firstTwo = chessId.slice(0,2);
        if (firstTwo == "10") {
            alert("走到头了！");
        }
        else{
            //修改现在的棋子
            chess.name = "notChess";
            chess.className = "uncheck";
            chess.style.transform = "rotate(0deg)";

            var row = chessId.slice(0,2);
            var col = chessId.slice(-1);
            if(row != "10"){
                row = chessId.slice(0,1);
            }
            rowNew = parseInt(row) + 1;
            chessIdNew = rowNew + col;
            // alert(chessIdNew);
            newChess = document.getElementById(chessIdNew);
            newChess.name = "chess";
            newChess.className = "check";
            newChess.style.transform = "rotate("+rotaBegin+"deg)";
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
    var timer = null;
    function startMove(sta,toTarget){
        clearInterval(timer);
        chess = getChess();
        var cur = sta;
        var speed = sta<toTarget?6:-6;
        timer = setInterval(function () {
            if(cur == toTarget){
                clearInterval(timer);
            }
            else{
                cur += speed;
                chess.style.transform = "rotate("+cur+"deg)";
            }

        },30)
    }
    var rotaBegin = 0;
    function btnGo(){
        errorTop = [];
        var errors = document.getElementsByClassName("errorInfo");
        for (i = 0; i<errors.length;i++){
            document.getElementById("error").removeChild(errors[i]);
        }
        getCommand();
        var errorNum = 0;
        var top = 0;
        var left = 0;
        var coms = document.getElementById("commands");
        for (i=0;i<command.length;i++){
            if (command[i] == "error") {
                //alert("请输入正确的指令！");
                errorNum +=1;
                var div = document.createElement("div");
                div.setAttribute("class","errorInfo");
                //top = i*20;
                //if (errorNum >1 ){
                //    top = (errorTop[errorNum-1]-errorTop[errorNum-2])*20 - document.getElementById("commands").scrollTop;
                //}
                //else{
                //    top = (errorTop[errorNum-1])*20 - document.getElementById("commands").scrollTop;
                //}
                top = errorTop[errorNum-1]*20 - document.getElementById("commands").scrollTop;
                left = 0;
                //left = -1*(errorNum-1)*20;
                div.style.top = top+"px";
                div.style.left = left+"px";
                //document.body.insertBefore(div,coms);
                document.getElementById("error").appendChild(div);
            }
            else{
                // alert(command);
                rotaBegin = rota;
                switch(command[i]){
                    case "GO":doGo();
                        break;
                    case "TUN LEF":rota -= 90;//doLef();
                        break;
                    case "TUN RIG":rota += 90;//doRig();
                        break;
                    case "TUN BAC":rota += 180;//doBac();
                        break;
                    case "TRA LEF":doGoLef();
                        break;
                    case "TRA TOP":doGoTop();
                        break;
                    case "TRA RIG":doGo();
                        break;
                    case "TRA BOT":doGoBot();
                        break;
                    case "MOV LEF":doGoLef();
                        rota = -90;
                        break;
                    case "MOV TOP":doGoTop();
                        rota = 0;
                        break;
                    case "MOV RIG":doGo();
                        rota = 90;
                        break;
                    case "MOV BOT":doGoBot();
                        rota = 180;
                        break;
                }
                rota = rota%360;
                startMove(rotaBegin,rota);
        }

            //chess = getChess();
            //chess.style.transform = "rotate("+rota+"deg)";
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
    var num = 0;
    var begin = 0;
    function inputLi(num){
        li = document.getElementById("li")
        var begin = li.childNodes.length;
        if (begin <= num + 1){
            for(i=begin+1;i<=num+1;i++){
                var tag = document.createTextNode(i+"\n");
                //var tag = document.createTextNode(i);
                //tag.setAttribute("id",i);
                li.appendChild(tag);
            }
        }
        else{
            for(i=num+2;i<=begin;i++){
                li.removeChild(li.lastChild);
            }
        }

    }
    function inputCommands(obj){
        var re = /\n/g;
        var texts = obj.value;
        num=texts.indexOf("\n");
        var newTexts = texts.replace(re,'');
        num = texts.length - newTexts.length;
        //alert(num);
        inputLi(num);
    }
    //function scolltop(){
    //    timer= setInterval(function(){
    //        document.getElementById("li").scrollTop = document.getElementById("commands").scrollTop;
    //    },30)
    //}
    //初始化
    function init(){
        renderTable();
        setChess();
        document.getElementById("go").onclick = function(){
            btnGo();
        }
        //document.onkeydown = function(e){
        //    if(!e){
        //        e=window.event;
        //    }
        //    if (( e.keyCode || e.which ) == '13'){
        //        btnGo();
        //    }
        //}
        var one = document.createTextNode("1"+"\n");
        document.getElementById("li").appendChild(one);
        document.getElementById("commands").oninput = function(){
            inputCommands(this);
        }
        document.getElementById("commands").onkeyup = function(){
            inputCommands(this);
        }
        //scolltop();
        document.getElementById("commands").onscroll = function(){
            document.getElementById("li").scrollTop = document.getElementById("commands").scrollTop;
            errordivList = document.getElementsByClassName("errorInfo");
            var top;
            for(i=0;i<errordivList.length;i++){
                //if (i >0 ){
                //    top = (errorTop[i]-errorTop[i-1])*20-document.getElementById("commands").scrollTop;
                //}
                //else{
                //    top = top = (errorTop[i])*20-document.getElementById("commands").scrollTop;
                //}
                top = document.getElementById("commands").scrollTop*(-1)+errorTop[i]*20;
                errordivList[i].style.top = top +"px";

            }
        }

    }
    init();
}
