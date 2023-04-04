const $btn_iniciar = document.getElementById('button');

var numjugador = [];
var numcpu = [];
var numerosacado = [];

function numrand() {
    var num;
    for (var i = 1; i <= 15; i++) {
        num = Math.floor(Math.random() * (1, 91));
        if (!numjugador.includes(num) && num !== 0) {
            pos = i.toString();
            numjugador.push(num);
            document.querySelector('#table-jug div:nth-child(' + pos + ')').innerHTML = num;
            document.querySelector('#table-jug div:nth-child(' + pos + ')').setAttribute('id', num)
        } else {
            i--;
        }

    }
    var num2;
    for (var i = 1; i <= 15; i++) {
        num2 = Math.floor(Math.random() * 91);
        if (!numcpu.includes(num2) && num2 !== 0) {
            numcpu.push(num2);
            pos = i.toString();
            document.querySelector('#Tab-cpu div:nth-child(' + pos + ')').innerHTML = num2;
            document.querySelector('#Tab-cpu div:nth-child(' + pos + ')').setAttribute('id', num2 + "cpu")
        } else {
            i--;
        }
    }
}

var i = 1;
var k = 0;
var numselect;

document.addEventListener('click', e => {
    if (cont1 < 15 && cont2 < 15) {
        if (e.target === $btn_iniciar) {

            for (var l = 1; l <= 92; l++) {
                if (numerosacado.length === 91) {
                    break
                } else {
                    numerorandom()
                }
            }
            numselect = numerosacado[k]
            k++
            document.getElementById('button').innerHTML = numselect;
            pos = i.toString();
            document.querySelector('#Num-fuera div:nth-child(' + pos + ')').innerHTML = numselect;
            coincidencias(numselect)
            i++;
            console.log(numerosacado)
        }
    }
});


var min = 2;
max = 91;

function numerorandom() {
    temp = Math.floor(Math.random() * (min, max));
    for (var k = 1; k <= 92; k++) {
        if (numerosacado.length === 0) {
            numerosacado.push(temp)
            break;
        } else if (!numerosacado.includes(temp) && temp !== 0) {
            numerosacado.push(temp);
            break
        }
    }
}
var cont1 = 0;
var cont2 = 0;

function coincidencias(numselect) {
    var cuadro;
    var cuadro2;


    for (var k = 0; k <= 15; k++) {
        var seleccionado
        seleccionado = numjugador[k]
        if (numselect === numjugador[k]) {
            console.log("coincide" + numselect);
            cuadro = seleccionado.toString();
            document.getElementById(cuadro).style.backgroundColor = '#ec3737ce';
            cont1++;
        }

    }
    for (var j = 0; j <= 15; j++) {
        var seleccionado2;
        seleccionado2 = numcpu[j];
        if (numselect === numcpu[j]) {
            cuadro2 = seleccionado2.toString() + "cpu";
            document.getElementById(cuadro2).style.backgroundColor = '#ec3737ce';
            cont2++;
        }
    }
    if (cont1 === 15) {
        document.getElementById('button').innerHTML = "jugador ha ganado";
    } else if (cont2 === 15) {
        document.getElementById('button').innerHTML = "CPU ha ganado";
    }
}
numrand();
numerorandom();
