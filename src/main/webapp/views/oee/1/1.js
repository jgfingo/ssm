define(['js/app', 'echarts','services', 'text!views/oee/1/1.html'
    , 'css!views/oee/1/1.css'

], function (app, echarts) {
    app.controller("oee1", function ($scope,CommSer) {
        $scope.showtype = 1
        $scope.showdata=[]
        drawBar = function (devicename, colhead, xdata, ydata) {
            console.log(colhead,xdata)
            option = {
                title: {
                    text:colhead.name,
                    x:'center',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {

                    data: [colhead.name],
                    x: 'center right',
                    selectedMode: false,
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: { show: true },
                        dataView: { show: false, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
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
                        name: colhead.name,
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
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                    ];
                                    return "#4169E1"//colorList[params.dataIndex]
                                }
                            }
                        },
                    }
                ]
            };
            var echartsBar = echarts.init(document.getElementById('device-oee-bar'));
            echartsBar.setOption(option);
        }
        drawGauge = function (name,value,id) {
            option = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: { show: false },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'gauge',
                        splitNumber: 10,       // 分割段数，默认为5
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                                width: 5
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            splitNumber: 10,   // 每份split细分多少段
                            length: 8,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            show: true,        // 默认显示，属性show控制显示与否
                            length: 16,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, '-120%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        detail: {
                            formatter: '{value}%',
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                color: 'auto',
                                fontSize:20,
                                fontWeight: 'bolder'
                            }
                        },
                        data: [{ value: value, name: name }]
                    }
                ]
            };

            var echartsBar = echarts.init(document.getElementById(id));
            echartsBar.setOption(option);
        }
        
        $scope.colheadData = [
             
            { name: '车间', filedname: 'FWSName', canBeChoose: 0 },
            { name: '设备代码', filedname: 'FDeviceNumber', canBeChoose: 0 },
            { name: '设备名称', filedname: 'FDeviceName', canBeChoose: 0 },
            { name: '日期', filedname: 'FDate', canBeChoose: 0 },
            { name: '负荷时间(H)', filedname: 'FLoadTime', canBeChoose: 1 },
            { name: '开动时间(H)', filedname: 'FWorkTime', canBeChoose: 1 },
            { name: '时间稼动率', filedname: 'FTimeActivation', canBeChoose: 1 },
            { name: '实际产量', filedname: 'FQty', canBeChoose: 1 },
            { name: '理论节拍(S)', filedname: 'FBeat', canBeChoose: 1 },
            { name: '性能稼动率', filedname: 'FPerformanceActivation', canBeChoose: 1 },
            { name: '合格数量', filedname: 'FPassQty', canBeChoose: 1 },
            { name: '良品率', filedname: 'FPassRate', canBeChoose: 1 },
            { name: 'OEE', filedname: 'FOee', canBeChoose: 1 },
           
        ]
        $scope.selectHeadName = $scope.colheadData[$scope.colheadData.length-1];
        $scope.alldata = []
        beginDraw = function () {
            if ($scope.showdata.length > 1) {
                $scope.showtype = 1
                getBardata();
            }
            if ($scope.showdata.length == 1) {
                $scope.showtype = 0
                getGaugedata();
            }
        }
        $scope.$parent.$parent.query();
        $scope.selecteCol = function (col) {
            if (col.canBeChoose) {
                $scope.selectHeadName = col
                beginDraw()
            }
        }
        $scope.$watch("alldata", function () {
            if ($scope.alldata.length > 0) {
                $scope.showdata = []
                for (var i = 0 ; i < $scope.alldata.length; i++) {
                    if ($scope.alldata[i].FTotal >= 1) {
                        $scope.showdata.push($scope.alldata[i])
                    }
                }
                console.log($scope.showdata)
                beginDraw()
            }
            
        })
        getBardata = function () {
            xdata = []
            ydata = []
            var data = $scope.showdata
            for (var i = 0; i < data.length; i++)
            {
                xdata.push(data[i].FDeviceName.replace('(小计)', ''))
                ydata.push(data[i][$scope.selectHeadName.filedname])
            }
            drawBar(null, $scope.selectHeadName, xdata, ydata);
        }
        getGaugedata=function()
        {
         
            var data = $scope.showdata[0]
           
            drawGauge("OEE", Math.floor(data.FOee*100), 'device-oee-gauge-oee')
            drawGauge("时间稼动率", Math.floor(data.FTimeActivation*100), 'device-oee-gauge-time')
            drawGauge("性能稼动率", Math.floor(data.FPerformanceActivation*100), 'device-oee-gauge-performance')
            drawGauge("良品率", Math.floor(data.FPassRate*100), 'device-oee-gauge-quality')
        }
        getDataFromServer = function () {
            $scope.$parent.$parent.query();
        }
        $scope.$watch("checkDevice",function(){
            getDataFromServer();
        })
        
    })
});