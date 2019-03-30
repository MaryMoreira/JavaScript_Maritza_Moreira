var Calculadora = {

  // inicializa la calculadora
  init: function(){
    // elementos de la calculadora
    this.teclas  = document.querySelectorAll(".tecla");
    this.calculadoraFondo = document.getElementById("calculadoraFondo");
    this.calculadoraFondo.style.background = "rgb(153,153,153)";

    this.assignEventTecla();
  },

  assignEventTecla: function(){

    for(var i = 0; i < this.teclas.length; ++i){
      this.teclas[i].onclick     = this.eventTeclaOnClick;
      this.teclas[i].onmousedown = this.eventTeclaPequenia;
      this.teclas[i].onmouseup   = this.eventRestaurarTeclaPequenia;
    }
  },
  // funcion que atieende al evento onclick de las teclas
  eventTeclaOnClick: function(event) {
    var display = document.getElementById('display');
    var valorPantalla = display.textContent;

    switch (event.target.id) {
      case "on":
        valorPantalla = limpiar(display);
        break;
      case "sign":
        valorPantalla = colocarSigno(display);
        break;
      case "punto":
        valorPantalla = colocarPunto(display);
        break;
      case "igual":
        valorPantalla = realizaOperacion(display);
        break;
      case "dividido":
        valorPantalla = colocarOperacion(display, "%");
        break;
      case "por":
        valorPantalla = colocarOperacion(display, "*");
        break;
      case "menos":
        valorPantalla = colocarOperacion(display, "-");
        break;
      case "mas":
        valorPantalla = colocarOperacion(display, "+");
        break;
      case "raiz":
        valorPantalla = "";
        break;
      default:
        valorPantalla = colocarNumero(display, event.target.id);
        break;
    }
    // coloca en la pantalla el valor actual
    display.textContent = valorPantalla;
  },

  // evento que realiza la tecla pequena cuando se presiona
  eventTeclaPequenia: function(event){
    var width, height;
    switch (event.target.id) {
      case "on":
      case "sign":
      case "raiz":
      case "dividido":
      case "por":
      case "menos":
      case "7":
      case "8":
      case "9":
      case "4":
      case "5":
      case "6":
      width  = "21.5%";
      height = "62px";
        break;

      case "mas":
      width  = "88%";
      height = "98%";
        break;

      case "punto":
      case "igual":
      case "1":
      case "2":
      case "3":
      width  = "28%";
      height = "62px";
        break;
    }

    event.target.style.width = width;
    event.target.style.height = height;
  },

  eventRestaurarTeclaPequenia: function(event){
    event.target.style = {};
  },

}

// limpiar
function limpiar(){
    display.ultimoNumero  = null;
    display.primerNumero  = null;
    display.operacion     = null;
    display.hizoOperacion = false;
    return 0;
}

// coloca el signo
function colocarSigno(display){
  var valor = display.textContent*1;
  if(display.hizoOperacion) {
    limpiar();
  }
  if(valor != 0){
    valor = valor*-1;
  }
  return valor;
}

// coloca los numeros en la pantalla
function colocarNumero(display, numero){
  var valor = display.textContent;
  // si realizo operacion coloca el cero mas el numero ingresado
  if(display.hizoOperacion){
    limpiar();
    valor = "0";
  }
  if(valor == "0"){
    if(numero == "0"){ return }
    valor = "";
  }
  if(valor.length < 8){
      valor += numero;
  }
  return valor;
}

// coloca los numeros en la pantalla
function colocarPunto(display){
  var valor = display.textContent;
  if(display.hizoOperacion) return limpiar();
  if(valor.indexOf(".") < 0){
      valor += ".";
  }
  return valor;
}

// colocar operacion y ultimo valor
function colocarOperacion(display, operacion){
  if(display.operacion && !display.hizoOperacion){ // si ya tiene definida operacion solo caia la operacion
    display.operacion     = operacion;
  }else{
    display.primerNumero  = display.textContent;
    display.operacion     = operacion;
    display.hizoOperacion = false;
  }
  return "";
}

// colocar operacion y ultimo valor
function realizaOperacion(display){
  var resultado;

  if(!display.primerNumero || display.textContent == ""){
    return display.textContent;
  }

  var primerNumero      = (display.primerNumero*1);
  var segundoNumero     = display.hizoOperacion ? display.ultimoNumero*1 : (display.textContent*1);
  display.ultimoNumero  = display.hizoOperacion ? display.ultimoNumero : display.textContent;
  display.hizoOperacion = true;

  switch (display.operacion) {
    case "+":
      resultado = garantizaMaximoCaracteres(primerNumero + segundoNumero);
      break;
    case "-":
      resultado = garantizaMaximoCaracteres(primerNumero - segundoNumero);
      break;
    case "*":
      resultado = garantizaMaximoCaracteres(primerNumero * segundoNumero);
      break;
    case "%":
      if(segundoNumero == 0) {
         limpiar();
         display.hizoOperacion = true;
         return "ERROR";
      }
      resultado = garantizaMaximoCaracteres(primerNumero / segundoNumero);
      break;
  }

  display.primerNumero = resultado;
  resultado = resultado + "";
  // el resultado debe ser menor que ocho caracteres
  if(resultado.length > 8){
      limpiar();
      display.hizoOperacion = true;
      return "INFINITY";
  }
  return resultado;
}

// garantiza el maximo de caracteres truncando los decimales
function garantizaMaximoCaracteres(numero){
  var str = numero + "";
  if(str.length > 8){
      var enteros   = parseInt(numero);
      var lenEntero = (enteros + "").length;
      if(lenEntero <= 8){
        return toFixed(numero, 8 - (lenEntero+1));
      }
  }
  return numero;
}

function toFixed(num, fixed) {
    fixed = fixed || 0;
    fixed = Math.pow(10, fixed);
    return Math.floor(num * fixed) / fixed;
}

Calculadora.init();
