var LinkedList,
    operatorStack, 
    operandStack,
    benchmark,
    characters,
    calculate,
    num1,
    num2,
    operator,
    result,
    pattern,
    solve,
    i,
    t0,
    t1;

LinkedList = require('./linked_list');
operatorStack = new LinkedList();
operandStack = new LinkedList();
benchmark = require('performance-now');

if(process.argv[2]){
  characters = process.argv[2].split('');
} else {
  characters = ['(', '(', '2', '+', '2', ')', '*', '(', '7', '-', '(', '3', '-', '1', ')', ')', ')'];
}
  
calculate = function(operands, operators){
  'use strict';

  num2 = operands.pop().value;
  num1 = operands.pop().value;
  operator = operators.pop().value;
  
  result = eval(num1 + operator + num2);

  operands.push(result);
  console.log('Result is: ' + result);

  return result;
};

solve = function(input){
  'use strict';

  pattern = new RegExp('^[-*/\+]$');

  for(i = 0; i < input.length; i++){
    if(!isNaN(input[i])){
      console.log('Adding ' + input[i] + ' to the operand stack');
      operandStack.push(input[i]);
    } 
    else if(input[i].match(pattern)){
      console.log('Adding ' + input[i] + ' to the operator stack');
      operatorStack.push(input[i]);
    } 
    else if(input[i] === ')'){
      console.log('Calculating!');
      calculate(operandStack, operatorStack);
    }
  }
};

t0 = benchmark();
solve(characters);
t1 = benchmark();

console.log('Arithmetic performed using Djikstra\'s algorithm and a linked list implementation of a stack in ' + (t1-t0) + ' milliseconds.');
