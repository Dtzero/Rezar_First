function $(selector,context){
	//拿到第一个字符
	selector = selector.trim();  // 去除前后空格

	if(!context){  // 如果context没有接受任何值，contex为document
		context = document;
	}

	if(selector.indexOf(" ") !== -1){  // 判断是有空格，交给querySelectorAll处理
		return context.querySelectorAll(selector);
	}

	var firstChar = selector.charAt(0);

	

	if(firstChar === '#'){  // id获取
		// 截取字符串一部分
		return document.getElementById(selector.slice(1));
	}else if(firstChar === '.'){  // className获取
		return context.getElementsByClassName(selector.slice(1))
	}else{ //tagName
		return context.getElementsByTagName(selector);
	}
}

function showHourInfo(xiaJiaShiJian){
	var nowtime = new Date().getTime();
	var dValue = (xiaJiaShiJian - nowtime)/1000;
	if(dValue <= 0){
	 	dValue = 0;
	}
 	var hours = parseInt(dValue % 86400 / 3600);
 	var min = parseInt(dValue % 86400 % 3600 / 60) ;
 	var se = parseInt(dValue % 60);
 	var showTimeInfo = {};
 	showTimeInfo["shengYuHours"]=hours;
 	showTimeInfo["shengYuMins"]=min;
 	showTimeInfo["shengYuSeconds"]=se;
	return showTimeInfo;
}

function css(element,prop,value){
	// 判断argumnets的length
	if(arguments.length>2){
		// 设置
		element.style[prop] = value;
	}else{
		// 获取
		return parseFloat(getComputedStyle(element)[prop]);
	}
}

/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}

/*
	参数：
		element 要运动的元素    *
		attr 运动的属性			*
		target 目标位置			*
		duration 持续时间 ms    *

		fx 运动形式   默认值为"linear"  []
		callBack  调函数
*/
function mTween(element,attrObj,duration,fx,callback){
	// 要算出来每一个样式的起始位置和总距离
	// 循环对象attrObj，算出每一个用时的起始位置和总距离
	var beginObj = {}; // 每一个样式的起始位置
	var countObj = {}; // 每一个样式的总距离
	for(var attr in attrObj){
		beginObj[attr] = parseFloat(getComputedStyle(element)[attr]);
		// 每一个样式要运动的的总距离
		countObj[attr] = attrObj[attr] - beginObj[attr];
	}
	// 开始运动的时间
	var startTime = Date.now();
	fx = fx || 'linear';
	clearInterval(element.timer);
	element.timer = setInterval(function (){
		// 已过去时间
		var t = Date.now() - startTime;
		if(t >= duration){
			t = duration;
			clearInterval(element.timer);
		}
		// 循环传过来的对象,要运动的是对象的key值这个样式
		for(var prop in attrObj){
			//判断属性是不是改变透明读的样式名
			if(prop === 'opacity'){
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration);
			}else{
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration) + 'px';
			}			
		}
		if(t === duration){
			typeof callback === 'function' && callback();
		}
	},4)
}

function shake(element,attr,fudu){
	if(element.shakeTimer){
		return;
	}
	var arr = [];
	for( var i = fudu; i >= 0; i-=2 ){
		arr.push(i,-i)
	}
	arr.push(0); 
	var n = 0;
	var l = parseFloat(getComputedStyle(element)[attr]);
	clearInterval(element.shakeTimer);
	element.shakeTimer = setInterval(function (){
		n++;
		element.style[attr] = l + arr[n] + 'px';
		if( n >= arr.length-1 ){
			clearInterval(element.shakeTimer);
			element.shakeTimer = null;
			typeof callback === 'function' && callback();
		}
	},80)	
}

function collision(obj1,obj2){
	var obj1Rect = obj1.getBoundingClientRect();	
	var obj2Rect = obj2.getBoundingClientRect();	

	if(obj1Rect.right < obj2Rect.left || obj1Rect.bottom < obj2Rect.top || obj1Rect.left > obj2Rect.right || obj1Rect.top > obj2Rect.bottom){
		return false;
	}else{
		return true;
	}
}

function mousewheel(element,upFn,downFn){
	if(!element || element.nodeType !== 1){
		throw new Error("element not a node");
		return ;
	}
	element.onmousewheel = fn;
	if(element.addEventListener){
		element.addEventListener("DOMMouseScroll",fn)
	}	

	function fn(ev){
		var e = ev || event;
		var direction = true;
		if(e.wheelDelta){
			direction = e.wheelDelta > 0 ? true : false;
		}
		if(e.detail){
			direction = e.detail < 0 ? true : false;
		}

		if(direction){  // 向上
			typeof upFn === 'function' && upFn(e);
		}else{  // 向下
			typeof downFn === 'function' && downFn(e);
		}
		//e.preventDefault();
	}
}