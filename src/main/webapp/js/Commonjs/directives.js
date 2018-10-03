/**
 * Created by Joe on 2018/6/7.
 */
define(['js/app'
        ,'text!js/Commonjs/template/treeView.html'
        ,'text!js/Commonjs/template/treeItem.html'
    ]
    , function (app, treeView, treeItem) {
        app.directive("divSeg", function () {
            return {
                restrict: 'AC',
                link: function (scope, elem, attr) {
                    scope.dragType = 0;
                    scope.ele = null;
                    elem[0].onmousedown = function (event) {
                        scope.ele = elem[0]
                        var range = 10;
                        var eleObj = {}
                        eleObj.e_top = elem[0].offsetTop;
                        eleObj.e_left = elem[0].offsetLeft;
                        eleObj.e_right = elem[0].offsetLeft + elem[0].clientWidth;
                        eleObj.e_bottom = elem[0].offsetTop + elem[0].clientHeight;
                        var x = event.clientX;
                        var y = event.clientY;
                        eleObj.x = x;
                        eleObj.y = y;
                        scope.eleObj = eleObj;
                        if (x >= eleObj.e_left - range && x <= eleObj.e_left + range && y >= eleObj.e_top && y <= eleObj.e_bottom) {
                            scope.dragType = 1
                        }
                        else if (y >= eleObj.e_top - range && y <= eleObj.e_top + range && x >= eleObj.e_left && x <= eleObj.e_right) {
                            scope.dragType = 2
                        }
                        else if (x >= eleObj.e_right - range && x <= eleObj.e_right + range && y >= eleObj.e_top && y <= eleObj.e_bottom) {
                            scope.dragType = 3
                        }
                        else if (y >= eleObj.e_bottom - range && y <= eleObj.e_bottom + range && x >= eleObj.e_left && x <= eleObj.e_right) {
                            scope.dragType = 4
                        }
                    }
                    document.onmouseup = function () {

                        scope.dragType = 0
                        console.log(elem)
                        scope.ele.style.cursor = ""
                    }
                    document.onmousemove = function () {
                        if (scope.dragType > 0) {
                            ele = scope.ele
                            switch (scope.dragType) {
                                case 1:
                                    ele.style.postion = "fixed"
                                    ele.style.cursor = 'col-resize'
                                    ele.style.left = event.clientX + "px";

                                    break;
                                case 2:

                                    ele.style.cursor = 'row-resize'
                                    break;
                                case 3:
                                    ele.style.postion = "fixed"
                                    ele.style.cursor = 'col-resize'
                                    ele.style.width = event.clientX - ele.offsetLeft + "px";

                                    break;
                                case 4:
                                    ele.style.cursor = 'row-resize'
                                    break;

                            }
                        }
                    }

                }

            }
        })
    app.directive('treeView',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/Commonjs/template/treeView.html',
            scope: {
                treeData: '=',
                canChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@'
            },
            controller:['$scope', function($scope){
                $scope.itemExpended = function(item, $event){
                    item.$$isExpend = ! item.$$isExpend;
                    $event.stopPropagation();
                };
                $scope.getItemIcon = function(item){
                    var isLeaf = $scope.isLeaf(item);
                    if(isLeaf){
                        return 'fa fa-leaf';
                    }
                    return item.$$isExpend ? 'fa fa-minus': 'fa fa-plus';
                };
                $scope.isLeaf = function(item){
                    return !item.children || !item.children.length;
                };
                $scope.warpCallback = function(callback, item, $event){
                    ($scope[callback] || angular.noop)({
                        $item:item,
                        $event:$event
                    });
                };
            }]
        };
    }]);
})