'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/login/signin");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        template: '<div ui-view class="fade-in-up"></div>',
//templateUrl: "assets/views/app.html",
        //resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl','dragLoad'),
		resolve: loadSequence('uiSwitch',  'perfect-scrollbar-plugin','toaster',  'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'dragLoad'),
        abstract: true
    }).state('app.dashboard', {
        url: "/dashboard",
		templateUrl: "assets/views/dashboard.html",
        resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })


	// Login routes

	.state('login', {
	    url: '/login',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true
	}).state('login.signin', {
	    url: '/signin?uid&pwd&isreglogin&fromurl&applogin_token',
	    templateUrl: "assets/views/login_login.html"
	}).state('login.logout', {
	    url: '/logout',
	    templateUrl: "assets/views/login_logout.html"
	}).state('login.forgot', {
	    url: '/forgot',
	    templateUrl: "assets/views/login_forgot.html"
	}).state('login.registration', {
	    url: '/registration?theinvitor',
	    templateUrl: "assets/views/login_registration.html"

	})
		.state('login.shopregistration', {
	    url: '/shopregistration?theinvitor',
	    templateUrl: "assets/views/login_shopregistration.html",
			resolve: loadSequence('ngTable')

	})
		.state('login.lockscreen', {
	    url: '/lock',
	    templateUrl: "assets/views/login_lock_screen.html"
	}).state('login.memlaw', {
	    url: '/memlaw',
	    templateUrl: "assets/views/login_registration_memlaw.html"
	})
		.state('login.shoplaw', {
	    url: '/shoplaw',
	    templateUrl: "assets/views/login_registration_shoplaw.html"
	})









	.state('app.mk', {
        url: '/mk',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'MK',
        ncyBreadcrumb: {
            label: 'MK'
        }
    })
	/*
	.state('app.mk.seller', {
	    url: '/seller',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'seller',
        ncyBreadcrumb: {
            label: 'seller'
        }
	}).state('app.mk.seller.type', {
	    url: '/type',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.mk.seller.search', {
	    url: '/search',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.mk.seller.carefor', {
	    url: '/carefor',
	    templateUrl: "assets/views/login_login.html"
	})
*/
	.state('app.mk.member', {
	    url: '/member',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'member',
        ncyBreadcrumb: {
            label: 'member'
        }
	}).state('app.mk.member.reg', {
	    url: '/reg',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.mk.member.search', {
	    url: '/search',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.mk.member.carefor', {
	    url: '/carefor',
	    templateUrl: "assets/views/login_login.html"
	})




