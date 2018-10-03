/**
 * Created by Joe on 2018/6/6.
 */
define(['js/routes', 'js/loader', 'angularAMD', 'ui-bootstrap', 'ui.route', 'angularloading', 'sweetalert'], function (config, loader, angularAMD) {

        var app = angular.module("webapp", ['ui.bootstrap', 'ui.router','chieffancypants.loadingBar' ]);

        app.config(function($stateProvider, $urlRouterProvider) {
            // 配置路由
            if (config.routes != undefined) {
                angular.forEach(config.routes, function(route, path) {
                    $stateProvider.state(path, {
                        templateUrl : route.templateUrl,
                        url : route.url,
                        controller:route.controller,
                        controllerAs:route.controllerAs,
                        resolve : loader(route.dependencies),
                        // allowAnonymous: route.allowAnonymous
                    });
                });
            }
            // 默认路由
            if (config.defaultRoute != undefined) {
                $urlRouterProvider.when("", config.defaultRoute);
            }
        });

        app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            //cfpLoadingBarProvider.includeSpinner = true;
            //cfpLoadingBarProvider.spinnerTemplate = '<div class="mastermain"> <div class="spanner"> <i class="fa fa-spinner fa-spin"></i> <div class="loadingMes" ng-bind="loadingMes"> </div> </div> </div>';
        }]);
        //与后台交互转换未POST方式
        app.config(function ($httpProvider) {
            $httpProvider.interceptors.push("myInterceptors");
            // $httpProvider.defaults.transformRequest = function (obj) {
            //     var str = [];
            //     for (var p in obj) {
            //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //     }
            //     console.log(str)
            //     return str.join("&");
            //     // return JSON.stringify(obj);
            // };
            // $httpProvider.defaults.headers.post = {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
            //  $httpProvider.defaults.withCredentials = true;
        });
       
        app.config(['$compileProvider', function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
        }]);
        app.factory("myInterceptors", function ($rootScope,$q,$location,$timeout,$sce,cfpLoadingBar,MessageBox) {
            return {
                "request": function (config) {
                    cfpLoadingBar.start();

                    if (config.params != undefined) {
                        //noinspection JSAnnotator
                    }
                    var token=sessionStorage.getItem("token");
                    if(token){
                        config.headers.authorization = 'BasicAuth ' + token;
                    }

                    return config;
                },
                "response": function (response) {
                    var data = response.data;
                    cfpLoadingBar.complete();
                    if(data==undefined){
                        MessageBox.showToast(response.message);
                    }else{
                        if (data.code != 200) {
                            MessageBox.showToast(data.message);
                        }
                    }

                    return response;
                },
                "requestError": function (rejection) {
                    cfpLoadingBar.complete();
                },
                "responseError": function (rejection) {
                    cfpLoadingBar.complete();
                    return $q.reject(rejection);
                }
            }
        });

        app.factory('MessageBox', function ($rootScope,$timeout,$sce) {
            var MessageBox = {};

            // 参数	                         描述
            // title	            提示框标题	支持自定义html
            // text	                提示内容	支持自定义html
            // icon	                提示类型，有：success（成功），error（错误），warning（警告），input（输入）。	-
            // showCancelButton	    是否显示“取消”按钮。	-
            // animation	        提示框弹出时的动画效果，如slide-from-top（从顶部滑下）等	-
            // html	                是否支持html内容。	-
            // timer	            设置自动关闭提示框时间（毫秒）。	-
            // showConfirmButton	是否显示确定按钮。	-
            // confirmButtonText	定义确定按钮文本内容。	-
            // imageUrl	            定义弹出框中的图片地址。
            MessageBox.showToast=function(content,timeout) {
                if(timeout==undefined){
                    timeout=2500;
                }
                //swal({
                //    title:"",
                //    text: content,
                //    timer: timeout,
                //    button: false
                //});
            };

            MessageBox.showConfirm=function(content,callback) {
                swal({
                    title: content,
                    text: "",
                    icon: "warning",
                    buttons: {
                        cancel: {
                            text: "取消",
                            value: false,
                            visible: true,
                            className: "",
                            closeModal: true,
                        },
                        confirm: {
                            text: "确定",
                            value: true,
                            visible: true,
                            className: "",
                            closeModal: true
                        }
                    }
                    })
                    .then(function (value) {
                        switch (value) {
                            case false:
                                break;
                            case true:
                                callback();
                                break;
                            default:
                        }
                });
            };

            MessageBox.showSuccess=function(content) {
               // swal(content,"","success")
            };

            MessageBox.showInput=function (context,placeholder,callback) {
                swal(context, {
                    // text: "Write something here:",
                    // content: el,el为dom节点
                    content: "input",
                    buttons: {
                        confirm: {
                            text: "确定",
                            value: true,
                            visible: true,
                            className: "",
                            closeModal: true
                        }
                    },
                }).then(function (value) {
                    callback(value)
                })

            };

            return MessageBox;
        });

        return angularAMD.bootstrap(app);
    });


