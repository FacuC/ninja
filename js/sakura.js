/* sakura.8351.1.js ???????????&???????????? */

(function () {
	var divSakura = document.createElement('div');	/* ?????div??? */
	divSakura.id = "sakura";	/* id ????? */

	/* ?? div ??????? html(style ??? css ????????) */
	divSakura.innerHTML = '<style>'+
	'html,body{overflow-x:hidden;}'+
	'.hana{'+
	'position:absolute;height:0;width:0;'+
	'border: 10px solid pink;'+
	'border-radius: 15px;'+
	'border-top-right-radius: 0;'+
	'border-bottom-left-radius: 0;}'+
	'.hana::after{'+
	'content:"";display:block;position:absolute;top:-7px;left:-7px;height:0;width:0;'+
	'border: 10px solid pink;'+
	'border-radius: 15px;'+
	'border-top-right-radius: 0;'+
	'border-bottom-left-radius: 0;'+
	'-webkit-transform: rotate(15deg);-ms-transform: rotate(15deg);transform: rotate(15deg);'+
	'}'+

	'.t1{border-color:#fff3f5;}'+
	'.t2{border-color:#ffe2e7;}'+
	'.t3{border-color:#ffd1d9;}'+
	'.t4{border-color:#ffc0cb;}'+
	'.t5{border-color:#ffafbd;}'+
	'.t1::after{border-color:#fff3f5;}'+
	'.t2::after{border-color:#ffe2e7;}'+
	'.t3::after{border-color:#ffd1d9;}'+
	'.t4::after{border-color:#ffc0cb;}'+
	'.t5::after{border-color:#ffafbd;}'+

	'.y1{-webkit-animation:v1 10s infinite;}'+
	'.y2{-webkit-animation:v2 10s infinite;}'+
	'.y3{-webkit-animation:v3 9s infinite;}'+
	'.y4{-webkit-animation:v4 9s infinite;}'+
	'.y5{-webkit-animation:v5 8s infinite;}'+
	'@-webkit-keyframes v1{'+
		'from{-webkit-transform: rotate(0deg) scale(.9);}'+
		'50%{-webkit-transform: rotate(270deg) scale(.9);}'+
		'to{-webkit-transform: rotate(1deg) scale(.9);}'+
	'}'+
	'@-webkit-keyframes v2{'+
		'from{-webkit-transform: rotate(-90deg) scale(.8);}'+
		'50%{-webkit-transform: rotate(-360deg) scale(.8);}'+
		'to{-webkit-transform: rotate(-89deg) scale(.8);}'+
	'}'+
	'@-webkit-keyframes v3{'+
		'from{-webkit-transform: rotate(30deg) scale(.7);}'+
		'50%{-webkit-transform: rotate(300deg) scale(.7);}'+
		'to{-webkit-transform: rotate(29deg) scale(.7);}'+
	'}'+
	'@-webkit-keyframes v4{'+
		'from{-webkit-transform: rotate(-120deg) scale(.6);}'+
		'50%{-webkit-transform: rotate(-390deg) scale(.6);}'+
		'to{-webkit-transform: rotate(-119deg) scale(.6);}'+
	'}'+
	'@-webkit-keyframes v5{'+
		'from{-webkit-transform: rotate(60deg) scale(.5);}'+
		'50%{-webkit-transform: rotate(330deg) scale(.5);}'+
		'to{-webkit-transform: rotate(59deg) scale(.5);}'+
	'}'+
	'</style>';

	document.body.appendChild(divSakura);	/* body ?????? div ?????? */

	var windowHeight = window.innerHeight;	/* ??????????? */
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;	/* ??????????? */
	var styleZindex = 9999;	/* ???? z-index (9999????) */
	var styleTop = new Array();	/* ???? top ???? */
	var styleLeft = new Array();	/* ???? left ???? */
	var yuragi = new Array();	/* ??????? */
	var sokudo = new Array();	/* ??????? */
	var hanabiraId = new Array();	/* ????ID??? */
	var yuragiConut = new Array();	/* ??????????? */
	var kazeCount = 0;	/* ???????? */

	/* ?????????????(?????????????????????????) */
	document.addEventListener('scroll', function(){ scroll = document.documentElement.scrollTop || document.body.scrollTop; }, false);

	/* ???10????? */
	for(var i = 0; i < 10; i++){
		var divHanabira = document.createElement('div');	/* ???? div ??? */
		divHanabira.id = 'hanabira' + i;	/* id ?????(?:<div id="hanabira0">) */
		styleTop[i] = Math.random() * -500 + scroll;	/* ??????(top)???????? */
		styleLeft[i] = Math.random() * window.innerWidth;	/* ??????(left)????????????????? */
		divHanabira.setAttribute('style', 'z-index:' + (styleZindex + i) + ';top:' + styleTop[i] + 'px;left:' + styleLeft[i] + 'px;');	/* ??? div ? style ??? */
		var hanabiraClass = 'hana t' + (Math.floor(Math.random() * 5) + 1) + ' y' + (Math.floor(Math.random() * 5) + 1);	/* ??? div ? class ??? */
		divHanabira.setAttribute('class', hanabiraClass);	/* ??? div ? class ??? */
		divSakura.appendChild(divHanabira);	/* ??? div ???? div ??? */
		yuragi[i] = Math.random() * 35 + 15;	/* ???????????? */
		sokudo[i] = Math.random() * 2 + 1;	/* ???????????? */
		hanabiraId[i] = document.getElementById('hanabira' + i);	/* ??????????????? id ?????? */
		yuragiConut[i] = 0;	/* ?????????????0 */
	}

	/* ???????(45?????????) */
	setInterval(function(){

		/* ?????????(10????) */
		for(var i = 0; i < 10; i++){
			if(styleTop[i] < scroll + windowHeight - 40){	/* ??????(top)????????? */
				if(yuragi[i] >= yuragiConut[i]){	/* ????(????)??? */
					styleLeft[i] = styleLeft[i] + 0.3 + Math.random() * 0.3;
				}else{	/* ????(????)??? */
					styleLeft[i] = styleLeft[i] - 0.3 - Math.random() * 0.3;
				}
				if((yuragi[i] * 2) <= yuragiConut[i]){	/* ??????2??? */
					yuragiConut[i] = 0;	/* ????????? */
				}
			}else{	/* ???????????????? */
				styleTop[i] = scroll;	/* ???????? */
				styleLeft[i] = Math.random() * window.innerWidth;	/* ???????(left)?????? */
			}


/* ?????? */

			/* ???????????????????? */
			if(kazeCount >= 100 && kazeCount <= 110){ styleLeft[i] += 0.5; }
			else if(kazeCount >= 111 && kazeCount <= 120){ styleLeft[i] += 1; }
			else if(kazeCount >= 121 && kazeCount <= 129){ styleLeft[i] += 1.5; }
			else if(kazeCount >= 130 && kazeCount <= 137){ styleLeft[i] += 2; }
			else if(kazeCount >= 138 && kazeCount <= 144){ styleLeft[i] += 2.5; }
			else if(kazeCount >= 145 && kazeCount <= 300){ styleLeft[i] += 3; }
			else if(kazeCount >= 301 && kazeCount <= 311){ styleLeft[i] += 2.5; }
			else if(kazeCount >= 312 && kazeCount <= 322){ styleLeft[i] += 2; }
			else if(kazeCount >= 323 && kazeCount <= 335){ styleLeft[i] += 1.5; }
			else if(kazeCount >= 336 && kazeCount <= 349){ styleLeft[i] += 1; }
			else if(kazeCount >= 350 && kazeCount <= 354){ styleLeft[i] += 0.5; }

			/* ???????????????????? */
			else if(kazeCount >= 500 && kazeCount <= 510){ styleLeft[i] -= 0.5; }
			else if(kazeCount >= 511 && kazeCount <= 520){ styleLeft[i] -= 1; }
			else if(kazeCount >= 521 && kazeCount <= 529){ styleLeft[i] -= 1.5; }
			else if(kazeCount >= 530 && kazeCount <= 537){ styleLeft[i] -= 2; }
			else if(kazeCount >= 538 && kazeCount <= 544){ styleLeft[i] -= 2.5; }
			else if(kazeCount >= 545 && kazeCount <= 700){ styleLeft[i] -= 3; }
			else if(kazeCount >= 701 && kazeCount <= 711){ styleLeft[i] -= 2.5; }
			else if(kazeCount >= 712 && kazeCount <= 722){ styleLeft[i] -= 2; }
			else if(kazeCount >= 723 && kazeCount <= 735){ styleLeft[i] -= 1.5; }
			else if(kazeCount >= 736 && kazeCount <= 749){ styleLeft[i] -= 1; }
			else if(kazeCount >= 750 && kazeCount <= 754){ styleLeft[i] -= 0.5; }

			else if(kazeCount >= 900){ kazeCount = 0; }	/* ????????? */

/* ?????? */

			styleTop[i] = styleTop[i] + sokudo[i];	/* ????(top)?????? */
			hanabiraId[i].style.top = styleTop[i] + 'px';	/* ??? top ????????? */
			hanabiraId[i].style.left = styleLeft[i] + 'px';	/* ??? left ???????? */
			yuragiConut[i]++;	/* ?????????1?? */
		}
		kazeCount += 0.5;	/* ???????0.5?? */
	}, 30);
})();
