/*! SliderTV | The MIT License (MIT) | Copyright (c) 2016 GibboK */ ! function(t, i, s) {
	"use strict";

	function e(t, i) {
		console.log('init0init0')
		this._id = null, 
		this._midPoints = {
			x: null,
			y: null
		}, this._itemDoms = [], this._focus = null, this._prevDom = null, this._nextDom = null, this._canCheckMovePrevNext = !0, this._isAnimationOn = !1, this.init(t, i)
		return this
	}
	var n = "sliderTV",
		o = {
			animation: {
				duration: 400,
				easing: "linear",
				isVertical: !1
			},
			bullets: {
				canShow: !0
			}
		};
	e.prototype = {
		init2: function() {console.log('init2init2init2')},
		init: function(i, s) {
			console.log('initinitinitinitinit')
			this.element = i, this.defaults = o, this.options = t.extend({}, o, s), this._getId(), this._listen(this), this._getItemDoms(), this._setItemPositions(), this._calculateMidPoint(), this._setFocus(0), this._createBullets(), this._getBullets(), this._updateBullets(), this._getNavigation(), this._showHidePrevNext()
		},
		_getId: function() {
			this._id = t(this.element).attr("id")
		},
		_listen: function() {
			t(this.element).on("move:next", function(t) {
				this._moveTo({
					to: "move:next"
				})
			}.bind(this)), t(this.element).on("move:prev", function(t) {
				this._moveTo({
					to: "move:prev"
				})
			}.bind(this)), t(this.element).on("move:jump", function(t, i) {
				this._moveTo(i)
			}.bind(this))
		},
		_calculateMidPoint: function() {
			var i = t(this.element),
				s = t(i).offset();
			this._midPoints.x = s.left + i.outerWidth() / 2, this._midPoints.y = s.top + i.outerHeight() / 2;
//			this._midPoints.x = 1;//测试
		},
		_getItemDoms: function() {
			this._itemDoms = t(this.element).find(".sliderTV__item")
		},
		_setItemPositions: function() {
			if(this.options.animation.isVertical === !1) {
				var i = 0,
					s = 0;
				this._itemDoms.each(function(e, n) {
					s = t(n).width();
					var o = {
						position: "absolute",
//						left: i +"%",
//						width: s +"%"
						left:showMain.initValue == 1 ?(i +"%") : (i),
						width:showMain.initValue == 1 ?(s +"%") : (s),
					};
					t(n).css(o), i += s
				})
			} else {
				var e = 0,
					n = 0;
				this._itemDoms.each(function(i, s) {
					n = t(s).height();
					var o = {
						position: "absolute",
						top: e,
						height: n +"%"
					};
					t(s).css(o), e += n
				})
			}
		},
		_setFocus: function(i) {
			this._removeFocus(), this._focus = i, this._itemDoms.each(function(i, s) {
				i === this._focus && t(s).addClass("sliderTV--focus")
			}.bind(this))
		},
		_removeFocus: function() {
			null !== this._focus && (t(this._itemDoms[this._focus]).removeClass("sliderTV--focus"), this._focus = null)
		},
		_createBullets: function() {
//			if(this.options.bullets.canShow !== !1) {
//				var i = "";
//				i += '<div id="' + this._id + '__bullets" class="sliderTV__bullets">', this._itemDoms.each(function(t, s) {
//					i += '<div class="sliderTV__bullet"></div>'
//				}.bind(this)), i += "</div>", this._bulletsDom = t(i), t(this.element).append(this._bulletsDom)
//			}
		},
		_getBullets: function() {
			this.options.bullets.canShow !== !1 && (this._bulletsDoms = t(this.element).find(".sliderTV__bullet"))
		},
		_updateBullets: function() {
			if(this.options.bullets.canShow !== !1) {
				this._deactiveBullets();
				var i = "sliderTV__bullet--active";
				this._bulletsDoms.each(function(s, e) {
					if(s === this._focus) t(e).addClass(i);
					else {
						var n = t(e).hasClass();
						n && t(e).removeClass(i)
					}
				}.bind(this))
			}
		},
		_deactiveBullets: function() {
			if(this.options.bullets.canShow !== !1) {
				var i = "sliderTV__bullet--active";
				this._bulletsDoms.each(function(s, e) {
					var n = t(e).hasClass(i);
					n && t(e).removeClass(i)
				}.bind(this))
			}
		},
		_getNavigation: function() {
			var i = t(this.element).find(".sliderTV__next"),
				s = t(this.element).find(".sliderTV__prev"),
				e = i.length > 0,
				n = s.length > 0;
			e && (this._nextDom = i[0]), n && (this._prevDom = s[0]), e && n && (this._canCheckMovePrevNext = !0)
		},
		_showHidePrevNext: function() {
			if(this._canCheckMovePrevNext) {
				var i = "visibility",
					s = "hidden",
					e = "visible",
					n = this._itemDoms.length;
				0 === n ? (this._prevDom.css(i, s), this._nextDom.css(i, s)) : 0 === this._focus ? (t(this._prevDom).css(i, s), t(this._nextDom).css(i, e)) : this._focus === n - 1 ? (t(this._prevDom).css(i, e), t(this._nextDom).css(i, s)) : (t(this._prevDom).css(i, e), t(this._nextDom).css(i, e))
			}
		},
		_isItemExists: function(t) {
			return Boolean(this._itemDoms[t])
		},
		_moveTo: function(i) {
			this._calculateMidPoint();
			var s, e = i.to,
				n = "canAnimate" in i ? i.canAnimate : !0,
				o = n ? this.options.animation.duration : 0,
				h = this.options.animation.easing,
				l = !0,
				a = this._focus;
			if("move:next" === e ? a++ : "move:prev" === e ? a-- : "number" == typeof e ? a = e : l = !1, s = this._isItemExists(a), l && s && !this._isAnimationOn) {
				var _, m, u = t(this._itemDoms[a]),
					c = "move:next" === e ? 1 : -1,
					r = 1 === c ? "-=" : "+=";
				this.options.animation.isVertical === !1 ? (_ = u.outerWidth() / 2, m = (u.offset().left - this._midPoints.x + _) * c) : (_ = u.outerHeight() / 2, m = (u.offset().top - this._midPoints.y + _) * c), this._setFocus(a), this._updateBullets(), this._showHidePrevNext(), t(this.element).trigger("animation:start"), this.options.animation.isVertical === !1 ? this._itemDoms.each(function(i, s) {
					this._isAnimationOn = !0, t(s).animate({
						left: r + m
					}, o, h, function() {
						this._isAnimationOn = !1, t(this.element).trigger("animation:end")
					}.bind(this))
				}.bind(this)) : this._itemDoms.each(function(i, s) {
					this._isAnimationOn = !0, t(s).animate({
						top: r + m
					}, o, h, function() {
						this._isAnimationOn = !1, t(this.element).trigger("animation:end")
					}.bind(this))
				}.bind(this)), this._showHidePrevNext()
			}
		}
	};
	t.fn[n] = function(i) {
		return this.each(function() {
			t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new e(this, i))
		})
	}, t.fn[n].defaults = o
}(jQuery, window, document);

