define(['js/app', 'services'
    , 'text!views/login/login.html'
    , 'css!views/login/login.css'

], function (app, a, b) {
    app.controller("loginCtl", function ($scope, $state,CommSer) {

        $scope.dologin=function () {
            $state.go('main')
        }
    });
});

