//Sorry. There will be so much comments here as I'm still learning.

let audio = new Audio("calculator-sound.mp3");
audio.oncanplaythrough = function(){};

const getHistory = () =>{
  //get the text content from id "history-value"
  return document.getElementById("history-value").innerText;
}

const printHistory = (num) => {
  //print the history value
  document.getElementById("history-value").innerText=num;
}

const getOutput = () =>{
  //get the text content from id "history-output"
  return document.getElementById("output-value").innerText;
}

const printOutput = (num) =>{
  //print the output value
  if (num =="-"){
    document.getElementById("output-value").innerText=num;
  }else{
    document.getElementById("output-value").innerText=getFormattedNumber(num);
  }
}

const getFormattedNumber = (num) => {
  if(num==""){
    //if the value is empty, set the value to empty.
    return "";
  }

  let n = Number(num);
  let value = n.toLocaleString("en");
  //convert the number into string and thus, comma separated value.
  return value;
}

const reverseNumberFormat = (num) =>{
  //replace comma with an empty space (, => '')
  return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator");
for(let i = 0;i<operator.length; i++){
  operator[i].addEventListener('click', function(){
    if(this.id=="clear"){
      // if clicked 'C', the numbers on history & output will be cleared
      printHistory("");
      printOutput("");
    }
    else if(this.id =="backspace"){
      //if clicked 'CE'
      let output=reverseNumberFormat(getOutput()).toString();
      if(output){ //if output has a value, the length will be reduced by 1
        output = output.substr(0,output.length-1);
        printOutput(output);
      }
    }
    else {
      let output=getOutput();
      let history=getHistory();
      if(output=="" && history!=""){
        if(isNaN(history[history.length-1])){
          history=history.substr(0, history.length-1);
        }
      }
      if(output !="" || history!=""){ //condition?true:false
        output= output==""?
        output:reverseNumberFormat(output);
        history=history + output;
        if(this.id =="="){
          //evaluate or execute the argument
          let result= eval(history);
            printOutput(result);
            printHistory("");
          }
        else{ //for other operators, added to history & output is set to empty
          history = history + this.id;
          printHistory(history);
          printOutput("");
          if(this.id =="%"){
            let percentage = output;
            printOutput(percentage/100);
          }
        }
      }
    }
  })
}

let number = document.getElementsByClassName("number");
for(let i = 0;i<number.length; i++){
  number[i].addEventListener('click', function(){
  let output = reverseNumberFormat(getOutput());
    if(output!=NaN){ //if output is a number, it will be concatenated to the previous output clicked.
      output=output + this.id;
      printOutput(output);
    }
  })
}