//这是另一个单独js里面的，我把它拿过来了，因为客户的js调取方法可奇怪。
	$(function () {
		showMain.initLoading();
	 	//$('#sliderTV').sliderTV();
	    // at first focus on the fifth item sliding the carousel,
	    // notice canAnimate: false, which prevents the animation after initialization
	    $('#sliderTV').trigger('move:jump', { to: 0, canAnimate: false });
	
	    // in your real world smart tv application you can listen to events from remote control,
	    // in this demo we just listen to keypad arrow left and right
	    $('body').keydown(function (e) {
	        switch (e.keyCode) {
	            case 37:
	                // keypad arrow left
	                //$('#sliderTV').trigger('move:prev');
	                break;
	            case 39:
	                // keypad arrow right
	               // $('#sliderTV').trigger('move:next');
	                break;
	            case 13:
	            	//OK/Enter
	//          	showMain.okEnterFn();
	            	break;
	        }
	    });

    // listen to click events for particular html elements,
    // as for example the navigation arrows (useful when implementing lg magic control)
    $('.sliderTV__next').click(function () {
        // slide to next item
        $('#sliderTV').trigger('move:next');
    });
    $('.sliderTV__prev').click(function () {
        // slide to previous item
        $('#sliderTV').trigger('move:prev');
    });

    $('#help__input').change(function (event) {
        // slide to a specific item, useful to slide the carousel programmatically
        $('#sliderTV').trigger('move:jump', { to: parseInt(event.target.value) });
    });

    // listen to events emitted by sliderTV plugin,
    // in this code below, we are "listening" to whenever the sliding animation starts and ends
    $('#sliderTV').on('animation:start', function () {
        console.clear();
        console.log('sliderTV animation has started');
    });
    $('#sliderTV').on('animation:end', function () {
        console.clear();
        console.log('sliderTV animation has finished');
    });
});

	//根据客户传的返回值执行一些函数
	function onKeyDown(keyCode){
		$('.out').hide();
		if(keyCode == 21){//alert('我是左');
			 $('#sliderTV').trigger('move:prev');
			console.log('我是左' + keyCode);
		}else if(keyCode == 22){
			$('#sliderTV').trigger('move:next');
			console.log('我是右' + keyCode);
		}else if(keyCode == 19){
			console.log('我是上' + keyCode);
		}else if(keyCode == 20){
			console.log('我是下' + keyCode);
		}else if(keyCode == 66){//alert('我是OK');
			if(showMain.a == 1){
				showMain.okEnterFn();//到详情页面的展示
			}else if(showMain.a == 2){
				showMain.PayOrder();//出现二维码
			}else if(showMain.a == 3){
//						alert('我要下单');
				showMain.isOrder = true;
			}
			console.log('我是OK' + keyCode);
		}else if(keyCode == 4){
			
			console.log('我是返回' + keyCode);
		}
	}

