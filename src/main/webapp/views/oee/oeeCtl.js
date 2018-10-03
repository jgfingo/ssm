define(['js/app', 'echarts', 'text!views/oee/oee.html'
    , 'css!views/oee/oee.css'

], function (app, echarts, b) {
    app.controller('oeeCtl',
        function ($scope,$state, $location, cfpLoadingBar, $timeout) {
            $scope.subIndex = 0;
            
            $scope.subClick = function (i) {
                $scope.subIndex = i - 1;
                $scope.$parent.pageIndex=i;
                $scope.showdata = []
                $state.go("main.oee."+i)
            }
            $scope.subClick(1);
        });
   
});
