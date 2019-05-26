# TsNet
TsNet is a toy neural network implemented in Typescript entirely from scratch.
I built it by following this backpropagation math by [Matt Mazur](https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/) 

Building:
```
tsc --target es6 Example.Ts
```

## MNIST

TsNet achieved 97.6% accuracy a subset of the MNIST database with the following parameters:
- Iterations: 100,000
- Training samples: 8,000
- Test samples: 1,000
- Learning Rate: 0.2
- Network Structure: 784 => {300, 100, 50} => 10

Test on 1000 samples with random weights
- 77-923 (7.7% accuracy)

Train for 100,000 iterations:
- 7943-57 (99.28% accuracy)
- 976-24 (97.6% accuracy)

## Example Usage

```
//This sample demonstrates TsNet learning to compute each bitwise operator

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
