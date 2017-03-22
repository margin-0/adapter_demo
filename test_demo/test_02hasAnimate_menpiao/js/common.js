//全局变量---------------------
//	var locationUrl = 'https://dev-api.otosaas.com';
	var locationUrl ='/api';
	var Channel = 'kou';
	$(function() {
		$('.meng').on('touchmove', function() { return false })
	})
//调取参数
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  decodeURI(r[2]); return null;
	}

//ajax的封装---------------
	window.KJin={};
	KJin.ajax = function (url, data, opts,type) {
		$.ajax({
	        url: url,
	        data: data,
	        type: type,//data ? 'POST' : 'GET',
	        dataType: opts.dataType || 'json',
	        beforeSend: opts.beforeSend,
	        success: function(data){
	            if (data == null && !opts.noMsg) {
	                alert('您的网络有些问题，请稍后再试');
	                return false;
	            } else {
	                opts.success(data);
	            }
	        },
	        	error: function(XHR, info, errorThrown){
//	        		publicAlert.showAlert('获取数据失败');//cesshi
	        		console.log("XHR:===" + XHR);
	        		console.log("info:===" + info);
	        		console.log("errorThrown:===" + errorThrown);
	        }
	    });	
	};
//定义获取当前时间的函数，这里改成了3天后过期时间
	function getNowFormatDate(date) {
	    var seperator1 = ".";
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = year + seperator1 + month + seperator1 + strDate;
	    currentdate = currentdate?currentdate:"[过期时间]";
	    return "有效期："+currentdate;
	}
//公共的规格选择
	

	function objsData(data,num,standard,sPrice){
		var objs = {};
		objs.data = data;
		objs.quantity = num;
		objs.standard = standard;
		if(sPrice == 0){
			objs.oprice = data.price;
		}else{
			objs.oprice = sPrice;
		}
		if(cartarr.length > 0){
			var cartArr = cartarr.filter(function(item){	
					return (item.data.productId + item.standard.join('') + item.oprice) === (objs.data.productId + objs.standard.join('') + objs.oprice)
				});
				if(cartArr.length > 0){
					var cartStan = cartArr[0].standard;
					cartArr[0].quantity += objs.quantity;
				}else{
					cartarr.push(objs);	
				}
		}else{
			cartarr.push(objs);
		}
		console.log(cartarr);
		localStorage.cartdata = JSON.stringify(cartarr);
		showSum()
		cartListData();
	}
	
	
	
// 公共弹窗
	var publicAlert = {
			showAlert : function (content, btn1) {
				$('body').append(
					"<div id='mask'>"+"</div>"+
					"<div id='myAlert'>"+
						"<div id='alertHeader'>"+'温馨提示'+"</div>"+
						"<div id='alertMain'>"+
							"<div id='alertContent'>"+content+"</div>"+
						"</div>"+
						"<div id='alertBtn'>"+
							"<div id='confirm'>"+'确定'+"</div>"+
						"</div>"+
					"</div>"
				);
				if(btn1){
					$('#myAlert #confirm').text(btn1);
				}
				$('#mask').fadeIn(200);
				$('#myAlert').show(100);
				$('#myAlert').on('click','#confirm',function () {
					$('#mask').fadeOut(200);
					$('#myAlert').hide(100);
					setTimeout(function () {
							$('#mask').remove();
							$('#myAlert').remove();
				    }, 200);
					return true;
				});
				$('#mask').on('click',function () {
					$('#mask').fadeOut(200);
					$('#myAlert').hide(100);
					setTimeout(function () {
							$('#mask').remove();
							$('#myAlert').remove();
				    }, 200);
				});
			},
			showConfirm : function (content, btn1, btn2, onOk, onCancel) {
				$('body').append(
					"<div id='mask'>"+"</div>"+
					"<div id='myConfirm'>"+
						"<div id='confirmHeader'>"+'温馨提示'+"</div>"+
						"<div id='confirmMain'>"+
							"<div id='confirmContent'>"+content+"</div>"+
						"</div>"+
						"<div id='confirmBtn'>"+
							"<div id='confirm'>"+'确定'+"</div>"+
							"<div id='cancel'>"+'取消'+"</div>"+
						"</div>"+
					"</div>"
				);
				if(btn2){
					$('#cancel').text(btn2);
				}
				if(btn1){
					$('#myConfirm #confirm').text(btn1);
				}
				$('#mask').fadeIn(200);
				$('#myConfirm').show(100);
				$('#cancel').on('click',function () {
					$('#mask').fadeOut(200);
					$('#myConfirm').hide(100);
					if(onCancel){
						onCancel();
					}
				});
				$('#myConfirm').on('click','#confirm',function () {
					$('#mask').fadeOut(200);
					$('#myConfirm').hide(100);
					if(onOk){
						onOk();
					}
				})
				$('#mask').on('click',function () {
					$('#mask').fadeOut(200);
					$('#myConfirm').hide(100);
				});
			}
		};