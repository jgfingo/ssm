define(['js/app', 'services'
    , 'text!views/erpLogin/erpLogin.html'


], function (app, a, b) {
    app.controller("erpLoginCtl", function ($scope, $state, CommSer) {
        function getParam(name) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var begin = local_url.indexOf(name + "=")+name.length+1;
            var end = local_url.indexOf("&", begin);
            if (end == -1) {
                end = local_url.length;
            }
            return local_url.slice(begin, end );
        }
        submit = function () {

            CommSer.RequestDataPost('Account', 'Login', { 'acctNum': getParam('acctNum'), 'userName': getParam('userName'), 'password': getParam('password') }).success(
                function (responseData) {
                    console.log(responseData)
                    if (responseData.Code == 0 && responseData.Data != null) {
                        sessionStorage.setItem("erpIndex", getParam("erpIndex"));
                        sessionStorage.setItem("token", responseData.Data.token);
                        setRemember();

                    } else if (responseData.Code == 301) {

                    }
                });
        };

        function setRemember() {
            sessionStorage.setItem("userName", getParam('userName'))
            sessionStorage.setItem("actID", getParam('acctID'))
            sessionStorage.setItem("actName", decodeURI(getParam('acctName')))
            $state.go('main')
        }
        submit()
    });
});

