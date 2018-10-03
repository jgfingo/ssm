<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>数据云平台</title>
    <!-- 加载通用样式 -->

    <link rel="stylesheet" href="js/lib/angular-plugins/angular-loading-bar/loading-bar.min.css">
    <link rel="stylesheet" href="Comon/css/bootstrap.css">
    <link rel="stylesheet" href="Comon/css/font-awesome.min.css">
    <link rel="stylesheet" href="Comon/css/globalcss.css">
</head>
<body>
<div ui-view></div>
<!-- 使用require加载js -->
<script src="js/lib/requirejs/require.js"></script>
<script src="js/common.js"></script>
</body>
</html>