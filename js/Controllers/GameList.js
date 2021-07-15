app.controller('GameListController', function ($scope, $timeout, $http) {


//1. Inicialización de variables
var gameList = this;
gameList.list = $scope.ListaJuegos;
gameList.view = 'gameList';
gameList.foto = 'img/fondo-welcome.jpg'

//2. Búsqueda de datos en DB 
//2.a. GameList
gameList.list = $scope.ListaJuegos;
gameList.filteredList = gameList.list;

//2.b. Cosas
$scope.cosas = [];
$http.get('js/json/cosas.json').then(function(response) {
    $scope.cosas = response.data;
    $scope.ListaCosas = response.data;
    $scope.objetoAleatorio();
 });

$scope.objeto = ""; 
$scope.imagen = "";
$scope.gameStatus = ""; 

//2.c. Función -> Objeto Aleatorio
$scope.objetoAleatorio = function () {
objetoIndiceAleatorio = Math.floor(Math.random() * $scope.ListaCosas.length);
$scope.objeto = $scope.ListaCosas[objetoIndiceAleatorio]; 
$scope.imagen = $scope.objeto.foto_carpeta + $scope.objeto.foto_nombre;
}
//2.d. Función -> Otro Objeto Aleatorio
$scope.objetoAleatorioND = function () {
return $scope.ListaCosas[Math.floor(Math.random() * $scope.ListaCosas.length)]; 
}

$scope.gameStatusWon = function () {
$scope.gameStatus = "won";
$timeout( gameList.fade, 700);
}

$scope.gameStatusLost = function () {
$scope.gameStatus = "lost";
}     

gameList.fade = function() {
$scope.juegoBox = {"opacity": 0, "transition": "0.2s"};
};
gameList.show = function() {
$scope.juegoBox = {"opacity": 1, "transition": "0.5s"};
};

gameList.play = function() {
    $scope.gameStatus = "play";
}

$scope.gameStatusPlay = function () {
gameList.play();
gameList.show();

}


//3. Home - Aplicación de filtros
//3.a. Variables
gameList.filterDificultyValue = 'todas';
gameList.filterStatusValue = 'todos';
gameList.filterAreaValue = 'todos';

//      Funcion Filtros
gameList.filterList = function () {

if (gameList.filterDificultyValue == 'todas' && gameList.filterStatusValue == 'todos') {
gameList.filteredList = gameList.list;

} else if (gameList.filterDificultyValue == 'todas' && gameList.filterStatusValue != 'todos') {
gameList.filteredList = gameList.list.filter(function (el) {
return el.descripcion == gameList.filterStatusValue;
});
} else if (gameList.filterDificultyValue != 'todas' && gameList.filterStatusValue == 'todos') {
gameList.filteredList = gameList.list.filter(function (el) {
return el.dificultad == gameList.filterDificultyValue;
});
} else {
gameList.filteredList = gameList.list.filter(function (el) {
return el.dificultad == gameList.filterDificultyValue;
});


gameList.filteredList = gameList.filteredList.filter(function (el) {
return el.descripcion == gameList.filterStatusValue;
});
}


}










/*

Seleccionar juegos

            */

gameList.chosenGames = [];

gameList.selectGames = function (id) {       
$scope.gameStatus = "play"; 

gameList.chosenOption = gameList.list.filter(function (el) {
return el.id == id;
})[0];

function checkOption(option) {
return option.id == gameList.chosenOption.id;
}

function containsObject(obj, list) {
var i;
for (i = 0; i < list.length; i++) {
if (list[i].id == obj.id) {
return true;
}
}
return false;
}

//Armar lista chosenGames
if (containsObject(gameList.chosenOption, gameList.chosenGames)) {
$("#checkbox" + gameList.chosenOption.id).prop('checked', false);
gameList.chosenGames.splice(gameList.chosenGames.indexOf(gameList.chosenOption), 1); 
console.log(gameList.chosenGames);
} else {
$("#checkbox" + gameList.chosenOption.id).prop('checked', true);
gameList.chosenGames.push(gameList.chosenOption);
console.log(gameList.chosenGames);
}
gameList.checkButton();
}


gameList.checkButton = function (id) {
if ( gameList.chosenGames.length == 0 ) {
document.getElementById("jugar_seleccionados").innerHTML = "Seleccione uno o más juegos";
$("#jugar_seleccionados").addClass("disabled")

} else {
document.getElementById("jugar_seleccionados").innerHTML = "Jugar juegos seleccionados";
$("#jugar_seleccionados").removeClass("disabled")
}
}



gameList.goToList = function () {

gameList.view = 'gameList';
gameList.chosenGames = [];
}



//Juegos seleccionados
$scope.jugar_seleccionados = function () {
gameList.gameToPlay = gameList.chosenGames[Math.floor(Math.random() * gameList.chosenGames.length)];

gameList.view = 'gameLevels';


}





});


