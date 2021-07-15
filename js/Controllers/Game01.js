app.controller('Game1Controller', function ($scope, $http, $window, $rootScope, $timeout) {

var game1 = this;

$scope.gameStatusPlay();

game1.abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];




NuevaCosa();

function NuevaCosa() {
$scope.objetoAleatorio();

game1.cosa = $scope.objeto;

game1.imagen = game1.cosa.foto_carpeta + game1.cosa.foto_nombre;

game1.cosaArray = game1.cosa.objeto.split("");

game1.silabas = game1.cosa.silabas.split(",");

game1.silabas_final = "";



//Silaba -> Averiguar Número
game1.silabaElegidaNumero = Math.floor(Math.random() * game1.silabas.length);

//Silaba -> Averiguar Silaba
game1.solucion = game1.silabas[game1.silabaElegidaNumero].normalize('NFD').replace(/[\u0300-\u036f]/g, "");

//Silaba -> Averiguar Letras      
game1.solucion = game1.solucion.split("");


//Definir variables 
game1.palabraArray = [];
game1.posicion_incognita = 0;
game1.incognita = 1;
game1.numeroLetra = 0;



//Por cada Silaba
for (var i = 0; i < game1.silabas.length; i++) {
//Si Silaba = Silaba Elegida
if (i == game1.silabaElegidaNumero) {
//Por cada Letra de la Incognita
for (var X = 0; X < game1.solucion.length; X++) {
//Si es la primera letra de la incognita
if (game1.incognita == 1) {
//Donde empieza la Incognita
game1.posicion_incognita = game1.numeroLetra;
}
//Generar Letra para Palabra Array
game1.palabraArray.push("_ ");
//+1 NúmeroLetra
game1.numeroLetra++;
//+1 Número Incognita
game1.incognita++;
}
}
//Si Silaba != Silaba Elegida
else {
//Por cada letra en Silaba
for (var X = 0; X < game1.silabas[i].length; X++) {
//Generar Letra para Palabra Array
game1.palabraArray.push(game1.silabas[i].split("")[X]);
//+1 NúmeroLetra
game1.numeroLetra++;
}
}
}




game1.silaba = [];


//No se que hace esto de aca abajo
console.log(game1.posicion_incognita);




game1.cantidadLetras = game1.solucion.length;

for (var i = 0; i < game1.cantidadLetras; i++) {
game1.silaba[i] = "_ ";
}
}


//Empezamos de 0
game1.currentEntry = 0;




//Letra al tocar el teclado
game1.letra = function (letra) {

//Posicion Actual a completar la letra
game1.posicion_actual = game1.posicion_incognita + game1.currentEntry;

//Palabra mostrada -> Cambiar _ por Letras
game1.palabraArray.splice(game1.posicion_actual, 1, letra)



game1.silaba.splice(game1.currentEntry, 1, letra)






game1.currentEntry = game1.currentEntry + 1;


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


if (game1.currentEntry == game1.solucion.length) {
if (arraysMatch(game1.silaba, game1.solucion)) {
$scope.gameStatusWon(); 
$timeout( game1.next, 900 )
} else {
$scope.gameStatusLost();
}

}
}

game1.reset = function () {
game1.currentEntry = 0;
for (var i = 0; i < game1.cantidadLetras; i++) {
game1.silaba[i] = "_ ";
}
$scope.gameStatusPlay();

//Reseteo IncognitaCuenta
game1.incognita = 0;

//Por cada letra en Incognita
for (var X = 0; X < game1.solucion.length; X++) {

//Letra a modificiar
game1.letra_modificar = game1.posicion_incognita + game1.incognita; 


//Generar Letra para Palabra Array
game1.palabraArray.splice(game1.letra_modificar, 1, "_ ")

//+1 IncognitaCuenta
game1.incognita++;
}




}

game1.reset = function() {
    game1.currentEntry = 0;
    for (var i = 0; i < game1.cantidadLetras; i++) {
        game1.silaba[i] = "_ ";
    }
}

game1.next = function () {
game1.reset();
$scope.gameStatusPlay();
$scope.jugar_seleccionados();
}


});