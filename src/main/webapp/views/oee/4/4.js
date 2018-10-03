define(['js/app', 'echarts', 'text!views/oee/4/4.html'
    , 'css!views/oee/4/4.css'

], function (app, echarts) {
    app.controller("oee4", function ($scope) {
        $scope.showdata = []
        $scope.showdata1 = []
        $scope.maxImage = []
        for (i = 0; i < 100; i++)
        {
            $scope.maxImage.push(i);
        }
        $scope.$watch("selectdate", function () {
            startdate = $scope.selectdate.split(' - ')[0]
            enddate = $scope.selectdate.split(' - ')[1]
        })
        var chartIndex = 0;
        getData1 = function () {
            $scope.maxNumber = 0
            $scope.showdata1 = []
            for (var deviceID in $scope.showdata) {
                for (var tagName in $scope.showdata[deviceID]) {
                    $scope.maxNumber+=1
                    temp = $scope.showdata[deviceID][tagName]
                    xdata = [];
                    ydata = [];
                    ymin = [];
                    ymax = [];
                    title = "";
                    for (k = 0; k < temp.length; k++) {
                        title = temp[k].FNumber + "-" + temp[k].FWACollPointName
                        xdata.push(temp[k].FLogTime.replace(' ','\n'));
                        ydata.push(temp[k].AvgValue);
                        ymin.push(temp[k].FSetMinValue);
                        ymax.push(temp[k].FSetMaxValue);
                    }
                    tempData = {}
                    tempData.title = title;
                    tempData.xdata = xdata
                    tempData.ydata = ydata;
                    tempData.ymin = ymin;
                    tempData.ymax = ymax;
                    $scope.showdata1.push(tempData);
                }
            }
            drawBar1();
        }
        
        getData=function(i)
        {
            index=0
            xdata = []
            ydata = []
            ymin = []
            ymax = []
            maxNumber = 0;
            for (var deviceID in $scope.showdata) {
                for (var tagName in $scope.showdata[deviceID]) {
                    maxNumber+=1
                }
            }
            for(var deviceID in $scope.showdata)
            {
                for(var tagName in $scope.showdata[deviceID])
                {
                    
                    if (index == i % maxNumber)
                    {
                        temp = $scope.showdata[deviceID][tagName]
                        
                        for (k = 0; k < temp.length; k++)
                        {
                            title = temp[k].FNumber + "-" + temp[k].FWACollPointName
                            xdata.push(temp[k].FLogTime.slice(3));
                            ydata.push(temp[k].AvgValue);
                            ymin.push(temp[k].FSetMinValue);
                            ymax.push(temp[k].FSetMaxValue);

                        }
                       
                        drawBar(title, xdata, ydata, ymin, ymax,0);
                        return;
                    }
                    index++;
                }
            }
        }
        $scope.$watch("showdata", function () {
            getData1();
            //getData(0)
            
           
        })
        $scope.next = function ()
        {
            chartIndex += 1;
            getData(chartIndex)
        }
        $scope.last = function () {
            chartIndex -= 1;
            getData(chartIndex)
        }
        drawBar1=function(){
            for(i=0;i<$scope.showdata1.length;i++)
            {
                drawBar($scope.showdata1[i].title, $scope.showdata1[i].xdata, $scope.showdata1[i].ydata, $scope.showdata1[i].ymin, $scope.showdata1[i].ymax,i);
            }
        }
        drawBar = function (title, xdata, ydata, ymin, ymax, index) {
            console.log(title, xdata, ydata, ymin, ymax, index)
            option = {
                title: {
                    text: title,
                    x:'center'
                   
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: {
                    show: true,
                    realtime: true,
                    ////orient: 'vertical',   // 'horizontal'
                    ////x: 0,
                    y: 40,
                    ////width: 400,
                    height: 16,
                    backgroundColor: 'rgba(221,160,221,0.5)',
                    dataBackgroundColor: 'rgba(138,43,226,0.5)',
                    fillerColor: 'rgba(38,143,26,0.6)',
                    handleColor: 'rgba(128,43,16,0.8)',
                    ////xAxisIndex:[],
                    ////yAxisIndex:[],
                    start: 5,
                    end: 30
                },
                legend: {
                    show:false,
                    data: ['参数值', '最高安全值', '最低安全值'],
                    x: 'center',
                    y:'20px',
                },
                
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xdata
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '参数值',
                        type: 'line',
                        data: ydata,
                        smooth: 'true',
                        itemStyle:{
                            normal:{
                                color: '#3A5FCD'
                            }
                        },
                        //markPoint: {
                        //    data: [
                        //        { type: 'max', name: '最大值' },
                        //        { type: 'min', name: '最小值' }
                        //    ]
                        //},
                       
                    },
                    {
                        name: '最高安全值',
                        type: 'line',
                        data: ymax,
                        itemStyle: {
                            normal: {
                                color: '#EE5C42'
                            }
                        },
                    },
                    {
                        name: '最低安全值',
                        type: 'line',
                        data: ymin,
                        itemStyle: {
                            normal: {
                                color: '#00C5CD'
                            }
                        },
                    },
                ]
            };
            // var echartsBar = echarts.init(document.getElementById('device-para-chart'));
            var echartsBar = echarts.init(document.getElementsByClassName('device-para-chart')[index]);
            echartsBar.setOption(option);
        }
        $scope.$parent.$parent.query();
    })
});