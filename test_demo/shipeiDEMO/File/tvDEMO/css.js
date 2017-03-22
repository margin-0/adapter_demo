var get_width=window.innerWidth/1280;
var get_height=window.innerHeight/720;
function defaultcss(){
	var setcss='.main-wrap { width: {w$1280}; height: {h$720}; }';
	setcss+='.main-tv-box { width: {w$1280}; height: {h$720}; }';
	setcss+='.main-menu-title { height: {h$55}; margin-top: {$32}; margin-bottom: {$6}; font-size: {$36}; }';
	setcss+='.main-menu-title span{height: {h$58};line-height: {h$54};}';
	setcss+='.main-menu-title em{width: {w$55};;height:{h$55};top: {$0};}';
	setcss+='.main-menu-title em.index1{left: {$15};}';
	setcss+='.main-menu-title em.index2{right: {$15};}';
	setcss+='.main-tv-menu { width: {w$320}; height: {h$720}; }';
	setcss+='.menu-text {font-size: {$28};width: {w$320}; height: {h$58};line-height: {h$58};}';
	setcss+='.main-menu { padding: 0 {$10}; }';
	setcss+='.main-menu ul li { height: {h$62}; }';
	setcss+='.main-menu ul li span {line-height: {h$62}; font-size: {$31}}';
	setcss+='.main-menu ul li span i { width: {w$52} }';
	setcss+='.main-menu ul li.active span {border-radius: {$10} }';
	_changecss(setcss);
}

defaultcss();

function _changecss(str){
	if(str.indexOf("{w$")>0){
		var begin=str.indexOf("{w$")-0+3;
		var end=str.indexOf("}",begin);
		var num=str.substring(begin,end);
		var newnum= Math.ceil((num-0)*get_width);
		str=str.replace("{w$"+num+"}",newnum+"px");		
		_changecss(str);		
	}else if(str.indexOf("{h$")>0){
		var begin=str.indexOf("{h$")-0+3;
		var end=str.indexOf("}",begin);
		var num=str.substring(begin,end);
		var newnum= Math.ceil((num-0)*get_height);
		str=str.replace("{h$"+num+"}",newnum+"px");		
		_changecss(str);		
	}else if(str.indexOf("{$")>0){
		var begin=str.indexOf("{$")-0+2;
		var end=str.indexOf("}",begin);
		var num=str.substring(begin,end);
		var newnum= Math.ceil((num-0)*(get_width+get_height)/2);
		str=str.replace("{$"+num+"}",newnum+"px");		
		_changecss(str);		
	}else{
		document.write("<style id='default'>");
		document.write(str);
		document.write("</style>");
	}
}

