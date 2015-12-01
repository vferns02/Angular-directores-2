//Directiva que representa cada directiva en una coleccion de directores
angular.module("directores").directive("elementoFormulario", function (){
    return {
        //Con restric indicamos si usar la directiva como elemento(E) o como atributo(A)
        restrict: "AE",

        //Con template / templateUrl establecemos la vista de la directiva
        templateUrl:"views/elementoFormulario.html",

        //Con scope establecemos la interfaz de comunicacion
        scope:{
            formulario: "=",//Con = establecemos enlace bidireccional.
            onformularioClick: "&" // Con & establecemos notificacion desde la directiva hacia el scope padre.
        },
        //En el link establecemos la logica de la directiva y manipulamos el DOm en caso de necesitarlo
        link: function($scope, $http){




            $scope.eliminarDirector = function(indice) {
                $http({
                    method: 'POST',
                    url: '/eliminar',
                    params: {
                        _id: indice
                    }
                }).
                    success(function(data) {
                        if(data === 'OK'){
                            $scope.limpiarDatos();
                            $scope.cargarDirectores();
                        }else{
                            alert('Error al intentar eliminar el 1director.');
                        }
                    }).
                    error(function() {
                        alert('Error al intentar eliminar el 2director.');
                    });


            };
            $scope.limpiarDatos = function() {
                $scope._id = null;
                $scope.nombre = "";
                $scope.apellidos = "";
                $scope.edad = "";
                $scope.pelicula = "";
                $scope.sinopsis="";

            };
            $scope.mostrar = false;
            $scope.toggle = function() {
                $scope.mostrar = !$scope.mostrar;
            };

        }
    };
});