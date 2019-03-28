var Calculadora = {

  // inicializa la calculadora
  init: function(){
    // elementos de la calculadora
    this.teclas  = document.querySelectorAll(".tecla");


    this.assignEventTecla();
  },

  assignEventTecla: function(){

    for(var i = 0; i < this.teclas.length; ++i){
      this.teclas[i].onclick  = this.eventTeclaOnClick;
      //this.teclas[i].onkeydown = this.eventTeclaPequenia;
      //this.teclas[i].onkeyup   = this.eventRestaurarTeclaPequeña;
    }
  },

  eventTeclaOnClick: function(event) {
    var display = document.getElementById('display');

    switch (event.target.id) {
      case "on":
        display.textContent = 0;
        display.ultimoValor = null;
        break;
      case "sign":
        addSign(display);
        break;
      case "dividido":
        colocarOperacion(display, "%");
        break;
      case "por":
        colocarOperacion(display, "*");
        break;
      case "menos":
        colocarOperacion(display, "-");
        break;
      case "punto":
         addPoint(display);
        break;
      case "igual":
        realizaOperacion(display);
        break;
      case "mas":
        colocarOperacion(display, "+");
        break;
      default:
        addNumbers(display, event.target.id);
        break;
    }
    console.log('click', event.target);
  },

  eventTeclaPequenia: function(event){
    event.target.style.width = "18%";
    event.target.style.height = "58px";
    console.log('d', event.target);
  },

  eventRestaurarTeclaPequeña: function(event){
    event.target.style.width = "22%";
    event.target.style.height = "62.91px";
    console.log('f', event.target);
  },

}

// coloca el signo
function addSign(display){
  var curValue = display.textContent*1;
  if(curValue != 0){
      curValue = curValue*-1;
  }
  display.textContent = curValue;
}

// coloca los numeros en la pantalla
function addNumbers(display, number){
  var curValue = display.textContent;
  if(curValue == "0"){
    if(number == "0"){ return }
    curValue = "";
  }
  if(curValue.length < 8){
      curValue += number;
  }number == "0"
  display.textContent = curValue;
}

// coloca los numeros en la pantalla
function addPoint(display){
  var curValue = display.textContent;
  if(curValue.indexOf(".") < 0){
      curValue += ".";
  }
  display.textContent = curValue;
}

// colocar operacion y ultimo valor
function colocarOperacion(display, operacion){
  display.ultimoValor = display.textContent;
  display.operacion   = operacion;
  display.textContent = "";
}

// colocar operacion y ultimo valor
function realizaOperacion(display){
  if(!display.ultimoValor){
    return;
  }

  switch (display.operacion) {
    case "+":
      display.textContent = (display.textContent*1) + (display.ultimoValor*1);
      display.ultimoValor = null;
      break;
    default:
    break;
  }
}

Calculadora.init();
