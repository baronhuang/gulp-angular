/**
 * Created by Administrator on 2015/2/23.
 */

(function(){
    'use strict';
    angular
        .module('mosign', [
        'ngRoute'
        ])

        /*将数据转化成json格式*/
        .config(function ($httpProvider) {
            $httpProvider.defaults.transformRequest = function (data) {
                if (data === undefined) {
                    return data;
                }
                return $.param(data);
            }
        })

        /*路由配置*/
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'view/home.html'
                })
                .when('/list', {
                    templateUrl: 'view/list.html',
                    controller: 'listCtrl'
                })
                .when('/detail', {
                    redirectTo:'/list'
                })
                .when('/detail/:id', {
                    templateUrl: 'view/detail.html',
                    controller: 'detailCtrl'
                })
                .when('/edit', {
                    templateUrl: 'view/edit.html',
                    controller: 'editCtrl'
                })
                .when('/edit/:id', {
                    templateUrl: 'view/edit.html',
                    controller: 'editCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })

        /*加载其他资源前，自动执行，可以在这里声明一些rootScope的全局变量*/
        .run(['$rootScope', '$location', 'mosignHttp', '$http', function ($rootScope, $location, mosignHttp, $http) {
            console.log('angular程序已经加载完成');
            /*格式化post请求的参数*/
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $rootScope.curLocation = $location.path().split('/')[1];
        }]);
})();

