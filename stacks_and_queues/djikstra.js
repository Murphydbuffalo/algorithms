var operatorStack, operandStack, benchmark, characters,
calculate, num1, num2, operator, value, solve, i, t0, t1;

operatorStack = require('./linked_list');
operandStack = require('./linked_list');
benchmark = require('performance-now');

if(process.argv[2]){
  characters = process.argv[2].split('');
} else {
  characters = ['(', '(', '2', '+', '2', ')', '*', '(', '7', '-', '(', '3', '-', '1', ')', ')', ')'];
}
  
calculate = function(operands, operators){
  num1 = operands.pop().value;
  num2 = operands.pop().value;
  operator = operators.pop().value;
  result = eval(num1 + operator + num2);
  operands.push(result);
  console.log('Result is: ' + result);
  return result;
};

solve = function(input){
  for(i = 0; i < input.length; i++){
    if(!isNaN(input[i])){
      console.log('Adding ' + input[i] + ' to the operand stack');
      operandStack.push(input[i]);
    }
    
    switch(input[i]){
      case '+' || '-' || '*' || '/':
        console.log('Adding ' + input[i] + ' to the operator stack');
        operatorStack.push(input[i]);
        break;

      case ')':
        console.log('Calculating!');
        calculate(operandStack, operatorStack);
        break;
    }
  }
};

t0 = benchmark();
solve(characters);
t1 = benchmark();

console.log('Arithmetic performed using Djikstra\'s algorithm and a linked list implementation of a stack in ' + (t1-t0) + ' milliseconds.');