//-------------------------------------------------------------------------//
	
	var slideTVObj
	
	
	var showMain = {
		cityName : '',
		arr : [],
		sum : 0,
		s : 8,
		isOne : true,
		isOrder : true,
		stopBtn : true,
		a : 1,
		KJdata : '',
		getcityIdUrl: '/menpiao/v1/scenics',
		getthemesUrl : '/menpiao/v1/',
		getDetailsUrl: '/dianying/v1/cities/',
		getShowIdUrl: '/dianying/v1/film/showing',
		getMesUrl: '/menpiao/v1/scenic/',
		getListUrl: '/dianying/v1/cinemas',
		customUrl: 'http://allinpay.test.otosaas.com',
//		customUrl: 'http://allinpay.otosaas.com',
		getappDetailUrl: '/menpiao/html/details.html?channel=lvmama',
		cityNameFilter: '',
		cityIds: '',
		filmIds: '',
		theme: '',
		themeNum: 0,
		currentPage: 1,
		upLeft: 0,
		up: '下',
		initValue: 1,
		initLoading: function(){
			//预留加载前的版块
			$('.out').show();
			this.getMesData();
		},
		//通过客户传的值获取经纬度----
		getMesData: function(){
			var that = this;
//			var arrLatlng = getLocation();//[];//getLocation();//得到一个经纬度数组，第一个是精度，第二个是纬度
			var point = {};//console.log(typeof arrLatlng);console.log('arrLatlng='+arrLatlng);alert('arrLatlng='+arrLatlng + 'typeof arrLatlng='+typeof arrLatlng)
//			if(arrLatlng.length >1){
//				point.lng = arrLatlng[0];
//				point.lat = arrLatlng[1];
//			}else{
				point.lng = '116.344434';
				point.lat = '39.998568';
//			}
			that.getdetatilsMes(point);console.log('point='+point);
		},
		//根据经纬度获取城市ID----
		searchCityId: function(){
			
		},
		//根据经纬度得到详细地址信息
		getdetatilsMes: function(point){
			//console.log(point);
			var that = this;
			var gc = new BMap.Geocoder();
			var bdpoint = new BMap.Point(point.lng, point.lat) 
				gc.getLocation(bdpoint, function(rs){
	        			//console.log(rs);
	        			var addComp = rs.addressComponents;
	        			that.province = addComp.province.replace(/[市省区]|特别行政区/g,'');console.log(that.province);
	        			that.cityNameFilter = addComp.city.replace(/[市省区]|特别行政区/g,'');
	        			that.cityName = that.cityNameFilter;console.log(that.cityName);
	        			that.getData(that.cityName);
				});
		},
		//根据返回的城市ID返回该地区的景点主题----
		getData: function(cityName){//console.log(channelCityId)
			var that = this;
			var cusUrl = locationUrl + that.getthemesUrl + cityName + '/themes';
			var sendData = {
				channel : Channel,
				city : cityName
			};
			var type = 'GET';
			var opts = {
				'noMsg': true,
				success: function(data) {console.log(data);
					if(data.code == 0){
						setTimeout(function(){
							$('.out').hide();
							$('#wrapMeng').show();
							$('#wrapMeng_bg').show();
							$('#wrapper-sliderTv').show();
						},1000);
						var  data = data.data;
						that.getPointFn(data);
						that.chooseTheme(data);//测试暂时不调用
					}else{
						console.log('我是主题获取失败')
					}
				}
			};
			KJin.ajax(cusUrl,sendData,opts,type);
		},
		//根据按键进行主题的选择的----
		chooseTheme: function(data){//console.log(data)
			var chooseTheme = [] , n = 0 , that = this , g = true;
				 n = that.upLeft ;//console.log(n);
			for(var s = 0 ; s < 7 ;s++){
				if((s + n) > data.length -1){//alert('我大与最大值了'+that.upLeft + '我是数据的长度'+(data.length-6))
					
					g = false;
				}else{
					chooseTheme[s] = data[s + n];
				};
				
			};console.log(chooseTheme)
			if(g == false){
				that.getCityId(that.theme);
			}else{
				that.themeShow(chooseTheme);
			}
			
		},
		//z主题的一个渲染----
		themeShow: function(chooseTheme){
			var themesStr = '' , that = this;
			for(var g = 0 ; g < chooseTheme.length ; g++){
				if(chooseTheme[g] === undefined){
					themesStr += '<li class="navItem"></li>'
					console.log('主题介绍完毕'+chooseTheme[g])
				}else{
					themesStr += '<li class="navItem">'+chooseTheme[g]+'</li>'
				}
			}
			that.theme = chooseTheme[that.themeNum];console.log(that.theme)
			that.getCityId(that.theme);
			$('.navList').html(themesStr);
			$('.navItem').eq(that.themeNum).addClass('navListItem');console.log('sss'+ that.themeNum)
		},
		//当主题向左(即增加时)走时----
		thememGoLeft: function(data,leftORright){
			var that = this;
			if(leftORright == '左'){
				if(that.themeNum < 6){
					that.themeNum ++;
				}else if(that.themeNum == 6){
					that.upLeft ++;
					that.isThemem = false;
				}
				if(data.length-6 == that.upLeft){
					that.upLeft = data.length-6;
					console.log('我是左'+that.upLeft+'我是第几个='+that.themeNum)
				}
				that.chooseTheme(data,that.upLeft);
			}else if(leftORright == '右'){console.log('我是右'+that.upLeft+'我是第几个='+that.themeNum)
				
				if(that.upLeft == 0 && that.themeNum == 0){
//					alert('我是第一个')
				}else{
					if(data.length-6 == that.upLeft){console.log('我是右'+that.upLeft+'我是第几个='+that.themeNum)
	//					that.upLeft = data.length-6;
						that.upLeft --;
						that.themeNum --;
					}else if(that.themeNum > 6){
						that.upLeft --;
					}else if(that.themeNum == 0){
						that.themeNum = 0;
						that.upLeft --;
					}else if(data.length-6 == 0){
						that.themeNum --;
					}else{
						that.themeNum --;
					}
				}
				that.chooseTheme(data,that.upLeft);
			}
			
		},
		//当主题向右减少时----
		themeGoRight: function(){
			var that = this;
			
		},
		//查询城市ID----
		getCityId: function(theme){//alert('我是重新获取主题景点')
			var that = this;
			var cusUrl = locationUrl + that.getcityIdUrl;
			var sendData = {
					channel : Channel,
					prov : that.province ,
					city : that.cityName,
					pageSize : '24',
					currentPage : that.currentPage,
					theme : theme
//					sort : ''
			};console.log('that.currentPage' +that.currentPage)
			var type = 'POST';
			var opts = {
				'noMsg': true,
				success: function(data) {console.log(data);
					if(data.code == 0){
						var data = data.data.scenicList;//console.log(cityId)
						that.getShowData(data);//测试暂时不调用
					}
				}
			};
			KJin.ajax(cusUrl,sendData,opts,type);
		},
		//根据ID获取具体景点信息----
		getShowData: function(data){
			var picStr = ''; 
			$('#sliderTV').html('');
			var testDom = $('<div id="go"></div>')
			for(var i = 0 ; i < data.length; i++){//console.log(data[i].id)
				picStr += '<div id="item-'+i+'" class="sliderTV__item" data-index="'+data[i].id+'">'
			            +        '<img src="'+data[i].image+'">'
			            +        '<h1>'+data[i].name+'</h1>'
			            +   '</div>';
			}
			$('#sliderTV').append(testDom.append(picStr));
			testDom.sliderTV()
//			console.log($('#sliderTV').sliderTV(), $('#sliderTV').sliderTV())
//			if(!slideTVObj) {
//				slideTVObj = testDom.sliderTV()
//				
//			} else {
//				//console.log(slideTVObj)
//				$('#sliderTV').sliderTV()
//			}
			
			
			//.init();
		},
		//通过客户传递遥控器上的按键  上：19 ； 下 ： 20 ； 左 ： 21 ； 右 ： 22 ； OK/Enter : 23 ; goback ：4；
		//通过键盘控器上的按键  上：38  ； 下 ： 40 ； 左 ： 37 ； 右 ： 39 ； OK/Enter : 13 ; BackSpace ：8；
		getPointFn: function(data){
			var that = this;	
			//电脑键盘的按键判断----
			document.onkeydown = function(event){
				var e = event || window.event //|| arguments.callee.caller.arguments[0];
				if(e && e.keyCode == 37){
					showMain.initValue = 0;
					if(that.up == '下'){
						$('#go').trigger('move:prev');
					}else if(that.up == '上'){
						that.thememGoLeft(data,'左');
					}
					console.log('我是左' + e.keyCode);
				}else if(e && e.keyCode == 39){
					showMain.initValue = 0;
					if(that.up == '下'){
						$('#go').trigger('move:next');
					}else if(that.up == '上'){
						that.thememGoLeft(data,'右');
					}      
					console.log('我是右' + e.keyCode);
				}else if(e && e.keyCode == 38){
					that.up = '上';
					console.log('我是上' + e.keyCode);
				} else if(e && e.keyCode == 40){
					that.up = '下';
					console.log('我是下' + e.keyCode);
				}else if(e && e.keyCode == 13){//console.log('a'+that.a)
					if(that.a == 1){
						that.okEnterFn();//到详情页面的展示XZ 
					}else if(that.a == 2){
						that.PayOrder();//出现二维码
					}else if(that.a == 3){
//						alert('我要下单');
						that.isOrder = true;
					}
					console.log('我是OK' + e.keyCode);
				}else if(e && e.keyCode == 8){//console.log('aa'+that.a)
					if(that.a == 2){
						that.a = 1;
						$('.myDetails').hide();
						$('#wrapper-sliderTv').show();
						$('.PayOrderwrap').hide();
						$('.detailWrap').removeClass('filter');
					}else if(that.a == 3){//console.log('aaa'+that.a)
						$('.myDetails').hide();
						$('.PayOrderwrap').hide();
						$('.detailWrap').removeClass('filter');
						$('.PayOrderwrap').hide();
						that.a = 1;
						$('#wrapper-sliderTv').show();
					}else if(that.a == 1){
						that.a = 1;
						$('#wrapper-sliderTv').show();
					}
					console.log('我要返回');
				}
			}
		},
		//当按键时左右确定的时候----
		okEnterFn: function(){
			var that = this;
			var ok_picId = $('.sliderTV--focus').attr('data-index');
			that.filmIds = ok_picId;
			var cusUrl = locationUrl + that.getMesUrl + ok_picId;
			var sendData = {
					channel : Channel,
					filmId : ok_picId
			};
			
			var type = 'GET';
			var opts = {
				'noMsg': true,
				success: function(data) {//console.log(data);
					if(data.code == 0){
						that.isOrder = false;that.a = 2;
						var slingerData = data.data;console.log(slingerData)
						that.showDetails(slingerData);
					}
				}
			};
			KJin.ajax(cusUrl,sendData,opts,type);
		},
		//展示相应商品的信息----
		showDetails: function(data){
			var starSum = 0 ,starStr = '';$('.slin_assess').html('');
			$('#wrapper-sliderTv').hide();
			$('.myDetails').show();
			if(data.images){
				$('.slingerPic img').attr('src',data.images[0]);
			}
			$('.slingerMain .slin_title').html(data.name);
			$('.slingerMain .slin_mes li').eq(0).children('.needText').html(data.addr);
			$('.slingerMain .slin_mes li').eq(1).children('.needText').html(data.openTime);
			if(data.serviceGuarantee){
				var serviceGuaranteeStr = '' , len = 0;
				for(var k = 0 ; k <= data.serviceGuarantee.length ; k++){
					if(data.serviceGuarantee[k] === 'ENSURING_THE_GARDEN'){
						serviceGuaranteeStr += '保证入园、'
					}else if(data.serviceGuarantee[k] === 'FAST_INTO_THE_GARDEN'){
						serviceGuaranteeStr += '快速入园、'
					}else if(data.serviceGuarantee[k] === 'BACK_AT_ANY_TIME'){
						serviceGuaranteeStr += '随时退、'
					}else if(data.serviceGuarantee[k] === 'YOU_WILL_LOSE'){
						serviceGuaranteeStr += '贵就陪、'
					}
				}
			}
			
			$('.slingerMain .slin_mes li').eq(2).children('.needText').html(serviceGuaranteeStr);
			$('.slingerMain .slin_introduce').html(data.intro);
			if(data.level === 'AAAAA'){
				len = 5;
			}else if(data.level === 'AAAA'){
				len = 4;
			}else if(data.level === 'AAA'){
				len = 3;
			}else if(data.level === 'AA'){
				len = 2;
			}else if(data.level === 'A'){
				len = 1;
			}
			for(var j = 0 ; j < len ;j++){
				starStr += '<span><img src="img/star_q.png" alt="" /></span>'
			}
			$('.slin_assess').append(starStr);
		},
		//出现二维码，动态生成订单信息----
		//'http://pan.baidu.com/share/qrcode?w=198&h=198&url=' + encodeURIComponent(credential.alipay_qr || credential.wx_pub_qr);locationUrl
		//http://allinpay.test.otosaas.com/dianying/cinemas/2190?channel=kou&filmId=1594707&cityId=53 
		PayOrder: function(){
			var that = this;
			this.a = 3;//即二维码生成后
			$('.detailWrap').addClass('filter');
			$('.PayOrderwrap').show();
			var imgOrder = 'http://pan.baidu.com/share/qrcode?w=198&h=198&url=' + encodeURIComponent(this.customUrl + this.getappDetailUrl + '&cityID='+this.cityIds);
			$('.PayPic').children('img').attr('src',imgOrder);
			setTimeout(function(){
				$('.myDetails').hide();
				$('.detailWrap').removeClass('filter');
				$('.PayOrderwrap').hide();
				that.a = 1;
				$('#wrapper-sliderTv').show();
			},60000);
		},
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	



