/*
	.state('app.hm', {
        url: '/hm',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'UI Elements',
        ncyBreadcrumb: {
            label: 'UI Elements'
        }
    }).state('app.hm.reception', {
	    url: '/reception',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.hm.room', {
	    url: '/room',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.hm.member', {
	    url: '/member',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.hm.service', {
	    url: '/service',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.hm.rm', {
	    url: '/rm',
	    templateUrl: "assets/views/login_login.html"
	}).state('app.hm.stat', {
	    url: '/stat',
	    templateUrl: "assets/views/login_login.html"
	})

*/

	.state('app.eco', {
        url: '/eco',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'UI Elements',
        ncyBreadcrumb: {
            label: 'UI Elements'
        }
    }).state('app.eco.gis', {
	    url: '/gis',
	    templateUrl: "assets/views/mk/gis.html",
		resolve: loadSequence('touchspin-plugin', 'ngTable')
	}).state('app.eco.gift', {
        url: '/gift?po_id',
        templateUrl: "assets/views/mk/gift.html",
        resolve: loadSequence('touchspin-plugin', 'ngTable')
    }).state('app.eco.useticket', {
        url: '/useticket?ticket_id&ticket_type&shop_id&shop_name',
        templateUrl: "assets/views/mk/useticket.html",
        resolve: loadSequence('touchspin-plugin', 'ngTable')
    })
    .state('app.eco.dc_man', {
        url: '/dc_man?shop_id',
        templateUrl: "assets/views/mk/dc_man.html",
        resolve: loadSequence('ngTable')
    })
    .state('app.eco.dc_record', {
        url: '/dc_record?dc_id',
        templateUrl: "assets/views/mk/dc_record.html",
        resolve: loadSequence('ngTable')
    })
    .state('app.eco.dc_stat', {
        url: '/dc_stat?dc_id',
        templateUrl: "assets/views/mk/dc_stat.html",
        resolve: loadSequence('ngTable')
    }).state('app.eco.les-miserables', {
        url: '/les-miserables',
        templateUrl: "assets/views/mk/les-miserables.html",
        resolve: loadSequence('ngTable')
    })
    .state('app.eco.dc', {
        url: '/dc?dc_id&record_id',
        templateUrl: "assets/views/mk/dc.html",
        resolve: loadSequence('ngTable')
    })
    .state('app.eco.dc_detail', {
        url: '/dc_detail',
        templateUrl: "assets/views/mk/dc_detail.html",
        resolve: loadSequence('ngTable')
    })

  .state('app.eco.list', {
    url: '/list',
    templateUrl: "assets/views/mk/list.html",
    resolve: loadSequence('ngTable')
})
  .state('app.eco.partner', {
	    url: '/partner',
	    templateUrl: "assets/views/mk/partner.html"
	})
		.state('app.eco.firstpage', {
	    url: '/firstpage',
	    templateUrl: "assets/views/mk/firstpage.html"
	})
		.state('app.eco.fav', {
	    url: '/fav',
	    templateUrl: "assets/views/mk/fav.html"
	})

	.state('app.wx', {
        url: '/wx',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'UI Elements',
        ncyBreadcrumb: {
            label: 'UI Elements'
        }
    }).state('app.wx.seller', {
	    url: '/seller',
	    templateUrl: "assets/views/mk/seller.html"
	}).state('app.wx.deal', {
	    url: '/deal',
	    templateUrl: "assets/views/mk/deal.html"


	})
	.state('app.wx.me.iwant', {
	    url: '/iwant',
	    templateUrl: "assets/views/mk/iwant.html"


	})
	.state('app.wx.me', {
        url: '/me',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'MK',
        ncyBreadcrumb: {
            label: 'MK'
        }
    }).state('app.wx.me.invite', {
	    url: '/invite',
        templateUrl: "assets/views/mk/invite.html",
			resolve: loadSequence('ngTable')
	}).state('app.wx.me.integration', {
	    url: '/integration',
        templateUrl: "assets/views/mk/integration.html"
	}).state('app.wx.me.integration_detail_xf', {
	    url: '/integration_detail_xf',
        templateUrl: "assets/views/mk/integration_detail_xf.html",
			resolve: loadSequence('ngTable')
	}).state('app.wx.me.integration_detail_used', {
	    url: '/integration_detail_used',
        templateUrl: "assets/views/mk/integration_detail_used.html",
			resolve: loadSequence('ngTable')
	}).state('app.wx.me.integration_detail_pj', {
	    url: '/integration_detail_pj',
        templateUrl: "assets/views/mk/integration_detail_pj.html",
			resolve: loadSequence('ngTable')
	}).state('app.wx.me.search', {
	    url: '/search',
        templateUrl: "assets/views/mk/search.html"
	}).state('app.wx.me.mymember', {
	    url: '/mymember',
        templateUrl: "assets/views/mk/mymember.html",
			 resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
	})
		.state('app.wx.me.mymemberlist', {
	    url: '/mymemberlist?inviter_id&level',
        templateUrl: "assets/views/mk/mymember_list.html",
			resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mymembernew', {
	    url: '/mymembernew?inviter_id&theid&opertype',
        templateUrl: "assets/views/mk/mymember_new.html",
			resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.dealstat', {
	    url: '/dealstat',
        templateUrl: "assets/views/mk/deal_stat.html",
			resolve: loadSequence('ngTable')
	}).state('app.wx.me.self', {
	    url: '/self',
        templateUrl: "assets/views/mk/self.html"
	})
		.state('app.wx.me.self_new', {
	    url: '/self_new?user_id&opertype',
        templateUrl: "assets/views/mk/self_new.html",
		resolve: loadSequence('ngTable')
	})
		.state('app.wx.me.mymsg', {
	    url: '/mymsg',
        templateUrl: "assets/views/mk/mymsg.html",
			resolve: loadSequence('ngTable')
	})
		.state('app.wx.me.myticket', {
	    url: '/myticket',
        templateUrl: "assets/views/mk/myticket.html",
			resolve: loadSequence('ngTable')
	})

		.state('app.wx.me.mysendgift', {
	    url: '/mysendgift',
        templateUrl: "assets/views/mk/mysendgift.html",
		resolve: loadSequence('ngTable')
	})

	.state('app.wx.me.order', {
	    url: '/order',
        templateUrl: "assets/views/mk/myorder.html",
		resolve: loadSequence('ngTable')
	})

		.state('app.wx.me.orderdetail', {
	    url: '/orderdetail?po_id&make_date',
        templateUrl: "assets/views/mk/myorderdetail.html",
		resolve: loadSequence('ngTable')
	})
		.state('app.wx.me.incharge', {
	    url: '/incharge',
        templateUrl: "assets/views/mk/incharge.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.incharge_new', {
	    url: '/incharge_new',
        templateUrl: "assets/views/mk/incharge_new.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.incharge_detail', {
	    url: '/incharge_detail',
        templateUrl: "assets/views/mk/incharge_detail.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.incharge_xf_detail', {
	    url: '/incharge_xf_detail',
        templateUrl: "assets/views/mk/incharge_xf_detail.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.cart', {
	    url: '/cart',
        templateUrl: "assets/views/mk/cart.html",
		resolve: loadSequence(  'touchspin-plugin', 'ngTable')
	})
			.state('app.wx.me.plan', {
	    url: '/plan',
        templateUrl: "assets/views/mk/plan.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.problem', {
	    url: '/problem',
        templateUrl: "assets/views/mk/problem.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.about', {
	    url: '/about',
        templateUrl: "assets/views/mk/about.html",
		resolve: loadSequence('ngTable')
	})

			.state('app.wx.me.zb', {
	    url: '/zb',
        templateUrl: "assets/views/mk/zb.html",
		resolve: loadSequence('ngTable')
	})

			.state('app.wx.me.pay_code', {
	    url: '/pay_code',
        templateUrl: "assets/views/mk/pay_code.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.settle', {
	    url: '/settle',
        templateUrl: "assets/views/mk/settle.html"
	})
			.state('app.wx.me.settle_mem', {
	    url: '/settle_mem',
        templateUrl: "assets/views/mk/settle_mem.html"
	})
			.state('app.wx.me.settle_shop', {
	    url: '/settle_shop',
        templateUrl: "assets/views/mk/settle_shop.html"
	})
			.state('app.wx.me.help', {
	    url: '/help',
        templateUrl: "assets/views/mk/help.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.po', {
	    url: '/po',
        templateUrl: "assets/views/mk/po.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.shoplist', {
	    url: '/shoplist?subtype&opertype',
        templateUrl: "assets/views/mk/shoplist.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.shopinfo', {
	    url: '/shopinfo?shop_id&product_type&startDate&endDate&qty&phone&person_name',
        templateUrl: "assets/views/mk/shopinfo.html",
		resolve: loadSequence('ngTable')
	}).state('app.wx.me.changeDate', {
        url: '/changeDate?fromurl?shop_id?goods_id',
        templateUrl: "assets/views/mk/changeDate.html",
        resolve: loadSequence('ngTable')
    }).state('app.wx.me.changesearch', {
        url: '/changesearch?fromurl?shop_id?goods_id&startDate&endDate&goods_name&products_type&opertype',
        templateUrl: "assets/views/mk/changesearch.html",
        resolve: loadSequence('ngTable')
    }).state('app.wx.me.changePeople', {
        url: '/changePeople?fromurl?shop_id?goods_id&room_qty&startDate&endDate&goods_name&products_type&opertype',
        templateUrl: "assets/views/mk/changePeople.html",
        resolve: loadSequence('ngTable')
    })
			.state('app.wx.me.producttypeinfo', {
	    url: '/producttypeinfo?shop_id&product_type',
        templateUrl: "assets/views/mk/producttypeinfo.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.shopgoods_by_producttype', {
	    url: '/shopgoods_by_producttype?shop_id&sub_type&product_type&startDate&endDate&product_no&type&goods_name',
        templateUrl: "assets/views/mk/shopgoods_by_producttype.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.goodsinfo', {
	    url: '/goodsinfo?goods_id&product_type&startDate&endDate&qty&phone&person_name&statuss',
        templateUrl: "assets/views/mk/goodsinfo.html",
		resolve: loadSequence('ngTable')
	})
	.state('app.wx.me.mkslidepic', {
	    url: '/mkslidepic?mod_type',
        templateUrl: "assets/views/mk/mkslidepic.html",
		resolve: loadSequence('ngTable')
	})
	.state('app.wx.me.mkslidepictype', {
	    url: '/mkslidepictype',
        templateUrl: "assets/views/mk/mkslidepictype.html",
		resolve: loadSequence('ngTable')
	})
	.state('app.wx.me.Introduce', {
	    url: '/Introduce',
        templateUrl: "assets/views/mk/Introduce.html",
		resolve: loadSequence('ngTable')
	})
	.state('app.wx.me.mypublish', {
	    url: '/mypublish',
        templateUrl: "assets/views/mk/mypublish.html",
		resolve: loadSequence('ngTable')
	})
	.state('app.wx.me.mypublish_msg', {
	    url: '/mypublish_msg',
        templateUrl: "assets/views/mk/mypublish_msg.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_shopinfo', {
	    url: '/mypublish_shopinfo',
        templateUrl: "assets/views/mk/mypublish_shopinfo.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_msg_new', {
	    url: '/mypublish_msg_new?opertype&theid',
        templateUrl: "assets/views/mk/mypublish_msg_new.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_shopinfo_new', {
	    url: '/mypublish_shopinfo_new?shop_id&opertype',
        templateUrl: "assets/views/mk/mypublish_shopinfo_new.html",
		resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')

	})
	.state('app.wx.me.mypublish_goodstype', {
	    url: '/mypublish_goodstype',
        templateUrl: "assets/views/mk/mypublish_goodstype.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_goodstype_new', {
	    url: '/mypublish_goodstype_new?shop_id&products_type',
        templateUrl: "assets/views/mk/mypublish_goodstype_new.html",
		resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
	})


			.state('app.wx.me.mypublish_tickettype', {
	    url: '/mypublish_tickettype',
        templateUrl: "assets/views/mk/mypublish_tickettype.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_tickettype_new', {
	    url: '/mypublish_tickettype_new?shop_id&ticket_type',
        templateUrl: "assets/views/mk/mypublish_tickettype_new.html",
		resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
	})



			.state('app.wx.me.mypublish_addr', {
	    url: '/mypublish_addr',
        templateUrl: "assets/views/mk/mypublish_addr.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_addr_new', {
	    url: '/mypublish_addr_new?user_id',
        templateUrl: "assets/views/mk/mypublish_addr_new.html",
		resolve: loadSequence('ngTable')
	})


			.state('app.wx.me.mypublish_goods', {
	    url: '/mypublish_goods',
        templateUrl: "assets/views/mk/mypublish_goods.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_goods_new', {
	    url: '/mypublish_goods_new?shop_id&opertype&theid',
        templateUrl: "assets/views/mk/mypublish_goods_new.html",
		resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
	})

			.state('app.wx.me.mypublish_ticket', {
	    url: '/mypublish_ticket',
        templateUrl: "assets/views/mk/mypublish_ticket.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mypublish_ticket_new', {
	    url: '/mypublish_ticket_new?shop_id&opertype&theid',
        templateUrl: "assets/views/mk/mypublish_ticket_new.html",
		resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
	})	.state('app.wx.me.send_ticket', {
        url: '/send_ticket',
        templateUrl: "assets/views/mk/send_ticket.html",
        resolve: loadSequence('ngTable')
    })
		.state('app.wx.me.mypublish_sendticket', {
        url: '/mypublish_sendticket',
        templateUrl: "assets/views/mk/mypublish_sendticket.html",
        resolve: loadSequence('ngTable')
    })
        .state('app.wx.me.mypublish_sendticket_new', {
            url: '/mypublish_sendticket_new?shop_id&opertype&theid',
            templateUrl: "assets/views/mk/mypublish_sendticket_new.html",
            resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
        }).state('app.wx.me.mypublish_nosendticket', {
        url: '/mypublish_nosendticket',
        templateUrl: "assets/views/mk/mypublish_nosendticket.html",
        resolve: loadSequence('ngTable')
    })
        .state('app.wx.me.mypublish_nosendticket_new', {
            url: '/mypublish_nosendticket_new?shop_id&opertype&theid',
            templateUrl: "assets/views/mk/mypublish_nosendticket_new.html",
            resolve: loadSequence('ngTable','ckeditor-plugin', 'ckeditor')
        })


	.state('app.wx.me.newact', {
	    url: '/newact',
        templateUrl: "assets/views/mk/newact.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.point_right', {
	    url: '/point_right',
        templateUrl: "assets/views/mk/point_right.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.oneminute', {
	    url: '/oneminute',
        templateUrl: "assets/views/mk/oneminute.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mkman', {
	    url: '/mkman',
        templateUrl: "assets/views/mk/mkman.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mkman_oneminute', {
	    url: '/mkman_oneminute',
        templateUrl: "assets/views/mk/mkman_oneminute.html",
		resolve: loadSequence('ngTable')
	})
			.state('app.wx.me.mkman_oneminute_new', {
	    url: '/mkman_oneminute_new?opertype&theid',
        templateUrl: "assets/views/mk/mkman_oneminute_new.html",
		resolve: loadSequence('touchspin-plugin','ngTable')
	})
			.state('app.wx.me.lxr', {
	    url: '/lxr?user_id',
        templateUrl: "assets/views/mk/lxr.html"
	})
		.state('app.wx.me.lxr_new', {
	    url: '/lxr_new?user_id',
        templateUrl: "assets/views/mk/lxr_new.html"
	})
		.state('app.wx.me.scan', {
	    url: '/scan?qrcode',
        templateUrl: "assets/views/mk/scan.html"
	})

