//se toma y se crea el area de dobujo en canva
//---------------------------------------------------------------------------------------
var dibujo = document.getElementById("areaDibujo");
var puntero = dibujo.getContext("2d");

puntero.fillStyle = "white";
puntero.fillRect(0, 0, 600, 450);

function crearBase(x, y, l, a) {
    puntero.fillStyle = "#0A3871";
    puntero.fillRect(x, y, l, a);
}

function circulo(x, y, r) {
    puntero.strokeStyle = "#0A3871";
    puntero.lineWidth = 3;
    puntero.beginPath();
    puntero.arc(x, y, r, 0, 2 * Math.PI);
    puntero.stroke();
}

function linea(x, y, x2, y2) {
    puntero.lineWidth = 3;
    puntero.strokeStyle = "#0A3871";
    puntero.beginPath();
    puntero.moveTo(x, y);
    puntero.lineTo(x2, y2);
    puntero.stroke();
}
//--------------------------------------------------------------------------------------


//eventos para los botones
//--------------------------------------------------------------------------------------
const $btninicio = document.querySelector('.inic'),
    $juego = document.querySelector('.juego'),
    $botonesIni = document.querySelector('.botonesIni'),
    $logo = document.querySelector('.logo'),
    $btnadd = document.querySelector('.agg'),
    $addWord = document.getElementById('addWord'),
    $btnguardar = document.getElementById('guarPal'),
    $btncancelPal = document.getElementById('cancelPal');

//--------------------------------------------------------------------------------------
document.addEventListener('click', e => {
    if (e.target === $btninicio) { //al presionar el boton de iniciar juego se ocultara la pantalla de inicio y y se mostrara el juego
        $juego.classList.toggle('active');
        $botonesIni.classList.toggle('active');

    } else if (e.target === $logo) { // al presionar el logo se ocultara dejara de mostrar el juego para mostrar la pantalla inicial
        $juego.classList.remove('active');
        $botonesIni.classList.remove('active');
    } else if (e.target === $btnadd) {
        $addWord.setAttribute('id', 'active'); //al presionar el boton de agregar pantalla se ocultara la pantalla principal para agregar nueva palabra
        $botonesIni.classList.toggle('active');
    } else if (e.target === $btncancelPal) {
        $addWord.setAttribute('id', 'addWord');
        $botonesIni.classList.remove('active');

    }
});
//-------------------------------------------------------------------------------------



//funcion a ejecutar en caso que el usuario deseé agregar una palabra al juegp
function agregarPal() {
    var palabraTomada = document.getElementById("AggInput").value;
    if (palabraTomada) {
        if (palabraTomada.length > 8) {
            Swal.fire({
                title: 'Error',
                text: 'por favor ingrese una palabra con un máximo de 8 letras ',
                icon: 'error',
                confirmbuttontext: 'cool'
            });
        }
        if (palabraTomada.length < 4) {
            Swal.fire({
                title: 'Error',
                text: 'por favor ingrese una palabra con un minimo de 4 letras ',
                icon: 'error',
                confirmbuttontext: 'cool'
            });
        } else {
            NewWord.push(palabraTomada);
            document.addEventListener('click', s => {
                if (s.target == $btnguardar) {
                    $addWord.setAttribute('id', 'addWord');
                    $juego.classList.toggle('active');
                }
            })
            iniciar();
        }
    } else if (!palabraTomada) {
        Swal.fire({
            title: 'Error',
            text: 'por favor ingrese una palabra',
            icon: 'error',
            confirmbuttontext: 'cool'
        });
    }
}
//-------------------------------------------------------------------------------------

var letrasError = [];
var letra2;
var aciertos = 0;
var cancel = false;
var letrapresionada;
var intentos = 9;
var error = 1;
//escaner para las teclas presionadas 


function teclado() {
    document.addEventListener('keydown', evt => {

        //Permite el uso de las teclas de Home, End y las flechas de navegacion
        if (evt.key == 'Backspace' ||
            evt.key.includes('Arrow') ||
            evt.key == 'End' ||
            evt.key == 'Home') return;

        //Si la tecla no es una letra, termina el evento
        if (!/^[a-zA-Z]$/.test(evt.key)) {
            evt.preventDefault();
            return;
        }
        letrapresionada = evt.key;
        if (letrascorrecta.length < cantidad) {
            ver();
        }
        if (letrascorrecta.length == cantidad) {
            evt.preventDefault();
        }
    });
}


var letrascorrecta = [];

//cada vez que se presione una tecla se recorrera la palabra seleccidada para comprobar coincidencias


