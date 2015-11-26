
angular.module("directores",['ui.router','ui.bootstrap']);

angular.module("directores").config(function($stateProvider, $urlRouterProvider){


    $urlRouterProvider.otherwise("/inicio");

    $stateProvider
        .state("inicio",{
            url:"/inicio",
            templateUrl:"views/inicio.html"
        })
        .state("agregar",{
            url:"/agregar",
            templateUrl:"views/agregarDirector.html"
        })
        .state("consultar",{
            url:"/consultar",
            templateUrl:"views/consultarDirector.html"
        })
        .state("consultar.detalles",{
            url:"/detalle",
            templateUrl:"views/detallesConsulta.html",
            controller: function($scope){
                $scope.directores ="director"
            }
        })

});