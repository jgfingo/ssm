define(['js/app','services',"modernizr", 'text!views/main/main.html'
    , 'css!views/main/css/main.css', 'css!views/main/css/bootstrap.css', 'css!views/main/css/font.css', 'css!views/main/css/style.css', 'css!views/main/css/font-awesome.css'

], function (app,services) {

    app.controller('mainCtl',
        function ($scope, $state, CommSer) {
            $scope.personinfo={
                username:'',
                userpic:''
            }

            $scope.functioninfo=[{
                menuname:'设备监控平台',
                menuid:'1',
                menupic:'views/main/img/timg.jpg',
                sub:[{
                    subname:'状态监控',
                    subid:'1.01',
                    suburl:'main.a'
                },
                    {
                        subname:'设备报警',
                        subid:'1.02',
                        suburl:'main.b'
                    }]
            }]
            
            $scope.go=function (data) {
                console.log(data);
            }

        });
});
