window.onload = function(){
	// 生成选择框,numofItem是选择的数量
	function createSelect(numofItem){
		var select = document.createElement("select");
		select.setAttribute("id","select");
		for( var i = 0;i < numofItem;i++){
			var option = document.createElement("option");
			option.value = i+1;
			option.innerHTML = option.value + "张图片";
			select.appendChild(option);
			if (i==1) {
				option.selected = "selected";
				// option.setAttribute("selected","selected");
				// 两种方法在chrome中都可以
			};
		}
		document.getElementsByClassName("ui-select")[0].appendChild(select);
	}

	var numofImg = 0;
	function getNumofImg(){
		var select = document.getElementById("select");
		var index = select.selectedIndex;
		return select.options[index].value;
	}

	function createDivofImg(numofImg){
		var imgContainer = document.getElementById("imgContainer");
		for (var i = 1; i <= numofImg; i++) {
			var div = document.createElement("div");
			// div.class = "img";
			div.setAttribute("class","img");
			div.style.backgroundImage = "url(./img/"+i+".jpg)";
			imgContainer.appendChild(div);
		};
	}
	function clearDivofImg(){
		var divImg = document.getElementsByClassName("img");
		for (var i = divImg.length - 1; i >= 0; i--) {
			divImg[i].parentNode.removeChild(divImg[i]);
		};
	}

	function oneImg(){
		var img = document.getElementsByClassName("img");
		// img[0].style.width = "888px";
		// img[0].style.height = "588px";
		img[0].style.width = "calc(100% - 12px)";
		img[0].style.height = "calc(100% - 12px)";
		// img[0].setAttribute("style","width:788px;height:588px")
	}

	function twoImg(){
		var img = document.getElementsByClassName("img");
		// img[0].style.width = "588px";
		// img[0].style.height = "588px";
		// img[1].style.width = "288px";
		// img[1].style.height = "588px";
		// alert(img[0].style.value);
		img[0].setAttribute("style","-webkit-clip-path: polygon(0% 0%, 66% 0, 33% 100%, 0% 100%);float:none;position:absolute;background-image:url(./img/1.jpg);");
		img[0].style.width = "calc(100% - 12px)";
		img[0].style.height = "calc(100% - 12px)";
		img[1].setAttribute("style","-webkit-clip-path: polygon(66% 0, 100% 0, 100% 100%, 33% 100%);float:none;position:absolute;background-image:url(./img/2.jpg);");
		img[1].style.width = "calc(100% - 12px)";
		img[1].style.height = "calc(100% - 12px)";
	}
	function threeImg(){
		var img = document.getElementsByClassName("img");
		img[0].style.width = "588px";
		img[0].style.height = "588px";
		img[1].style.width = "288px";
		img[1].style.height = "288px";
		img[2].style.width = "288px";
		img[2].style.height = "288px";
	}
	function fourImg(){
		var img = document.getElementsByClassName("img");
		for (var i = img.length - 1; i >= 0; i--) {
			img[i].style.width = "438px";
			img[i].style.height = "288px";
		};
		// img[0].style.width = "388px";
		// img[0].style.height = "588px";
		// img[1].style.width = "288px";
		// img[1].style.height = "288px";
		// img[2].style.width = "288px";
		// img[2].style.height = "288px";
	}
	function fiveImg(){
		var img = document.getElementsByClassName("img");
		img[0].style.width = "588px";
		img[0].style.height = "388px";
		img[1].style.width = "288px";
		img[1].style.height = "288px";
		img[2].style.width = "288px";
		img[2].style.height = "288px";
		img[3].style.width = "288px";
		img[3].style.height = "188px";
		img[3].style.top = "-200px";
		img[4].style.width = "288px";
		img[4].style.height = "188px";
		img[4].style.top = "-200px";
	}
	function sixImg(){
		var img = document.getElementsByClassName("img");
		img[0].style.width = "588px";
		img[0].style.height = "388px";
		img[1].style.width = "288px";
		img[1].style.height = "188px";
		img[2].style.width = "288px";
		img[2].style.height = "188px";
		img[3].style.width = "288px";
		img[3].style.height = "188px";
		img[4].style.width = "288px";
		img[4].style.height = "188px";
		img[5].style.width = "288px";
		img[5].style.height = "188px";
	}

	function createPic(numofImg){
		clearDivofImg();
		numofImg = getNumofImg();
		createDivofImg(numofImg);
		switch(numofImg){
			case "1":oneImg();
				break;
			case "2":twoImg();
				break;
			case "3":threeImg();
				break;
			case "4":fourImg();
				break;
			case "5":fiveImg();
				break;
			case "6":sixImg();
				break
			default:twoImg();
		}
	}

	function init(){
		createSelect(6);
		createPic(numofImg);
		document.getElementById("select").onchange = function(){
			// alert(numofImg);
			createPic(numofImg);
		}
	}
	init();
}