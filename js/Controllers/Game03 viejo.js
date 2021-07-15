app.controller('Game3Controller', function ($scope, Services, $timeout) {

    var game3 = this;

    console.log("loading game3");
	game3.abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


    if ($scope.replayStatus != 1) {
        
        $scope.gameStatusPlay();
        console.log($scope.replayStatus);
        NuevaCosa();
        console.log("getting new stuff");
    }
    
    function NuevaCosa() {
        //Seleccion
        $scope.objetoAleatorio();
        
        game3.cosa = $scope.objeto;
        
        

        //Foto
        game3.imagen = game3.cosa.foto_carpeta + game3.cosa.foto_nombre;

        //Lista Letras
        game3.cosaArray = game3.cosa.objeto.split("");

        //Lista Silabas
        game3.silabas = game3.cosa.silabas.split(",");

        game3.silabas_final = "";

 
 
        //Silaba Averiguar Número
        game3.silabaElegidaNumero = Math.floor(Math.random() * game3.silabas.length);

        //Silaba Averiguar
        game3.solucion = game3.silabas[game3.silabaElegidaNumero];
        //Normalize .normalize('NFD').replace(/[\u0300-\u036f]/g, ""
        game3.solucion_final = game3.solucion;
        //Lista Opciones
        game3.opciones = []; 

        game3.opciones.push(game3.solucion)

        //Otras opciones
        for (i = 0; i < 4; i++){
            game3.silabas_incorrectas = $scope.ListaCosas[Math.floor(Math.random() * $scope.ListaCosas.length)].silabas.split(",");
            game3.nueva_opcion = game3.silabas_incorrectas[Math.floor(Math.random() * game3.silabas_incorrectas.length)];
            if (game3.nueva_opcion == game3.solucion) {
                i--
            } else {

            game3.opciones.push(game3.nueva_opcion)
            }
        }
       
   


        

        
        game3.opciones = Services.shuffle(game3.opciones);

        
        
        
        //Silaba Averiguar Letras      
        game3.solucion = game3.solucion.split("");









        game3.palabraArray = [];
        game3.posicion_incognita = 0;
        game3.incognita = 1;
        game3.numeroLetra = 0;

        //Por cada Silaba
        for (var i = 0; i < game3.silabas.length; i++) {
            //Si Silaba = Silaba Elegida
            if (i == game3.silabaElegidaNumero) {
                //Por cada Letra de la Incognita
                for (var X = 0; X < game3.solucion.length; X++) {
                    //Si es la primera letra de la incognita
                    if (game3.incognita == 1) {
                        //Donde empieza la Incognita
                        game3.posicion_incognita = game3.numeroLetra;
                    }
                    //Generar Letra para Palabra Array
                    game3.palabraArray.push("_ ");
                    //+1 NúmeroLetra
                    game3.numeroLetra++;
                    //+1 Número Incognita
                    game3.incognita++;
                }
            }
            //Si Silaba != Silaba Elegida
            else {
                //Por cada letra en Silaba
                for (var X = 0; X < game3.silabas[i].length; X++) {
                    //Generar Letra para Palabra Array
                    game3.palabraArray.push(game3.silabas[i].split("")[X]);
                    //+1 NúmeroLetra
                    game3.numeroLetra++;
                }
            }
        }
    


        
        game3.silaba = [];




        

        game3.cantidadLetras = game3.solucion.length;

        for (var i = 0; i < game3.cantidadLetras; i++) {
            game3.silaba[i] = "_ ";
        }
    }


    //Empezamos de 0
    game3.currentEntry = 0;



    //Letra al tocar el teclado
    game3.letra = function (letra) {

        //Posicion Actual a completar la letra
        game3.posicion_actual = game3.posicion_incognita + game3.currentEntry;
        
        //Palabra mostrada -> Cambiar _ por Letras
        game3.palabraArray.splice(game3.posicion_actual, 1, letra)



        game3.silaba.splice(game3.currentEntry, 1, letra)



 


        game3.currentEntry = game3.currentEntry + 1;

        
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

        
        if (game3.currentEntry == game3.solucion.length) {
            if (arraysMatch(game3.silaba, game3.solucion)) {
                
                $scope.gameStatusWon();
                $timeout( function(){
                    game3.next();
                }, 900);
                
            } else {
                
                $scope.gameStatusLost();
            }

        }
    }

    game3.reset = function () {
        game3.currentEntry = 0;
        for (var i = 0; i < game3.cantidadLetras; i++) {
            game3.silaba[i] = "_ ";
        }
        $scope.gameStatusPlay();

        //Reseteo IncognitaCuenta
        game3.incognita = 0;
        
        //Por cada letra en Incognita
        for (var X = 0; X < game3.solucion.length; X++) {
            
            //Letra a modificiar
            game3.letra_modificar = game3.posicion_incognita + game3.incognita; 


            //Generar Letra para Palabra Array
            game3.palabraArray.splice(game3.letra_modificar, 1, "_ ")

            //+1 IncognitaCuenta
            game3.incognita++;
        }

        


    }


    game3.next = function () {
        game3.currentEntry = 0;
        
        NuevaCosa();
        for (var i = 0; i < game3.cantidadLetras; i++) {
            game3.silaba[i] = "_ ";
        }
        $scope.gameStatusPlay();
        $scope.jugar_seleccionados();
    }

    game3.seleccion = function (opcion) {

        //
        if (game3.solucion_final == opcion) {
            $scope.gameStatusWon();
            
            $timeout( function(){
                game3.next();
            }, 900);
            
        } else {

            $scope.gameStatusLost();
        }

        

    }


});