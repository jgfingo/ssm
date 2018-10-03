/**
 * Created by Joe on 2018/6/13.
 */
define(["js/app","jquery"],function (app) {
    app.service("CommSer",function ($http) {
        var Re={
            //business:对应业务场景
            //action:对应接口名称
            //param:对应Get参数
            //data:对应formbody
            //window.location.host+
            "RequestDataPost":function (business,action,data) {
                //var host = "172.20.111.46";//测试地址
                var host = "localhost:31732";//测试地址
                var host=window.location.host;//正式环境
                return $http({
                    method: "Post",
                    url: "http://"+host+"/MFGBIApi/api/"+business+"/"+action,
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(data)
                })
            },
            "RequestDataGet":function (business,action,param) {
                //var host = "172.20.111.46";//测试地址
                var host = "localhost:31732";//测试地址
                var host=window.location.host;//正式环境
                return $http({
                    method: "Get",
                    url: "http://" + host + "/MFGBIApi/api/" + business + "/" + action + "?param=" + param,
                    dataType: "json",
                    param:param
                })
            }
        }
        return Re;
    })
})