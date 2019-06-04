# TsNet
TsNet is a toy neural network implemented in Typescript entirely from scratch.
I built it by following this backpropagation math by [Matt Mazur](https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/) 

Building:
```
tsc --target es6 Example.Ts
```

## MNIST

TsNet achieved 96.6% accuracy on the MNIST dataset with the following parameters:
- Iterations: 1,000,000 (~16 epochs)
- Learning Rate: 0.1
- Network Structure: 784 => {300, 100, 50} => 10

Test beforehand (random weights)
- 1141-8859 (11.4% accuracy)

Train for 1,000,000 iterations:
- 60,000 Training set: 59537-463 (99.2% accuracy)
- 10,000 Test set: 9658-342 (96.6% accuracy)

## Example Usage

```
//TsNet learning to compute bitwise operators

import {TsNet} from './TsNet.js';

var data: number[][] = [];
var target: number[][] = [];
data[0] = [0, 0]; //each possible 2-digit binary combination
data[1] = [0, 1];
data[2] = [1, 0];
data[3] = [1, 1];
target[0] = [0, 0, 0]; //data0 XORed = 0, AND = 0, OR = 0
target[1] = [1, 0, 1]; //data1 XORed = 1, AND = 0, OR = 1
target[2] = [1, 0, 1]; //data2 XORed = 1, AND = 0, OR = 1
target[3] = [0, 1, 1]; //data3 XORed = 0, AND = 1, OR = 1

var neuralNet = new TsNet(2, 20, 12, 3);

for (var k = 0; k < 10000; k++) {
  neuralNet.train(data[k%4], target[k%4], 0.15); //train on the k MOD 4th example (in practice train on random examples)
}
```