.state('app.wx.me.yiy', {
	    url: '/yiy',
        templateUrl: "assets/views/mk/yiy.html"

	})

		.state('app.wx.me.shops_admin', {
	    url: '/shops_admin?shop_id',
        templateUrl: "assets/views/mk/shops_admin.html",
			resolve: loadSequence('ngTable')

	})
		.state('app.wx.me.shops_oper', {
	    url: '/shops_oper?shop_id',
        templateUrl: "assets/views/mk/shops_oper.html",
			resolve: loadSequence('ngTable')

	})
		.state('app.eco.xxdj', {
	    url: '/xxdj',
	    templateUrl: "assets/views/mk/xxdj.html"
	})

	;





/*
	var options = {
				url:myforwardurl(serviceRoot+'x5_main_info?actiontype=sysrouter',serviceRoot),
				async: false,
                type: 'get',
                dataType: 'jsonp',
                data: null,
				resetForm:true,
				timeout:60000,
				jsonp:'callback',
                success: function (rv) {
					var isok=false;

					$.each(rv.data,function(idx,item){

					  if(item.mod_type=="page")
						{
							$stateProvider.state(item.state, {
														url: item.url,
														templateUrl: item.templateUrl,
															resolve: loadSequence(item.resolve)

													})

						}
						else if(item.mod_type=="path")
						{
							$stateProvider.state(item.state, {
														url: item.url,
														template: item.template,
														title: item.title,
												        ncyBreadcrumb: {
												            label: item.title
												        },
															resolve: loadSequence(item.resolve)

													})

						}

					})

                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {

						//alert("sysrouter err");
                     }
            };
            $.ajax(options);

*/















    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
				if(_args.length==1)
				{
					if(_args[0].indexOf(",")>0)
					{
						for (var i = 0, len = _args[0].split(",").length; i < len; i++) {
							if(_args[0].split(",")[i]!="")
							{
							promise = promiseThen(_args[0].split(",")[i].replace(/'/g,""));
							}
						}
					}
					else
					{
					promise = promiseThen(_args[0]);
					}
				}
				else
				{
					for (var i = 0, len = _args.length; i < len; i++) {
						promise = promiseThen(_args[i]);
					}
				}
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);
