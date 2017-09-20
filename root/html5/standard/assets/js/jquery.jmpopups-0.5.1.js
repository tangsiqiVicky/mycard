/**
 * jmpopups
 * Copyright (c) 2009 Otavio Avila (http://otavioavila.com)
 * Licensed under GNU Lesser General Public License
 * @docs http://jmpopups.googlecode.com/
 * @version 0.5.1
 *
 */


var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
	try{
		if (window.addEventListener) {
		        window.addEventListener('DOMMouseScroll', wheel, false);
		    }
		    window.onmousewheel = document.onmousewheel = wheel;
		    document.onkeydown = keydown;
	}
	catch(e){}

}

function enable_scroll() {
	try{
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
	catch(e){}
}









(function($) {
	var openedPopups = [];
	var popupLayerMyScreenLocker = false;
    var focusableElement = [];
	var setupJqueryMPopups = {
		screenLockerBackground: "#000",
		screenLockerOpacity: "0.5"
	};

$.getViewSize=function(){
return {"w": (window['innerWidth'] || document.documentElement.clientWidth),
"h": window['innerHeight'] || document.documentElement.clientHeight}
}


	$.setupJMPopups = function(settings) {
		setupJqueryMPopups = jQuery.extend(setupJqueryMPopups, settings);
		return this;
	}

	$.openPopupLayer = function(settings) {

/*
		$('html, body').scrollTop(0);
		$(window).scroll(function () {
                $('html, body').scrollTop(0);
            });*/
		$("html").css("overflow","hidden");
		disable_scroll();

		if (typeof(settings.name) != "undefined" && !checkIfItExists(settings.name)) {
			settings = jQuery.extend({
				width: "auto",
				height: "auto",
				left: "auto",
				top: "auto",
				layout_position:"auto",
				parameters: {},
				target: "",
				container:"",
				success: function() {},
				error: function() {},
				beforeClose: function() {},
				afterClose: function() {},
				reloadSuccess: null,
				showLockerBackground:"",
				hidebyclickbg:"",
				cache: false
			}, settings);

			//if(typeof(settings.pagecontainer) != "undefined" && settings.pagecontainer!="window"){settings.pagewidth=parseInt($("#"+settings.pagecontainer).width());settings.pageheight=parseInt($("#"+settings.pagecontainer).height());}else{settings.pagewidth=$.getViewSize().w;settings.pageheight=$.getViewSize().h;}

			loadPopupLayerContent(settings, true);
			return this;
		}
	}

	$.closePopupLayer = function(name) {

		enable_scroll();
		$(window).unbind("scroll");
		$("html").css("overflow","");

		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					var thisPopup = openedPopups[i];
					var targetid=thisPopup.target;

					openedPopups.splice(i,1)

					thisPopup.beforeClose();

					$("#popupLayer_" + name).fadeOut(function(){

						if (targetid != "") {
						$("#"+targetid).css("display","none");

						//$("#"+targetid).html($("#popupLayer_" + name).html());
						}

						$("#popupLayer_" + name).remove();

						focusableElement.pop();

						if (focusableElement.length > 0) {
							$(focusableElement[focusableElement.length-1]).focus();
						}


						hideScreenLocker(name);
						thisPopup.afterClose();

					});



					break;
				}
			}
		} else {
			if (openedPopups.length > 0) {
				$.closePopupLayer(openedPopups[openedPopups.length-1].name);
			}
		}

		return this;
	}

	$.reloadPopupLayer = function(name, callback) {
		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					if (callback) {
						openedPopups[i].reloadSuccess = callback;
					}

					loadPopupLayerContent(openedPopups[i], false);
					break;
				}
			}
		} else {
			if (openedPopups.length > 0) {
				$.reloadPopupLayer(openedPopups[openedPopups.length-1].name);
			}
		}

		return this;
	}

	function setScreenLockerSize() {
		if (popupLayerMyScreenLocker) {
			$("#popupLayerMyScreenLocker").css({
				position: "fixed",
				left: "0px",
				top: "0px",
				width: ($.getViewSize().w+$(document).scrollLeft()) + "px",
				height: ($.getViewSize().h+$(document).scrollTop()) + "px"
			});

			try{
				$("#popupLayerMyScreenLocker2").css({
				position: "fixed",
				left: "0px",
				top: "0px",
				width: ($.getViewSize().w+$(document).scrollLeft()) + "px",
				height: ($.getViewSize().h+$(document).scrollTop()) + "px"
			});
			}
			catch(e){}


		}


	}

	function checkIfItExists(name) {
		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					return true;
				}
			}
		}
		return false;
	}

	function showScreenLocker(hidebyclickbg,arg) {

		if ($("#popupLayerMyScreenLocker").length) {
			if (openedPopups.length == 1) {
				popupLayerMyScreenLocker = true;
				setScreenLockerSize();

				if(arg==null||arg==1)
				{
				try{$('#popupLayerMyScreenLocker2').css("display","none");}catch(e){}
				$('#popupLayerMyScreenLocker').fadeIn();
				}
				else if(arg==2)
				{
				$('#popupLayerMyScreenLocker').css("display","none");
				try{$('#popupLayerMyScreenLocker2').fadeIn();}catch(e){}
				}


			}

			/*
			try{
			if ($.browser.msie && $.browser.version < 7) {
				$("select:not(.hidden-by-jmp)").addClass("hidden-by-jmp hidden-by-" + openedPopups[openedPopups.length-1].name).css("visibility","hidden");
			}
			}catch(e){}
			*/

			$('#popupLayerMyScreenLocker').css("z-index",parseInt(openedPopups.length == 1 ? 999999 : $("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index").replace("px","")) + 1);
			$("#popupLayerMyScreenLocker").attr("hidebyclickbg",hidebyclickbg);

		} else {
			$("body").append("<div id='popupLayerMyScreenLocker'><!-- --></div>");
			if($("#container").width())
			{
				$("#container").append("<div id='popupLayerMyScreenLocker2'><!-- --></div>");
			}

			$("#popupLayerMyScreenLocker").css({
				position: "absolute",
				background: setupJqueryMPopups.screenLockerBackground,
				left: "0",
				top: "0",
				opacity: setupJqueryMPopups.screenLockerOpacity,
				display: "none"
			});



			try{
				$("#popupLayerMyScreenLocker2").css({
								position: "absolute",
								background: setupJqueryMPopups.screenLockerBackground,
								left: "0",
								top: "0",
								opacity: setupJqueryMPopups.screenLockerOpacity,
								display: "none"
							});

				$("#popupLayerMyScreenLocker2").attr("hidebyclickbg",hidebyclickbg);
			}
			catch(e){}




			$("#popupLayerMyScreenLocker").attr("hidebyclickbg",hidebyclickbg);

			showScreenLocker();

            $("#popupLayerMyScreenLocker").click(function() {
				if($("#popupLayerMyScreenLocker").attr("hidebyclickbg")!="false")
				{
                $.closePopupLayer();
				}
            });

            try{
            $("#popupLayerMyScreenLocker2").click(function() {
				if($("#popupLayerMyScreenLocker2").attr("hidebyclickbg")!="false")
				{
                $.closePopupLayer();
				}
            });
            }
			catch(e){}

		}
	}

	function hideScreenLocker(popupName) {
		try{
		if (openedPopups.length == 0) {
			screenlocker = false;
			$('#popupLayerMyScreenLocker').fadeOut();
			try{$('#popupLayerMyScreenLocker2').fadeOut();}catch(e){}
		} else {
			$('#popupLayerMyScreenLocker').css("z-index",parseInt($("#popupLayer_" + openedPopups[openedPopups.length - 1].name).css("z-index").replace("px","")) - 1);
			try{$('#popupLayerMyScreenLocker2').css("z-index",parseInt($("#popupLayer_" + openedPopups[openedPopups.length - 1].name).css("z-index").replace("px","")) - 1);}catch(e){}
		}

		if ($.browser.msie && $.browser.version < 7) {
			$("select.hidden-by-" + popupName).removeClass("hidden-by-jmp hidden-by-" + popupName).css("visibility","visible");
		}

		}catch(e){}
	}

	function setPopupLayersPosition(popupElement, animate) {
		if (popupElement) {

				//var allwidth=$.getViewSize().w;//document.documentElement.offsetWidth;
				//var allheight=$.getViewSize().h;

				//var allwidth=(window['innerWidth'] || document.documentElement.scrollWidth);
				//var allheight=(window['innerHeight'] || document.documentElement.scrollHeight);

			//if(openedPopups.length>0)
			//{
				//if(openedPopups[0].container!="")
				//{
				//allwidth=$("#"+openedPopups[0].container).width()+20;
				//allheight=$("#"+openedPopups[0].container).height();
				//alert($("#"+openedPopups[0].container).width())
				//}
			//}

			//alert(allwidth+","+$.getViewSize().w+","+popupElement.width())

			var scrollbarwidth=0;
			var offsetWidth_app_container=0;
			var offsetHeight_app_container=0;
			var margintop_mainlogin=0
			//try{if($("#main-login").css("marginTop")){margintop_mainlogin=20+parseInt($("#main-login").css("marginTop").replace("px",""))}}catch(e){}
			try{if($("#app").width() && $("#container").width()){scrollbarwidth=25;offsetWidth_app_container=$("#app").width()-$("#container").width();offsetHeight_app_container=$("#app").height()-$("#container").height();}}catch(e){}//容器误差


			var allwidth=0;
			var allheight=0;


				if(typeof(popupElement.attr("pagecontainer")) != "undefined" && popupElement.attr("pagecontainer")!="window" && popupElement.attr("pagecontainer")!=""){

					allwidth=parseInt($("#"+popupElement.attr("pagecontainer")).width());allheight=parseInt($("#"+popupElement.attr("pagecontainer")).height());
					if(allheight>$.getViewSize().h){allheight=$.getViewSize().h;}

				}else{

					allwidth=$.getViewSize().w+scrollbarwidth;allheight=$.getViewSize().h;}


				if(parseFloat(popupElement.attr("widthstr"))<1){if(allwidth*parseFloat(popupElement.attr("widthstr"))<parseInt(popupElement.attr("minwidthstr"))){popupElement.css({"width":parseInt(popupElement.attr("minwidthstr"))+"px"});}else{popupElement.css({"width":parseInt(allwidth*parseFloat(popupElement.attr("widthstr")))+"px"});}}
				if(parseFloat(popupElement.attr("heightstr"))<1){if(allheight*parseFloat(popupElement.attr("heightstr"))<parseInt(popupElement.attr("minheightstr"))){popupElement.css({"height":parseInt(popupElement.attr("minheightstr"))+"px"});}else{popupElement.css({"height":parseInt(allheight*parseFloat(popupElement.attr("heightstr")))+"px"});}}

//myalert(popupElement.css("height"))


            if (popupElement.width() < allwidth) {

				var leftPosition = (allwidth - popupElement.width()) / 2+13;
			} else {

				var leftPosition = $(document).scrollLeft();
			}


//myalert(leftPosition)

			if (popupElement.height() < allheight) {
				var topPosition = $(document).scrollTop() + (allheight - popupElement.height()) / 2;
			} else {
				var topPosition = $(document).scrollTop() ;
			}


			if(openedPopups[0].top!="auto")
			{
				topPosition=openedPopups[0].top;
			}

			if(openedPopups[0].layout_position=="bottom")
			{
			topPosition=allheight-popupElement.height()-5;
			}

			if(openedPopups[0].layout_position=="right")
			{
			leftPosition=(allwidth - popupElement.width()-5) ;
			}


//myalert(offsetWidth_app_container)

if(offsetWidth_app_container<=30 && offsetWidth_app_container>0)
{
	showScreenLocker(null,2);
}
else
{
	showScreenLocker(null,1);
}


//if(offsetWidth_app_container>20)
//{
	if(offsetWidth_app_container>0)
	{

		leftPosition=leftPosition-offsetWidth_app_container;
	}

//}
if(offsetHeight_app_container>50)
{
	topPosition=topPosition-60-margintop_mainlogin;
}

//myalert(popupElement.css("width"))
//$("#popupLayerMyScreenLocker").css({position:"absolute"});

//$("#popupLayerMyScreenLocker").css("z-index",$("#popupLayerMyScreenLocker").css("z-index")-1)


			var positions = {
				position: "absolute",
				left: leftPosition + "px",
				top: topPosition + "px"
			};

			//alert(allwidth+","+popupElement.width()+","+leftPosition)

			//alert(leftPosition)

			//if (!animate) {
				popupElement.css(positions);
			//} else {
			//	popupElement.animate(positions, "fast");
			//}

            setScreenLockerSize();
		} else {
			for (var i = 0; i < openedPopups.length; i++) {

				if (openedPopups[i].target != "") {
					setPopupLayersPosition($("#" + openedPopups[i].target), true);
					}
					else
					{
					setPopupLayersPosition($("#popupLayer_" + openedPopups[i].name), true);
					}


			}
		}


//myalert(popupElement.css("z-index")+","+$('#popupLayerMyScreenLocker').css("z-index"))


	}

    function showPopupLayerContent(popupObject, newElement, data) {
        var idElement = "popupLayer_" + popupObject.name;

        if (newElement) {
			if(popupObject.showLockerBackground!="false")
			{
			showScreenLocker(popupObject.hidebyclickbg);
			}


				$("body").append("<div id='" + idElement + "' class='roundrec' style='background:#fff;'><!-- --></div>");



			var zIndex = parseInt(openedPopups.length == 1 ? 1000000 : $("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index")) + 2;
		}  else {
			var zIndex = $("#" + idElement).css("z-index");
		}

        var popupElement =  null;



		if (popupObject.target != "") {
		popupElement =  $("#" + popupObject.target);
		}
		else
		{
		popupElement =  $("#" + idElement);
		}


		popupElement.attr("pagecontainer",popupObject.pagecontainer);
		popupElement.attr("widthstr",popupObject.width);
		popupElement.attr("heightstr",popupObject.height);
		popupElement.attr("minwidthstr",(popupObject.minwidth==null||popupObject.minwidth=="")?"0":popupObject.minwidth);
		popupElement.attr("minheightstr",(popupObject.minheight==null||popupObject.minheight=="")?"0":popupObject.minheight);



		popupElement.css({
			visibility: "hidden",
			width: popupObject.width == "auto" ? "" : popupObject.width + "px",
			height: popupObject.height == "auto" ? "" : popupObject.height + "px",
				left: popupObject.left == "auto" ? "" : popupObject.left + "px",
				top: popupObject.top == "auto" ? "" : popupObject.top + "px",
			position: "absolute"

		});

		popupElement.css("z-index",zIndex);

		var linkAtTop = "";//<a href='#' class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;'>&nbsp;</a><input class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;' />";
		var linkAtBottom = "";//<a href='#' class='jmp-link-at-bottom' style='position:absolute; left:-9999px; bottom:-1px;'>&nbsp;</a><input class='jmp-link-at-bottom' style='position:absolute; left:-9999px; top:-1px;' />";

		if (popupObject.target != "") {
			//alert($("#" + popupObject.target).html())
			//popupElement.html($("#" + popupObject.target).html());
			//$("#" + popupObject.target).html("");
		}
		else{

			popupElement.append(linkAtTop + data + linkAtBottom);
		//popupElement.html(linkAtTop + data + linkAtBottom);
		}



		setPopupLayersPosition(popupElement);

        popupElement.css("display","none");
        popupElement.css("visibility","visible");

		if (newElement) {
        	popupElement.fadeIn();
		} else {
			popupElement.show();
		}


		/*
        $("#" + idElement + " .jmp-link-at-top, " +
		  "#" + idElement + " .jmp-link-at-bottom").focus(function(){
			$(focusableElement[focusableElement.length-1]).focus();
		});

		var jFocusableElements = $("#" + idElement + " a:visible:not(.jmp-link-at-top, .jmp-link-at-bottom), " +
								   "#" + idElement + " *:input:visible:not(.jmp-link-at-top, .jmp-link-at-bottom)");

		if (jFocusableElements.length == 0) {
			var linkInsidePopup = "<a href='#' class='jmp-link-inside-popup' style='position:absolute; left:-9999px;'>&nbsp;</a>";
			popupElement.find(".jmp-link-at-top").after(linkInsidePopup);
			focusableElement.push($(popupElement).find(".jmp-link-inside-popup")[0]);
		} else {
			jFocusableElements.each(function(){
				if (!$(this).hasClass("jmp-link-at-top") && !$(this).hasClass("jmp-link-at-bottom")) {
					focusableElement.push(this);
					return false;
				}
			});
		}

		$(focusableElement[focusableElement.length-1]).focus();
		*/


		popupObject.success();


		if (popupObject.reloadSuccess) {
			popupObject.reloadSuccess();
			popupObject.reloadSuccess = null;
		}
    }

	function loadPopupLayerContent(popupObject, newElement) {
		if (newElement) {
			openedPopups.push(popupObject);
		}
		//alert($("#" + popupObject.target).html())
		if (popupObject.target != "") {
            showPopupLayerContent(popupObject, newElement, "");
        } else {
            $.ajax({
                url: popupObject.url,
                data: popupObject.parameters,
				cache: popupObject.cache,
                dataType: "html",
                method: "GET",
                success: function(data) {
                    showPopupLayerContent(popupObject, newElement, data);
                },
				error: popupObject.error
            });
		}
	}

	$(window).resize(function(){
		setScreenLockerSize();
		setPopupLayersPosition();
	});

	$(document).keydown(function(e){
		if (e.keyCode == 27) {
			$.closePopupLayer();
		}
	});
})(jQuery);
