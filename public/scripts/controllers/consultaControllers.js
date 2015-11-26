

angular.module("directores").controller("consultaCtrl",function($scope,$http) {
    $scope.directores = [];

    //creo propiedades
    $scope._id = null;
    $scope.nombre = "";
    $scope.apellidos = "";
    $scope.edad = "";
    $scope.pelicula = "";
    $scope.sinopsis = "";
    $scope.cargarDirectores = function () {
        $http({
            method: "GET",
            url: "listar"
        }).success(function (data) {
            if (typeof (data) === "object") {
                $scope.directores = data;
            } else {
                alert("Error al recuperar los directores.");
            }
        });
    };

});





