//Directiva que representa cada directiva en una coleccion de directores
angular.module("directores").directive("elementoBarra", function (){
    return {
        //Con restric indicamos si usar la directiva como elemento(E) o como atributo(A)
        restrict: "AE",

        //Con template / templateUrl establecemos la vista de la directiva
        templateUrl:"views/elementoBarra.html",

        //Con scope establecemos la interfaz de comunicacion
        scope:{
            barra: "=" //Con = establecemos enlace bidireccional.





        }
    };
});