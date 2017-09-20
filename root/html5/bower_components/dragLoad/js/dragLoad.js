
 var DragLoad_scrollrunning=0;
 var DragLoad_defaults = {
			fromField: "from",
			from:1,
			currentPageField: "toPage",
			currentPage : 1,
			pageCountField: "numperPage",
            pageCount : 20,
            //配置加载提示dom
            //延迟显示，即加载提示显示时间
            delayTime:1000}



function DragLoad(opt ,isscroll)
{
	if(isscroll!="scroll")
	{
	DragLoad_defaults.currentPage=1;
	}


	var opts = $.extend({}, DragLoad_defaults, opt);
	var data = {};
			data[DragLoad_defaults.fromField] = DragLoad_defaults.from;
			data[DragLoad_defaults.currentPageField] = DragLoad_defaults.currentPage;
			if(opts.pageCount)
			{
			data[DragLoad_defaults.pageCountField] = opts.pageCount;
			}
			else
			{
			data[DragLoad_defaults.pageCountField] = DragLoad_defaults.pageCount;
			}
            $.ajax({
				url: opts.url,
				async: false,
                type: 'get',
                dataType: 'json',
                data: data,
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',

                beforeSend: function(e){
						DragLoad_beforeSend(DragLoad_defaults.currentPage,opts.id);
                },
                success: function (rv) {
					console.info('getproducts',rv);
					var data=rv.data;
					var dom="";
					var isok=false;

					if(data != null && data!=""){
							DragLoad_packageDom(data,opts.id,DragLoad_defaults.currentPage);
							DragLoad_defaults.currentPage = DragLoad_defaults.currentPage + 1;
							DragLoad_defaults.from = DragLoad_defaults.from + DragLoad_defaults.pageCount;
					}
					else
					{
							DragLoad_noMoreHandle(opts.id);
					}


					DragLoad_scrollrunning=0;




                },
                error: function (xhr, type) {

                }
			})






	$(document).unbind("scroll");

	$(document).scroll(function () {



                //已经滚动到上面的页面高度
                var scrollTop = $(this).scrollTop();
                //页面高度
                var scrollHeight = $(document).height();
                //浏览器窗口高度
                var windowHeight = $(window).height();
                //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作

                var bot = 60;
//bot是底部距离的高度


                if (scrollTop + windowHeight >= scrollHeight && DragLoad_scrollrunning==0) {

					DragLoad_scrollrunning=1;
                    DragLoad(opt, "scroll");

                }

					try{
					if(scrollTop>100)
					{
					$("#totopbtn").css("display","block");
					}
					else if(scrollTop<=100)
						{
					$("#totopbtn").css("display","none");
					}
					}catch(e){}

            });

}



$("#totopbtn").click(function()
{
$('html, body').scrollTop(0);
$(this).css("display","none");
});
