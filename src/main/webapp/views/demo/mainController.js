/**
 * Created by Joe on 2018/6/6.
 */
define([ 'js/app'
    , 'text!views/demo/tpl.html'
    , 'css!views/demo/tpl.css'
    ,'directives'
    ,'services'
], function(app,a,b) {
    app.controller('mainController',
        function($scope, $location,cfpLoadingBar,$timeout,MessageBox,CommSer) {
            $scope.name="主页面"
            //cfpLoadingBar.start();
            // $timeout(function () {
            //     cfpLoadingBar.complete();
            // },1000)
            // MessageBox.showInput("gggg","xxxx",function () {
            //     alert("gxg");
            // });
            // CommSer.RequestDataPost("Account","Login",{userName:"administrator",password:"",acctNum:"15",deviceType:"0"}).success(function (repon) {
            //     console.log(repon);
            // })
            CommSer.RequestDataPost("Account","Login",{"userName": "administrator","password":"" ,"acctNum": "143_143","deviceType": "0"}).success(function () {

            })
            // CommSer.ggg("Account","Login",{"userName": "administrator","password":"" ,"acctNum": "15","deviceType": "0"})
            $scope.demo={tree:[
                {
                    "id":"1",
                    "pid":"0",
                    "name":"家用电器",
                    "children":[
                        {
                            "id":"4",
                            "pid":"1",
                            "name":"大家电"
                        }
                    ]
                },
                {
                    "id":"2",
                    "pid":"0",
                    "name":"家用电器2",
                    "children":[
                        {
                            "id":"5",
                            "pid":"1",
                            "name":"大家电2"
                        }
                    ]
                }
            ]
            ,itemClicked:function (item) {
                    console.log(item)
                }
                ,itemCheckedChanged:function (item) {
                    console.log(item)
                }
            };
            console.log($scope.demo.tree);
        });
});