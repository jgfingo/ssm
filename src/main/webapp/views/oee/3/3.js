define(['js/app', 'echarts', 'text!views/oee/3/3.html'
    , 'css!views/oee/3/3.css'

], function (app, echarts) {
    app.controller("oee3", function ($scope) {
        
        $scope.$watch("selectdate", function () {
            startdate = $scope.selectdate.split(' - ')[0]
            enddate = $scope.selectdate.split(' - ')[1]
            console.log(startdate, enddate)
        })
        drawBar = function (xdata, ydata) {
            option = {
                title: {
                    text: '设备报警次数分布',
                    x: 'center',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['次数'],
                    x: 'center',
                    y: 30,
                    selectedMode:false,
                },
                toolbox: {
                    show: false,
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
                series: [
                    {
                        name: '次数',
                        type: 'bar',
                        data: ydata,
                        barWidth: 35,
                        barGap: 25,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: 'black'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                      '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                       '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                       '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return "#FF0000"//colorList[params.dataIndex]
                                }
                            }
                        },
                    }
                ]
            };
            var echartsBar = echarts.init(document.getElementById('device-warn-bar'));
            echartsBar.setOption(option);
        }

        $scope.maindata = [{
            colname: ['车间', '设备代码', '设备名称', '报警原因','报警开始时间', '报警结束时间','时长(分)','是否解决'],
            colfiled: ['FWSName', 'FNumber', 'FName', 'FCause', 'FLogTime', 'FEndTime', 'FSeconds', 'FIsSovled'],
            rowdata: []
        }]
        getBardata = function () {
            xdata = []
            ydata = []
            var count=0
            var data = $scope.maindata[0].rowdata
            for (var i = 0; i < data.length; i++) {
                if(data[i].FTotal==1)
                {
                    xdata.push(data[i].FName.replace('(小计)',''))
                    ydata.push(data[i].FTimes)
                }
            }
            
            console.log(xdata, ydata)
            drawBar( xdata, ydata);
        }
        $scope.$watch('maindata[0].rowdata', function () {
            getBardata();
    })
        $scope.$parent.$parent.query();
       
    })
});