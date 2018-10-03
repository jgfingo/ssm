/**
 * 加载资源
 * Created by Joe on 2018/6/6.
 */
define([], function() {
    return function(dependencies) {
        var definition = {
            resolver: ['$q', '$rootScope', function($q, $rootScope) {
                var defered = $q.defer();
                require(dependencies, function() {
                    $rootScope.$apply(function() {
                        defered.resolve();
                    });
                });
                return defered.promise;
            }]
        };
        return definition;
    }
});