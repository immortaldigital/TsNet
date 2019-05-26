/*
* Layer.ts
* 2019 Immortal.Digital
* Provides a list of Neurons for Hidden layers
* Output layer just returns its input data[]
*
* fire() takes input[] and returns array[] for each value of Neuron[i].Fire(input[i])
* train() simply calls Neuron[i].Train() for each data/target pair and records the returned backprop values
*/
import { Neuron } from './Neuron.js';
export class Layer {
    get Output() {
        return this.output;
    }
    constructor(size, parentSize) {
        this.neurons = [];
        this.output = [];
        this.parentSize = parentSize;
        for (let i = 0; i < size; i++) {
            this.neurons[i] = new Neuron(parentSize);
        }
    }
    fire(dataSource) {
        if (dataSource.length == this.parentSize) { //ensure the data count is equal to the neuron weight count (same as neuron count  in parent layer)
            for (var i = 0; i < this.neurons.length; i++) { //feed the data source into each neuron and keep track of the outputs
                this.output[i] = this.neurons[i].fire(dataSource);
            }
        }
        else {
            return null;
        }
        return this.output;
    }
    train(target, outputLayer, learningRate) {
        /*	Each neuron must calculate following where i is each neuron and k is each weight neuron[i].weight[k]:
        *	TotalDxNeuronOutput[i]	= total error change Dx with respect to Neuron[i] output
        *	NeuronDxNeuronInput[i]	= Neuron[i] output change Dx with respect to Neuron net input [i]
        *	NeuronInputDxWeight[k]	= Neuron[i] net input change Dx with respect to weight[k]
        *	TotalDxWeight[i][k]		= total error change partial derivative with respect to neuron[i].weight[k]
        *	TotalDxWeight[i][k]		= TotalDxNeuron[i] * TotalDxNeuronOutput[i] * NeuronInputDxWeight[i, k]
        */
        var backPropogationDxNeuron = [];
        var backPropogationDxWeight; //no need to initialise array since this will only be a reference
        if (target.length != this.neurons.length) {
            throw ("Layer  target array wrong size (should be " + this.neurons.length + ")");
        }
        for (var i = 0; i < this.neurons.length; i++) {
            backPropogationDxWeight = this.neurons[i].train(target[i], outputLayer, learningRate);
            for (var k = 0; k < backPropogationDxWeight.length; k++) {
                if (backPropogationDxNeuron[k] == null) {
                    backPropogationDxNeuron[k] = backPropogationDxWeight[k];
                }
                else {
                    backPropogationDxNeuron[k] += backPropogationDxWeight[k];
                }
            }
        }
        return backPropogationDxNeuron; //return the values to pass onto the next layer
    }
}
//input layer literally just returns the input haha
export class InputLayer {
    get Output() {
        return this.output;
    }
    constructor(size) {
        this.output = [];
    }
    //literally just return the dataSource lul
    fire(dataSource) {
        for (var i = 0; i < dataSource.length; i++) {
            this.output[i] = dataSource[i];
        }
        return this.output;
    }
    train(fake, outputLayer, learningRate) { } //stub, cant train the leader as you would expected
}
