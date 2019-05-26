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

<script src="https://gist.github.com/immortaldigital/f91d960782de929c19b8728f018e54e3.js"></script>
