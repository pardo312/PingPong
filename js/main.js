var canvas= document.getElementById("gc");
var ctx = canvas.getContext("2d");
canvas.style.left = "200px";
canvas.style.top = "50px";
canvas.style.position = "absolute";

var pelotaX = 300;
var pelotaY = 100;
var raqueta1Y = 300;
var vy = 2;
var vx = 5;
var enemigoY = 300;
var puntajeEnemigo = 0;
var puntajeJugador = 0;
var pantallaMenu = true;
var pantallaGanadoraPJ = false;
var pantallaGanadoraEnemigo = false;


window.onload = function () {

    var fps = 60
    setInterval(function () {dibujarPelota(); moverPelota();}, 1000 / fps);

    setInterval(moverEnemigo, 1000 / (fps));

    canvas.addEventListener('mousemove', function (evt) {

        var mousePos = calculateMousePos(evt);   
        raqueta1Y = (mousePos.y-50) ;
        
    })

    canvas.addEventListener('mousedown', function (evt) {

        if (pantallaGanadoraPJ || pantallaGanadoraEnemigo || pantallaMenu) {
            pantallaGanadoraPJ = false;
            pantallaGanadoraEnemigo = false;
            pantallaMenu = false;
             pelotaX = 300;
             pelotaY = 100;
            
             y = 2;
             vx = 5;
        }

    })
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
function moverPelota()
{

    pelotaX += vx;
    pelotaY += vy;
    
    //Cuando toca una raqueta
    if ((pelotaX > canvas.width - 40 && pelotaY > enemigoY -10 && pelotaY < enemigoY + 110 && pelotaX < canvas.width -25)) {
        vx = -vx;
        var deltaY = pelotaY - (enemigoY +50);
        vy = deltaY * 0.20;
    }
    else if ((pelotaX < 40 && pelotaY > raqueta1Y - 10 && pelotaX > 10 && pelotaY < raqueta1Y + 110)) {
        vx = -vx;        
        var deltaY = pelotaY - (raqueta1Y+50);     
        vy = deltaY * 0.20;       
    }
    //cuando toca suelo o techo

    if (pelotaY > canvas.height-20 || pelotaY<0 ) {
        vy = -vy ;
        
    }
    //Cuando se va del mapa (reinicia juego)


        // Punto Para enemigo(bola lado izquierdo)
    if (pelotaX < -50 ) {
        pelotaX = 300;
        pelotaY = 100;
        vy = 5;
        vx = -vx;
        if (puntajeEnemigo < 4) {
            puntajeEnemigo++;
            
        }
        else {
            puntajeJugador = 0;
            puntajeEnemigo = 0;
            vy = 0;
            vx = 0;
            pantallaGanadoraEnemigo = true;
        }
    }
         // Punto Para jugador(bola lado derecho)
    else if (pelotaX > canvas.width + 50)
    {
        pelotaX = 300;
        pelotaY = 100;
        vy = 5;
        vx = -vx;
        if (puntajeJugador < 4)
        {
            puntajeJugador++;
        }
        else
        {
      
            puntajeJugador = 0;
            puntajeEnemigo = 0;
            vy = 0;
            vx = 0;
            pantallaGanadoraPJ = true;
            
        }            
    }
}

function moverEnemigo() {
    var centro = enemigoY + (100 / 2);
    if (centro < pelotaY-35) {
        enemigoY += 10;
    }
    else if (centro >= pelotaY+35) {
        enemigoY -= 10;
    }
    


}
function dibujarPelota() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (pantallaMenu) {
        ctx.fillStyle = 'white';
        ctx.font = "100px ComicSans";
        ctx.fillText("PING-PONG", 40, 200);

        ctx.font = "20px ComicSans";
        ctx.fillText("By: Daniel Pardo", 450, 580);

        
        ctx.font = "20px ComicSans";
        ctx.fillText("Dale click para empezar a jugar ", 167, 300);

        ctx.font = "20px ComicSans";
        ctx.fillText("Reglas: El que haga 5 puntos gana :D", 160, 400);
        
        return;
    }

    if (pantallaGanadoraEnemigo) {
        ctx.fillStyle = 'rgb(102, 0, 0)';
        ctx.font = "50px ComicSans";
        ctx.fillText("Perdiste contra la CPU :C", 50, 200);

        ctx.fillStyle = 'white';
        ctx.font = "20px ComicSans";
        ctx.fillText("Dale click para jugar nueva partida", 170, 300);
        return;
    }
    if (pantallaGanadoraPJ) {
        ctx.fillStyle = 'green';
        ctx.font = "50px ComicSans";
        ctx.fillText("GANASTE :D ", 170, 200);

        ctx.fillStyle = 'white';
        ctx.font = "20px ComicSans";
        ctx.fillText("Dale click para jugar nueva partida", 170, 300);
        return;
    }

    

    //Jugador izquierdo
    ctx.fillStyle = 'white';
    ctx.fillRect(10,  raqueta1Y , 15, 100);

    //Jugador derecho
    ctx.fillStyle = 'white';
    ctx.fillRect(575, enemigoY, 15, 100);

    //Malla
    for (i = 0; i < 30; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(290, 20 * i + 5, 5, 10);
    }
    //Pelota
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(pelotaX, pelotaY, 10, 0, 2 * Math.PI,true);
    ctx.fill();

    //Score
    // Mio
    ctx.font = "30px ComicSans";
    ctx.fillText(puntajeJugador, 150, 50);
    // enemigo
    ctx.font = "30px ComicSans";
    ctx.fillText(puntajeEnemigo, 450, 50);
}



    
