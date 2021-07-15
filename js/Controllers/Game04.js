app.controller('Game04Controller', function ($scope, Services, $timeout) {

    console.log("Game04 started");
    
    var Game04 = this;

    nuevoJuego();
    
    function nuevoJuego() {
        
        $scope.gameStatusPlay();
        
        $scope.objetoAleatorio();
        
        Game04.objeto = $scope.objeto;

        Game04.objetoSilabas = Game04.objeto.silabas.split(",");
        
        Game04.opciones = []; 
        
        for (silaba of Game04.objetoSilabas) {
            Game04.opciones.push(silaba);
        } 
        
        for (i = 0; i < 3; i++){
            
            do {
                Game04.objetoFalso = $scope.objetoAleatorioND(); 
            }
            while (Game04.objetoFalso.id == Game04.objeto.id); 
            
            Game04.objetoFalsoSilabas = Game04.objetoFalso.silabas.split(",");

            for (silaba of Game04.objetoFalsoSilabas) {
                Game04.opciones.push(silaba); 
            }
            
        }

        Services.shuffle(Game04.opciones);
        
        Game04.objetoSilabasResultado = [];
        
        
        Game04.reset = function () {
            
            $scope.gameStatusPlay();
            
            Game04.objetoSilabasResultado = [];
            
            Game04.posicionActual = 0; 
    
            for (i = 0; i < Game04.objetoSilabas.length; i++) {

                Game04.objetoSilabasResultado.push("__ ");
                  
            }
        }
        
        Game04.reset();
        
        Game04.posicionActual = 0; 
        
        Game04.seleccion = function (opcion) {
                        
            Game04.objetoSilabasResultado.splice(Game04.posicionActual, 1, opcion);
            
            Game04.posicionActual++;
            
            if (Game04.objetoSilabas.length == Game04.posicionActual) {
                if (Services.arraysMatch(Game04.objetoSilabas, Game04.objetoSilabasResultado)) {

                    $scope.gameStatusWon();
                    console.log($scope.gameStatus);
                    $timeout( function(){
                        Game04.next();
                    }, 900);
                
                } else {
                    $scope.gameStatusLost();
                    console.log($scope.gameStatus);
                }
            }

        }
        
        Game04.next = function () {
            nuevoJuego();
            $scope.jugar_seleccionados();
        }
        

        
/*
        
        Game04.opciones = Services.shuffle(Game04.opciones);
        
        
        
        //Silaba Averiguar Letras      
        Game04.solucion = Game04.solucion.split("");









        Game04.palabraArray = [];
        Game04.posicion_incognita = 0;
        Game04.incognita = 1;
        Game04.numeroLetra = 0;

        //Por cada Silaba
        for (var i = 0; i < Game04.silabas.length; i++) {
            //Si Silaba = Silaba Elegida
            if (i == Game04.silabaElegidaNumero) {
                //Por cada Letra de la Incognita
                for (var X = 0; X < Game04.solucion.length; X++) {
                    //Si es la primera letra de la incognita
                    if (Game04.incognita == 1) {
                        //Donde empieza la Incognita
                        Game04.posicion_incognita = Game04.numeroLetra;
                    }
                    //Generar Letra para Palabra Array
                    Game04.palabraArray.push("_ ");
                    //+1 NúmeroLetra
                    Game04.numeroLetra++;
                    //+1 Número Incognita
                    Game04.incognita++;
                }
            }
            //Si Silaba != Silaba Elegida
            else {
                //Por cada letra en Silaba
                for (var X = 0; X < Game04.silabas[i].length; X++) {
                    //Generar Letra para Palabra Array
                    Game04.palabraArray.push(Game04.silabas[i].split("")[X].toUpperCase());
                    //+1 NúmeroLetra
                    Game04.numeroLetra++;
                }
            }
        }
    


        
        Game04.silaba = [];


        //No se que hace esto de aca abajo
        console.log(Game04.posicion_incognita);


        

        Game04.cantidadLetras = Game04.solucion.length;

        for (var i = 0; i < Game04.cantidadLetras; i++) {
            Game04.silaba[i] = "_ ";
        }
    }


    //Empezamos de 0
    Game04.currentEntry = 0;



    //Letra al tocar el teclado
    Game04.letra = function (letra) {

        //Posicion Actual a completar la letra
        Game04.posicion_actual = Game04.posicion_incognita + Game04.currentEntry;
        
        //Palabra mostrada -> Cambiar _ por Letras
        Game04.palabraArray.splice(Game04.posicion_actual, 1, letra)



        Game04.silaba.splice(Game04.currentEntry, 1, letra)



 


        Game04.currentEntry = Game04.currentEntry + 1;

        
        var arraysMatch = function (arr1, arr2) {

            // Check if the arrays are the same length
            if (arr1.length !== arr2.length) return false;

            // Check if all items exist and are in the same order
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }

            // Otherwise, return true
            return true;

        };

        
        if (Game04.currentEntry == Game04.solucion.length) {
            if (arraysMatch(Game04.silaba, Game04.solucion)) {
                
                $scope.gameStatus = "won"; 
                $timeout( function(){
                    Game04.next();
                }, 900);
                
            } else {
                
                $scope.gameStatus = "lost"; 
            }

        }
    }

    Game04.reset = function () {
        Game04.currentEntry = 0;
        for (var i = 0; i < Game04.cantidadLetras; i++) {
            Game04.silaba[i] = "_ ";
        }
        $scope.gameStatus = "play"; 

        //Reseteo IncognitaCuenta
        Game04.incognita = 0;
        
        //Por cada letra en Incognita
        for (var X = 0; X < Game04.solucion.length; X++) {
            
            //Letra a modificiar
            Game04.letra_modificar = Game04.posicion_incognita + Game04.incognita; 


            //Generar Letra para Palabra Array
            Game04.palabraArray.splice(Game04.letra_modificar, 1, "_ ")

            //+1 IncognitaCuenta
            Game04.incognita++;
        }

        


    }


    Game04.next = function () {
        Game04.currentEntry = 0;
        
        NuevaCosa();
        for (var i = 0; i < Game04.cantidadLetras; i++) {
            Game04.silaba[i] = "_ ";
        }
        $scope.gameStatus = "play"; 
        $scope.jugar_seleccionados();
    }



      
*/  

    }

});