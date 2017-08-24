$(document).ready(function() {
  $(".num").on("click",function (){ calcOperate("num", $(this).text())});
  $("#plus").on("click", function (){ calcOperate("op", "+")});
  $("#minus").on("click", function () { calcOperate("op", "-")});
  $("#times").on("click", function () { calcOperate("op", "*")});
  $("#divide").on("click", function () { calcOperate("op", "/")});
  $("#decimal").on("click", function (){ calcOperate("decimal", ".")});
  $("#equals").on("click", function () { calcOperate("equals")});
  $("#onOff").on("click", function () { calcOperate("onOff")});
  $("#ac").on("click", function () { calcOperate("ac")});
  $("#c").on("click", function () { calcOperate("c")});
});
  
var states = {
    //on
    on: 1,
    //off
    off: 2,
    //first number
    firstArg: 3,
    //first number if "." is used
    firstArgFloat: 4,
    //if an operator key is pressed
    op: 5,
    //if the eqauls key is pressed
    equals: 6,
    //the second number
    secondArg: 7,
    //if the second number starts with a dot
    secondArgDot: 8,
    //if the second number is a float
    secondArgFloat: 9,
    //if the first arg is ==="."
    firstArgDot: 10,
  };
  
  var calcVars = {
    //stores state
    state: states.on,
    //stores operator
    op: "",
    //stores display value
    dispVal: "",
    //stores one number
    num1: "",
    //stores another number
    num2: "",
    //does operations
  };

//updates display
var overflow = false;
function displayText (){
  if(overflow){
    clear();
    overflow = false
  }else if (calcVars.dispVal > 999999999){
    calcVars.dispVal = "overflow"
    overflow = true;
  }else if(calcVars.dispVal.length > 10){
    calcVars.dispVal = "overflow"
     overflow = true;
  } else {
    calcVars.dispVal = String(calcVars.dispVal);
    calcVars.dispVal = calcVars.dispVal.substring(0, 11);
  }
    $("#curText").text(calcVars.dispVal);
};

//clears everything including memory
function allClear () {
  calcVars.op = "";
  calcVars.dispVal = "";
  calcVars.num1 = "";
  calcVars.num2 = "";
};

//clears display
function clear (){
  calcVars.dispVal = "";
};

//changes background color when turned off
function changeBackColorOff(){
  $("body").css("backgroundColor", "black");
};

//changes background color when turned on
function changeBackColorOn (){
  $("body").css("backgroundColor", "white");
};

//each switch case is a state every if condition is depending on which type of button is pressed
function calcOperate (keyPressed, keyValue){
  switch (calcVars.state){
    //off state
    case states.off:
      if (keyPressed === "onOff"){
        changeBackColorOn();
        calcVars.state = states.on;
      }
      break;
      
    //on state  
    case states.on:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "num"){
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.firstArg;
      }
      if(keyPressed === "decimal"){
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.firstArgDot;
      }
      break;
      
    //first argument  
    case states.firstArg:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
      }
      if(keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
      }
      if(keyPressed === "decimal"){
        calcVars.dispVal += keyValue;
        displayText();
        calcVars.state = states.firstArgFloat;
      }
      if(keyPressed === "op"){
        calcVars.num1 = calcVars.dispVal;
        calcVars.op = keyValue;
        clear();
        displayText();
        calcVars.state = states.op
      }
      break;
      
    //if the first argument starts with a decimal  
    case states.firstArgDot:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on;
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
        calcVars.state = states.on;
      }
      if(keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
        calcVars.state = states.firstArgFloat;
      }
      break;
      
      //if the first number has a decimal point
    case states.firstArgFloat:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
        calcVars.state = states.on;
      }
      if (keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
      }
      if (keyPressed === "op"){
        calcVars.op = keyValue;
        calcVars.num1 = calcVars.dispVal;
        clear();
        displayText();
        calcVars.state = states.op;
      }
      break;
      
      //when an operator key is pressed
    case states.op:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "num"){
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.secondArg;
      }
      if(keyPressed === "decimal"){
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.secondArgDot;
      }
      break;
      
      //the second argument
    case states.secondArg:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
      }
      if(keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
      }
      if (keyPressed === "decimal"){
        calcVars.dispVal += keyValue;
        displayText();
        calcVars.state = states.secondArgFloat;
      }
      if (keyPressed === "equals"){
        calcVars.num2 = calcVars.dispVal;
        clear();
        calcVars.dispVal = eval(calcVars.num1 + calcVars.op + calcVars.num2);
        displayText();
        calcVars.state = states.equals;
      }
      if (keyPressed === "op"){
        calcVars.num2 = calcVars.dispVal;
        calcVars.num1 = eval(calcVars.num1 + calcVars.op + calcVars.num2);
        clear();
        calcVars.state = states.op;
      }
      break;
      
      //if the second argument starts with a decimal point
    case states.secondArgDot:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
        calcVars.state = states.op;
      }
      if (keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
        calcVars.state = states.secondArgFloat;
      }
      break;
      
    case states.secondArgFloat:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        clear ();
        displayText();
        calcVars.state = states.op;
      }
      if (keyPressed === "num"){
        calcVars.dispVal += keyValue;
        displayText();
      }
      if (keyPressed === "equals"){
        calcVars.num2 = calcVars.dispVal;
        clear();
        calcVars.dispVal = eval(calcVars.num1 + calcVars.op + calcVars.num2);
        displayText();
        calcVars.state = states.equals;
      }
      if (keyPressed === "op"){
        calcVars.op = keyValue;
        calcVars.num2 = calcVars.dispVal;
        calcVars.num1 = eval(calcVars.num1 + calcVars.op + calcVars.num2);
        clear();
        displayText();
        calcVars.state = states.op;
      }
      break;
      
    //when you are on the equals screen  
    case states.equals:
      if (keyPressed === "onOff"){
        allClear();
        displayText();
        changeBackColorOff();
        calcVars.state = states.off;
      }
      if (keyPressed === "ac"){
        allClear();
        displayText();
        calcVars.state = states.on
      }
      if (keyPressed === "c"){
        allClear ();
        displayText();
        calcVars.state = states.on;
      }
      if (keyPressed === "num"){
        clear();
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.firstArg;
      }
      if (keyPressed === "op"){
        calcVars.op = keyValue;
        calcVars.num1 = calcVars.dispVal;
        clear();
        displayText();
        calcVars.state = states.op;
      }
      if (keyPressed === "decimal"){
        clear();
        calcVars.dispVal = keyValue;
        displayText();
        calcVars.state = states.firstArgDot;
      }
      break;
  }
};