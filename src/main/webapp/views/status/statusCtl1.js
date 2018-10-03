
define(['js/app', 'echarts', 'services', 'text!views/status/status_new.html'
    , 'css!views/status/status_new1.css'
], function (app, echarts) {
    app.controller('statusCtl1',
        function ($scope, $location, cfpLoadingBar, $interval, CommSer, $state) {
            $scope.workshop = "全部",
            $scope.selectWsnumber = ""
            $scope.selectWsID = ""
            $scope.selectDeviceNumber = ""
            $scope.devicedata = {};
            $scope.isShowTips = false;
            $scope.tipleft = '0px';
            $scope.tipTop = '0px';
            /*所有的车间设备数据，从后台获取*/
            $scope.treedata = []
            $scope.allData = []
            $scope.warnInfo = []
            $scope.DeviceRunInfo = []
            checkAccess = function (data) {
                if (data.data.Code == -1) {
                    alert(data.data.Message)
                    $state.go('login')
                    return;
                }
            }
            $scope.getDataFromServer= function () {
                CommSer.RequestDataPost("DataService", "GetDataInfo", { "opt": "GetRealTimeData", "token": sessionStorage.getItem("token") }).then(function successCallback(data) {
                    checkAccess(data);
                    $scope.allData = data.data.Data;
                }, function errorCallback(data) {
                })
                CommSer.RequestDataPost("DataService", "GetDataInfo", { "opt": "GetRealTimeWarnInfo", "token": sessionStorage.getItem("token"), "checkDevice": $scope.checkDevice }).then(function successCallback(data) {

                    $scope.warnInfo = data.data.Data;

                }, function errorCallback(data) {
                })
                CommSer.RequestDataPost("DataService", "GetDataInfo", { "opt": "GetDayRunRate", "token": sessionStorage.getItem("token") }).then(function successCallback(data) {
                    $scope.DeviceRunInfo = data.data.Data;

                }, function errorCallback(data) {
                })
            }
            /*一次性获取所有设备实时状态*/

            /*定时从服务器获取数据 */
            var t = $interval(function () {
               // $scope.getDataFromServer();
            },15000)
            $scope.$on('$destroy', function () {
                $interval.cancel(t);
            })
            $scope.$watch('checkDevice', function () {
                $scope.getDataFromServer();
                getTableData();
                if ($scope.statusdata.length > 0) {
                    drawPie();
                }
                

            })
            $scope.$watch('selectstatus', function () {
                getTableData();
            })
            /*设备状态数据汇总，由allData计算*/
            $scope.statusdata = []

            isExist = function (number) {
                for (i = 0; i < $scope.statusdata.length; i++) {
                    if ($scope.statusdata[i].number == number)
                        return i;
                }
                return -1;
            }

            updateStatusData = function (number, name) {
                index = isExist(number);
                if (index == -1)
                    return;
                $scope.statusdata[index].value += 1
            }

            getTableData = function () {
                if ($scope.allData == null || $scope.allData.length == 0)
                    return;
                $scope.statusdata = []
                for (i = 0; i < $scope.listStatus.length ; i++) {
                    if ($scope.listStatus[i].number == '00')
                        continue
                    $scope.statusdata[i - 1] = {}
                    $scope.statusdata[i - 1].name = $scope.listStatus[i].name
                    $scope.statusdata[i - 1].number = $scope.listStatus[i].number
                    $scope.statusdata[i - 1].value = 0
                    $scope.statusdata[i - 1].color='#'+$scope.listStatus[i].FColor
                }

                for (i = 0; i < $scope.statusdata.length; i++) {
                    $scope.statusdata[i].value = 0;
                }
                var index = 0
                alldata = $scope.allData
                sumdevice = 0;

                for (var i = 0; i < alldata.length; i++) {
                    if ($scope.checkWs.indexOf(alldata[i].wsID) > -1) {
                        devicedata = alldata[i].devicedata;
                        for (var j = 0; j < devicedata.length; j++) {
                            if ($scope.checkDevice.indexOf(devicedata[j].deviceID) > -1) {
                                sumdevice += 1
                                updateStatusData(devicedata[j].status, devicedata[j].statusName)
                            }
                        }
                    }
                }
                for (i = 0; i < $scope.statusdata.length; i++) {
                    if (sumdevice != 0) {
                        $scope.statusdata[i].proportion = Math.floor($scope.statusdata[i].value / sumdevice * 1000) / 1000;
                        $scope.statusdata[i].tableName = $scope.statusdata[i].name;
                        $scope.statusdata[i].name += '(' + $scope.statusdata[i].value + ')'
                    }

                }
                console.log($scope.statusdata) 
            }

            $scope.$watch("allData", function () {
                if ($scope.allData && $scope.allData.length > 0) {
                    getTableData();
                    if ($scope.statusdata.length > 0)
                    {
                        drawPie();
                    }
                    
                    console.log($("#left-body-top").height(), $("#left-body").height())
                    $("#left-body-bottom").css("height", (1 - $("#left-body-top").height() / $("#left-body").height()) * 100 + "%")
                    $(".fix-height").css("height", $("#left-body-bottom").height() - 55 + "px")
                    $("#mid-body-content").css("height", $("#mid-body").height() - 55 + 'px');
                    $("#right-body-table").css("height", $("#run-rate").height() - 40 + 'px');
                }


            })
            $scope.showmsg = function (w, i) {

                $scope.selectWsnumber = w
                $scope.selectWsID = w
                $scope.selectDeviceNumber = i
                $scope.isShowTips = true;

                $scope.tipTop = event.clientY + "px";
                $scope.tipleft = event.clientX + 10 + "px";
                var height = 300
                if (event.clientY + height > document.documentElement.clientHeight) {
                    $scope.tipTop = document.documentElement.clientHeight - height + "px";
                    $scope.tipleft = event.clientX + 10 + "px";
                }
            }
            $scope.hidemsg = function () {
                $scope.isShowTips = false;
            }
            drawPie = function () {
               
               
                var i = 0;
              
                var colors = ['#9E9E9E', '#228B22', '#EEC900', '#FF7F50', '#FF0000'];
                var option = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        textStyle: { color: "auto" },
                        selectedMode: false,
                    },
                    series: [
                        {
                            name: '设备状态占比',
                            type: 'pie',
                            radius: ['20%', '50%'],
                            center: ['50%', '50%'],
                            data: $scope.statusdata,
                            labelLine: {
                                normal: {
                                    length: 5
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: function (data) {
                                        return $scope.statusdata[data.dataIndex].color
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 5,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                var echartsPie = echarts.init(document.getElementById('new-pie'));
                echartsPie.setOption(option);
            }
            $scope.$parent.query();
        });
});