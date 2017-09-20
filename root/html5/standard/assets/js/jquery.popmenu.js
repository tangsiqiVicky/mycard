/*
jQuery Pop Menu
Version: beta
Author: Guc. http://www.gucheen.pro
Based on jQuery 2.0.3
*/

(function ($) {

    $.fn.popmenu = function (options) {

        var settings = $.extend({
            'controller': true,
            'width': '100%',
            'background': 'rgba(56, 121, 217, 0.5)',
            'focusColor': '#1abc9c',
            'borderRadius': '10px',
            'top': '0',
            'left': '0',
			'position':'',
			'fontColor':'#0a3248',
			'iconColor':'#fff',
			'iconSizeW': '50px',
			'iconSizeH': '',
            'iconBlockW': '90px',
			'iconBlockH': ''
        }, options);
        if (settings.controller === true) {
            var temp_display = 'none';
        } else {
            var temp_display = 'block';
        }
        var tar = $(this);
        var tar_body = tar.children('ul');
        var tar_list = tar_body.children('li');
        var tar_a = tar_list.children('a');
        var tar_ctrl = tar.children('.pop_ctrl');
		var tar_icon = tar_a.children('.icon');
		var tar_caption = tar_a.children('.caption');


        function setIt() {
			
			
			/*自适应*/
			/*
			var max_col=parseInt(page_w/(parseInt(settings.iconBlockW.replace("px",""))+10) );
			
			if(max_col<4)
			{
				settings.iconBlockW="70px";
				max_col=parseInt(page_w/(parseInt(settings.iconBlockW.replace("px",""))+10) );
				if(tar_list.length>max_col)
					{
					settings.width=max_col*(parseInt(settings.iconBlockW.replace("px",""))+10)+"px"
					}
					else
					{
					settings.width=tar_list.length*(parseInt(settings.iconBlockW.replace("px",""))+10)+"px"
					}

			}
			else
			{
				if(tar_list.length>max_col)
				{
				settings.width=max_col*(parseInt(settings.iconBlockW.replace("px",""))+10)+"px"
				}
				else
				{
				settings.width=tar_list.length*(parseInt(settings.iconBlockW.replace("px",""))+10)+"px"
				}
			}
			*/
			
			
			/*指定列*/
			var max_col=4;
			settings.iconBlockW=(parseInt(page_w/max_col))+"px";
			settings.width=max_col*(parseInt(settings.iconBlockW.replace("px",""))+10)+"px";
			
			
            tar_body.css({
                'display': temp_display,
                'position': settings.position,
                'margin-top': -settings.top,
                'margin-left': -settings.left,
                'background': settings.background,
                'width': settings.width,
                'padding': '0',
                'border-radius': settings.borderRadius
            });

				tar_icon.css({
                'background': settings.background,
					'color': settings.iconColor,
					'font-size':'12px',
						'width': settings.iconSizeW,
					'height': settings.iconSizeH,
						'text-align': 'center',
					'padding': '0',
							'margin-bottom':'10px',
											'margin-left':(parseInt(settings.iconBlockW.replace("px",""))-parseInt(settings.iconSizeW.replace("px","")))/2,
						'border-radius': settings.borderRadius
            });

				
					tar_list.css({
						'display': 'block',
						'color': settings.fontColor,
							'margin':'5px',
						'float': 'left',
						'width': settings.iconBlockW,
						'height': settings.iconBlockH,
						'text-align': 'center',
						'padding-bottom':'10px',
						'border-radius': settings.borderRadius
						//	'background': settings.background
					});
				
				
            tar_a.css({
                'text-decoration': 'none',
					'margin':'0px',
					'height':'10px',
               'text-align': 'center'
            });
			

				tar_caption.css({
                'text-decoration': 'none',
					'margin':'0px',
					'height':'10px',
                'color': settings.fontColor
            });


/*
			if(settings.fontColor=="")
				{
					var colorstr="#00CC33,#00CC00,#C75000,#FF9900,#23DB8D,#CCFF00,#ff6600,#ffcc00";
					colorstr="#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff";
					for(var i=0;i<tar_list.length;i++){
						tar_list[i].style.color="rgba(10, 50, 72, 1)";//colorstr.split(",")[i%8]
					}

					for(var i=0;i<tar_a.length;i++){
								tar_a[i].style.color="rgba(10, 50, 72, 1)";//colorstr.split(",")[i%8]
					}
				}


*/



            tar_ctrl.hover(function () {
                tar_ctrl.css('cursor', 'pointer');
            }, function () {
                tar_ctrl.css('cursor', 'default')
            });
            tar_ctrl.click(function (e) {
                e.preventDefault();
                tar_body.show('fast');
                $(document).mouseup(function (e) {
                    var _con = tar_body;
                    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                        _con.hide();
                    }
                    //_con.hide(); some functions you want
                });
            });

			/*
            tar_list.hover(function () {
                $(this).css({
                    'background': settings.focusColor,
                    'cursor': 'pointer'
                });
            }, function () {
                $(this).css({
                    'background': settings.background,
                    'cursor': 'default'
                });
            });
			*/

			 tar_icon.hover(function () {
                $(this).css({
                    'background': settings.focusColor,
                    'cursor': 'pointer'
                });
            }, function () {
                $(this).css({
                    'background': settings.background,
                    'cursor': 'default'
                });
            });

        }
        return setIt();

    };

}(jQuery));