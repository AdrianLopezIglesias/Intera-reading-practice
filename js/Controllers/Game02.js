app.controller('Game2Controller', function ($scope, Services, $timeout) {

    var game2 = this;
    $scope.gameStatusPlay();
    console.log("game2 loaded");


    NuevaCosa();

    function NuevaCosa() {
        $scope.objetoAleatorio();
        
        game2.cosa = $scope.objeto;
         //Foto
        game2.imagen = game2.cosa.foto_carpeta + game2.cosa.foto_nombre;

        //Opciones
        game2.opciones = [];

        //Buscar Opción
        for (var i = 0; i < 5; i++) {
            game2.cosaNueva = $scope.ListaCosas[Math.floor(Math.random() * $scope.ListaCosas.length)];
            if (game2.cosaNueva == game2.cosa) {
                i--;
            } else {
                game2.opciones.push(game2.cosaNueva);
            }
        }

        //Agregar Opción
        game2.opciones.push(game2.cosa);

        //Mezclar Opción
        
        game2.opciones = Services.shuffle(game2.opciones);
    }


    //Letra al tocar el teclado
    game2.seleccion = function (opcion) {
        //Chequear si gano
        if (game2.cosa.objeto == opcion.objeto) {
            $scope.gameStatusWon();
            $timeout(function () {
                game2.next();
            }, 900);
        } else {
            $scope.gameStatusLost();
        }
    }

    game2.reset = function () {
        $scope.gameStatusPlay();
    }


    game2.next = function () {
        NuevaCosa();
        $scope.gameStatusPlay();
        $scope.jugar_seleccionados();
    }


});