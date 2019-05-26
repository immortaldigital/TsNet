# TsNet
TsNet is a toy neural network implemented in Typescript entirely from scratch.
I built it by following this Backpropogation wolkthrough: https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

Building:
tsc --target es6 Example.Ts


It achieved 97.6% accuracy a subset of the MNIST database with the following parameters:
Iterations: 100,000
Training samples: 8,000
Testing samples: 1,000
Learning Rate: 0.2
Network Structure: 784 => {300, 100, 50} => 10

Before training, test on 1000 samples
77-923 (7.7% accuracy)

After training, test on 8000 trained samples and 1000 test samples
7943-57 (99.28% accuracy)
976-24 (97.6% accuracy)
