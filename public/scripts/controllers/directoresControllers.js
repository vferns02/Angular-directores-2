
angular.module("directores").controller("directoresCtrl",function($scope,$http){
    $scope.directores=[];

    //creo propiedades para guardar los datos
   $scope._id=null;
   $scope.nombre="";
   $scope.apellidos="";
   $scope.edad="";
   $scope.pelicula="";
   $scope.sinopsis="";
    $scope.cargarDirectores = function(){
        $http({
            method:"GET",
            url:"/listar"
        }).success(function(data){
            if(typeof (data) === "object"){
                $scope.directores=data;
            }else{
                alert("Error al recuperar los directores.");
            }
        });
    };

    $scope.guardarDirector = function() {
        $http({
            method: 'POST',
            url: '/guardar',
            params: {
                nombre: $scope.nombre,
                apellidos: $scope.apellidos,
                edad: $scope.edad,
                pelicula: $scope.pelicula,
                sinopsis: $scope.sinopsis,
                _id: $scope._id
            }
        })
            .success(function (data) {
                if(typeof (data)==='object'){
                    $scope.cargarDirectores()
                }else{
                    alert("Error al cargar el 1Director");
                }
            })
            .error(function(){
                alert("error al cargar el direcoor");
            });
    };
    $scope.detallesDirector= function(indice) {
        $http({
            method: 'GET',
            url: '/recuperar',
            params: {
                _id: indice

            }

        }).
            success(function(data) {
                if(typeof(data)=== 'object'){
                    $scope._id = data._id;
                    $scope.pelicula = data.pelicula;
                    $scope.sinopsis = data.sinopsis;
                } else{
                    alert('Error al recuperar el 1director.');
                }
            }).
            error(function() {
                alert('Error al  recuperar el Director.');
            });
    };
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

});






