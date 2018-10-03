/**
 * Created by Joe on 2018/6/6.
 */
(function () {
var appUrl = "js/lib";
require.config({
    //配置总路径
    baseUrl:'',
    paths : {
        // 其他模块会依赖他
        'text': appUrl + '/requirejs/require.text',
        'ui.route': appUrl + '/angular-plugins/angular-ui-router/angular-ui-router.min',
        'angular' :  appUrl + '/angular',
        'angularAMD' :  appUrl + '/angular-plugins/angularAMD',
        'css' :  appUrl + '/requirejs/css.min',
        'ngload': appUrl + '/angular-plugins/ngload',
        'ui-bootstrap': appUrl + '/angular-plugins/angular-ui-bootstrap/ui-bootstrap-tpls-0.12.1.min',
        "angularloading": appUrl + '/angular-plugins/angular-loading-bar/loading-bar',
        "jquery": appUrl + '/jquery-1.11.1.min',
        "echarts": appUrl + '/echarts.min',
        "ztree": appUrl + '/jquery.ztree.all.min',
        "sweetalert":appUrl+'/sweetalert/sweetalert.min',
        "directives": 'js/Commonjs/directives',
        "services": 'js/Commonjs/services',
        "laydate": appUrl + "/laydate",
        "vintage": appUrl + '/vintage',
        "modernizr":appUrl + '/modernizr'
    },

    shim : {
        // 表明该模块依赖angular
        'angularAMD' : [ 'angular'],
        'angular-route' : [ 'angular'],
        'ui.route':['angular'],
        'ui-bootstrap' : [ 'angular'],
        'angularloading': ['angular'],
        'ztree': ['jquery'],
        'directives': [ 'angular'],
        'services': ['angular'],
    },
    urlArgs : "v=" + new Date().getTime(),
    // 启动程序 js/scripts/app.js
    deps : [ 'js/app' ]
});
})();