function ver() {
    var Boolean = false;
    var inten = document.getElementById('inten');
    inten.innerHTML = intentos;
    if (cancel != true) {

        for (numero = 0; numero < cantidad; numero++) {
            letra = selec.charAt(numero);
            var clase = numero.toString();
            if (letrapresionada == letra) {

                var pos = document.getElementById(clase);
                pos.innerHTML = letra;
                Boolean = true;
                if (!letrasError.includes(letrapresionada)) {
                    aciertos++;
                    letrascorrecta.push(letra);
                }
                if (cantidad === aciertos) {
                    cancel == true;
                }
            } else if (letrapresionada !== letra) {
                letra2 = letrapresionada;
            }
        }
        if (letrapresionada != null) {
            if (letrasError.includes(letra2)) {
                Boolean = true;
            } else {
                letrasError.push(letra2);
            }
            if (Boolean === false) {
                document.getElementById("audio").play();
                if (error == 1) {

                    crearBase(90, 450, 3, -400)
                    var err = document.getElementById('a');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 2) {

                    crearBase(90, 50, 430, 3);
                    err = document.getElementById('b');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 3) {
                    crearBase(305, 50, 3, 100);
                    err = document.getElementById('c');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 4) {
                    circulo(306, 188, 40);
                    err = document.getElementById('d');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 5) {
                    crearBase(305, 228, 3, 140);
                    err = document.getElementById('e');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 6) {
                    linea(306, 261, 356, 330);
                    err = document.getElementById('f');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 7) {
                    linea(306, 261, 254, 330);
                    err = document.getElementById('g');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 8) {
                    linea(306, 368, 356, 438);
                    err = document.getElementById('h');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;
                } else if (error == 9) {
                    linea(306, 368, 254, 438);
                    err = document.getElementById('i');
                    err = err.innerHTML = letrasError.includes(letrapresionada) ? letrapresionada : "";
                    puntero.font = "30pt arial";
                    puntero.fillStyle = "red";
                    puntero.fillText("!Has perdido :(", 100, 100);
                    cancel = true;
                    error++;
                    intentos--;
                    inten.innerHTML = intentos;

                }
            }
        }
        if (cantidad == letrascorrecta.length) {
            puntero.font = "30pt arial";
            puntero.fillStyle = "green";
            puntero.fillText("!Has Ganado!", 100, 100);
            cancel = true;
            return;
        }
    }
}





//variables globales para la funcion iniciar 
var palabras = ["laptop", "celular", "cuaderno", "estufa", "cereal", "telefono"];
var NewWord = [];
var selec;
var cantidad;
var letra;
var cantNueva;
var selecNueva;

function iniciar() {

    if (NewWord.length === 1) { //en caso que el usuario agregue una palabra se escogera la palabra ingresada
        selec = NewWord[Math.floor(Math.random() * NewWord.length)];
        cantidad = selec.length;
    } else { // si no hay palabra ingresada por el usuario se usaran las palabras ya asignadas en el programa
        selec = palabras[Math.floor(Math.random() * palabras.length)];
        cantidad = selec.length; //se pasa la cantidad de letras de la palabra a la variable cantidad 
    }
    for (var numero = 0; numero < cantidad; numero++) { //for pendiente de utilizar 
        // DibLetra(x + 25, letra)

    }
    agregarEsp(); // se llamara la funcion para agregar los espacios total de las letras de la palabra seleccionada
    document.getElementById("AggInput").value = ""; //en caso que el usuario haya ingresado la palabra se limpiara el input al momento de iniciar el juego
    teclado();
    ver();

}

//funcion para agregar los espacios necesarios para la palabra

function agregarEsp() {
    var columnas = cantidad;

    for (var i = 0; i < 1; i++) { //se utiliza una etiqueta table de HTML para generar los espacios necesarios
        var filaActual = document.getElementById("areaLetras").insertRow(i);
        filaActual.setAttribute("id", "col"); //se inserta unicamente una fila 
        for (var j = 0; j < columnas; j++) { // se insertaran las filas que se indiquen al momento de seleccionar la palabra
            var celda = filaActual.insertCell(j);
            celda.setAttribute('id', j); //se inserta un id a cada columna para identificar en que posicion ira la letra
        }
    }
}

//se recargara la pagina siempre que se ahaga click en el logo
const refresh = document.getElementById("recargar");
refresh.addEventListener('click', _ => {
    location.reload();
    document.getElementById("AggInput").value = "";
});

const refresh2 = document.getElementById("nuevoJue");
refresh2.addEventListener('click', _ => {

    var columnas = cantidad;
    //se inserta unicamente una fila  
    for (var l = 0; l < 2; l++) {
        id = l.toString();
        var posi = document.getElementById(id);
        document.getElementById('col').remove();
    }
    aciertos = 0;
    intentos = 9;
    error = 1;
    puntero.fillStyle = "white";
    puntero.fillRect(0, 0, 600, 450);
    letra = null;
    letrapresionada = null;

    document.getElementById('a').innerHTML = "";
    document.getElementById('b').innerHTML = "";
    document.getElementById('c').innerHTML = "";
    document.getElementById('d').innerHTML = "";
    document.getElementById('e').innerHTML = "";
    document.getElementById('f').innerHTML = "";
    document.getElementById('g').innerHTML = "";
    document.getElementById('h').innerHTML = "";
    document.getElementById('i').innerHTML = "";
    letrasError = [];
    cancel = false
    iniciar();
});

const rend = document.getElementById('rend');
rend.addEventListener('click', _ => {
    crearBase(90, 450, 3, -400);
    crearBase(90, 50, 430, 3);
    crearBase(305, 50, 3, 100);
    circulo(306, 188, 40);
    crearBase(305, 228, 3, 140);
    linea(306, 261, 356, 330);
    linea(306, 261, 254, 330);
    linea(306, 368, 356, 438);
    linea(306, 368, 254, 438);
    puntero.font = "30pt arial";
    puntero.fillStyle = "red";
    puntero.fillText("!Has perdido :(", 100, 100);
    cancel = true;

})


// sse crea la base del dibujo automaticamente
crearBase(70, 450, 450, 3);



//214+35