define(['js/app', 'echarts', 'text!views/oee/2/2.html'
    , 'css!views/oee/2/2.css'

], function (app, echarts) {
    app.controller("oee2", function ($scope) {
        $scope.selectdate = ""
        xdata = ['正常运行', '空闲', '故障']
        $scope.status = 3
        $scope.showdata = []

        $scope.query = function () {
            startdate = $scope.selectdate.split(' - ')[0]
            enddate = $scope.selectdate.split(' - ')[1]
            CommSer.RequestDataPost("DataService", "GetDataInfo", { "opt": "GetDeviceStatusData", "token": sessionStorage.getItem("token"), "device": $scope.checkDevice, "beginDate": startdate, "endDate": enddate })
        }
        $scope.$watch("selectdate", function () {
            startdate = $scope.selectdate.split(' - ')[0]
            enddate = $scope.selectdate.split(' - ')[1]
            console.log(startdate, enddate)
        })
        $scope.$watch('selectstatus', function () {

            //getBardata();

        })
        drawBar = function (series, xdata, ydata) {
            option = {
                title: {
                    text: "设备历史状态汇总",
                    x: 'center',
                    y: 'top',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 200,
                    y: 30,
                    selectedMode: false,
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: false, readOnly: false },
                        magicType: { show: false, type: ['line', 'bar'] },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: xdata,
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        }

                    }
                ],
                yAxis: [
                    {

                        type: 'value'
                    }
                ],
                series: series

            };
            var echartsBar = echarts.init(document.getElementById('device-distribute-bar'));
            console.log(option)
            echartsBar.setOption(option);
        }

        $scope.maindata = [{
            colname: ['车间', '设备代码', '设备名称', '日期', '状态', '时长'],
            colfiled: ['wsName', 'deviceNumber', 'deviceName', 'date', 'status', 'hours'],
            rowdata: [
            ]
        }]
        $scope.$watch('maindata[0].rowdata', function () {
            console.log($scope.maindata)
            getShowdata();
            getBardata();
        })
        //wsID	wsNumber	wsName	    deviceName	deviceNumber	deviceID	FDay	    FSeconds	FStatusNumber	FStatusName
        //235	002	        机加车间	C620	    111	            1000	    08/01/10	57600	    01	            正常运行
        getShowdata = function () {
            $scope.showdata = []
            $scope.maindata[0].colname = ['车间', '设备代码', '设备名称', '日期']
            var data = $scope.maindata[0].rowdata
            temp = {};
            lastWsID = 0;
            lastDeviceNumber = 0;
            lastDate = 0;
            var HasAdded = false;
            var status = []

            for (var i = 0; i < data.length; i++) {

                if (data[i].wsID != lastWsID || data[i].deviceNumber != lastDeviceNumber || data[i].date != lastDate) {
                    if (temp.wsID != null) {
                        if (!HasAdded) {
                            for (k = 0; k < status.length; k++) {
                                $scope.maindata[0].colname.push(status[k].name + '时长(H)')

                            }
                            HasAdded = true;

                        }
                        temp.status = status
                        $scope.showdata.push(temp)
                        temp = {};
                        status = [];

                    }
                    temp.wsID = data[i].wsID;
                    temp.wsName = data[i].wsName;
                    temp.deviceNumber = data[i].deviceNumber;
                    temp.deviceName = data[i].deviceName;
                    temp.date = data[i].date;
                    temp.FTotal = data[i].FTotal;

                }
                lastWsID = data[i].wsID;
                lastDeviceNumber = data[i].deviceNumber;
                lastDate = data[i].date;
                tempStatus = {}
                tempStatus.name = data[i].status
                tempStatus.value = data[i].hours
                tempStatus.color = '#' + data[i].FColor
                status.push(tempStatus);

            }
            temp.status = status
            $scope.showdata.push(temp)
            console.log($scope.showdata)
        }

        /*解析数据*/
        getBardata2 = function () {
            ydata = []
            xdata = []
            tempX = []
            dateNumber = []

            var data = $scope.maindata[0].rowdata
            for (var i = 0; i < data.length; i++) {
                if (tempX.indexOf(data[i].deviceNumber) == -1) {
                    tempX.push(data[i].deviceNumber)
                    xdata.push(data[i].deviceName)
                }
                if (dateNumber.indexOf(data[i].date) == -1) {
                    dateNumber.push(data[i].date)
                }

            }
            xlength = xdata.length
            dateLength = dateNumber.length;

            dicStatus = {}
            for (i = 0; i < data.length; i++) {

                dicStatus[data[i].date + "-" + data[i].deviceNumber] == null ? dicStatus[data[i].date + "-" + data[i].deviceNumber] = [data[i].hours] : dicStatus[data[i].date + "-" + data[i].deviceNumber].push(data[i].hours)
            }
            console.log(dicStatus)
            series = []
            for (var key in dicStatus) {
                console.log(dicStatus[key])
                temp = {
                    name: key,
                    type: 'bar',
                    data: dicStatus[key],
                    barWidth: 20,
                    //barGap: 25,
                    stack: key.split('-')[0],
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#008B45', '#4169E1', '#EEC900', '#6C7B8B', '#EE4000', '#8B5A00', '#CD950C', '#  ', ];
                                return colorList[params.seriesIndex % 3];
                            },
                            label: { show: true, textStyle: { color: '#E87C25' } }
                        }
                    }
                }
                series.push(temp)
            }



            console.log(series)
            drawBar(series, xdata, ydata);
        }

        getBardata = function () {
            ydata = []
            xdata = []
            dateNumber = []
            tempX = []
            var data = $scope.maindata[0].rowdata
            for (var i = 0; i < data.length; i++) {
                if (tempX.indexOf(data[i].deviceNumber) == -1 && data[i].deviceNumber != '') {
                    tempX.push(data[i].deviceNumber)
                    xdata.push(data[i].deviceName)
                }
            }
            series = []
            xlength = xdata.length
            statusNumber = $scope.showdata[0].status.length;
            barData = []
            series = []
            for (i = 0; i < $scope.showdata.length; i++) {
                if ($scope.showdata[i].FTotal >= 1) {
                    for (j = 0; j < statusNumber; j++) {
                        if (series[j] == null) {
                            series[j] = {}
                            series[j].data = []
                        }
                        series[j].type = 'bar';
                        series[j].barWidth = 30;
                        series[j].name = $scope.showdata[i].status[j].name
                        series[j].data.push($scope.showdata[i].status[j].value == 0 ? '' : $scope.showdata[i].status[j].value)
                        series[j].stack = $scope.showdata[i].deviceName
                        series[j].itemStyle = {
                            normal: {
                                color: function (params) {
                                    var colorList = ['#008B45', '#4169E1', '#EEC900', '#6C7B8B', '#EE4000', '#8B5A00', '#CD950C', '#474747', ];
                                    //console.log(params.seriesIndex)
                                    return $scope.showdata[0].status[params.seriesIndex].color
                                },
                                //label: { show: true, textStyle: { color: '#E87C25' } }
                            }
                        }
                    }

                }
            }
            console.log(series)
            drawBar(series, xdata, ydata);
        }
        getShowdata();
        $scope.$parent.$parent.query();

    })
});