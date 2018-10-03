/**
 * Created by Joe on 2018/6/6.
 */
define([], function () {
    return {
        defaultRoute: '/login',
        routes: {
            'demo':{
                templateUrl: 'views/demo/demo.html',
                url: '/demo',
                controller:"mainController",
                controllerAs:"demos",
                dependencies: ['views/demo/mainController'],
                allowAnonymous: true
            },
            'erpLogin': {
                templateUrl: 'views/erpLogin/erpLogin.html',
                url: '/erpLogin',
                controller: "erpLoginCtl",
                controllerAs: "erpLoginCtl",
                dependencies: ['views/erpLogin/erpLoginCtl'],
                allowAnonymous: true
            },
            'login': {
                templateUrl: 'views/login/login.html',
                url: '/login',
                controller: "loginCtl",
                controllerAs: "loginCtl",
                dependencies: ['views/login/loginCtl'],
                allowAnonymous: true
            },
            'main': {
                templateUrl: 'views/main/main.html',
                url: '/main',
                controller: "mainCtl",
                controllerAs: "mainCtl",
                dependencies: ['views/main/mainCtl'],
                allowAnonymous: true
            },
            'main.status':
                {
                    templateUrl: 'views/status/status.html',
                    url: '/status',
                    controller: "statusCtl",
                    controllerAs: "statusCtl",
                    dependencies: ['views/status/statusCtl'],
                    allowAnonymous: true
                },
            'main.status1':
               {
                   templateUrl: 'views/status/status_new.html',
                   url: '/status1',
                   controller: "statusCtl1",
                   controllerAs: "statusCtl1",
                   dependencies: ['views/status/statusCtl1'],
                   allowAnonymous: true
               },
            'main.oee':
                {
                    templateUrl: 'views/oee/oee.html',
                    url: '/oee',
                    controller: "oeeCtl",
                    controllerAs: "oeeCtl",
                    dependencies: ['views/oee/oeeCtl'],
                    allowAnonymous: true
                },
            'main.oee.1':
                {
                    templateUrl: 'views/oee/1/1.html',
                    url: '/1',
                    controller: "oee1",
                    controllerAs: "oee1",
                    dependencies: ['views/oee/1/1'],
                    allowAnonymous: true
                },
            'main.oee.2':
                {
                    templateUrl: 'views/oee/2/2.html',
                    url: '/2',
                    controller: "oee2",
                    controllerAs: "oee2",
                    dependencies: ['views/oee/2/2'],
                    allowAnonymous: true
                },
            'main.oee.3':
                {
                    templateUrl: 'views/oee/3/3.html',
                    url: '/3',
                    controller: "oee3",
                    controllerAs: "oee3",
                    dependencies: ['views/oee/3/3'],
                    allowAnonymous: true
                },
             'main.oee.4':
                {
                    templateUrl: 'views/oee/4/4.html',
                    url: '/4',
                    controller: "oee4",
                    controllerAs: "oee4",
                    dependencies: ['views/oee/4/4'],
                    allowAnonymous: true
                }
        }
    };
});