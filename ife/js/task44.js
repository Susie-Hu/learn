/**
 * Created by husiqin on 16/4/17.
 */
window.onload = function(){
    var columnsList = [];
    var columnNum = 5;
    function createColumnsDiv(){
        var wrapper = document.getElementById("wrapper");
        for (i = 0;i < columnNum;i++){
            var div = document.createElement("div");
            div.setAttribute("class","columnDiv");
            div.style.width = "calc(20% - 22px)";
            wrapper.appendChild(div);
        }

    }

    function getTargetDiv(){
        var columnDivs = document.getElementsByClassName("columnDiv");
        var minDiv = columnDivs[0];
        for (var i = 1; i < columnDivs.length;i++){
            if (minDiv.offsetHeight > columnDivs[i].offsetHeight){
                minDiv = columnDivs[i];
            }
        }
        return minDiv;
    }

    function addImg(imgName){
        var obj = getTargetDiv();
        //alert(obj);
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = "./img/"+imgName;
        img.className = "img"
        div.appendChild(img);
        var p = document.createElement("p");
        p.className = "imgInfo";
        p.innerText = "我是图片";
        div.appendChild(p);

        //div.style.backgroundImage = "";
        div.style.width = "100%";
        div.className = "imgDiv";
        obj.appendChild(div);


    }
    function imgClick(obj){
        var div = document.createElement("div");
        var img = document.createElement("img");
        //alert(obj.src);
        //var name = 1;
        //img.src = "./img/" + name + ".jpg";
        img.src = obj.src;
        img.className = "imgBig";
        //div.style.backgroundImage = "url(./img/"+name+".jpg)";
        div.appendChild(img);
        div.className = "viewImg";
        document.body.appendChild(div);
        var imgDiv = document.getElementsByClassName("viewImg");
        imgDiv[0].onclick = function(){
            document.body.removeChild(imgDiv[0]);
        }
    }
    //var imgList = ["143.jpg","243.jpg","343.jpg","443.jpg","543.jpg","643.jpg"];
    function init(){
        createColumnsDiv();
        for (var i = 1;i < 26;i++){
            var imgName = i+"43.jpg";
            addImg(imgName);
        }
        var imgObjs = document.getElementsByClassName("img");
        for(var i = 0; i < imgObjs.length;i++){
            imgObjs[i].onclick = function (){
                imgClick(this);
            }
        }

    }
    init();
}
