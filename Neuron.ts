/*
* Neuron.ts
* 2019 Immortal.Digital
* Provides a list of Synapses + bias
* fire() takes the sum X of all supplied input[i] values multiplied by all Synapse[i] values and returns sigmoid(X) 
* train() calculates the derivative of each weight[i] with respect to the ideal output and updates the weight value
* train() has 2 modes, output layer and hidden layer:
*     Output mode accepts raw target output value, calculates Dx with respect to current node only and returns the sum of WeightDxOutput
*     Hidden mode accepts derived output value, calculates Dx with respect to all output nodes and returns the sum of WeightDxOutput
*/
import {Synapse} from './Synapse.js';

export class Neuron {
    public weight: Synapse[];
    public bias: Synapse;
    private output: number; //the single output value of this neuron
    private input: number[]; //reference to the input data[] (which should be Layer[i-1].Output[])

    //derivaties explained below in train()
    private totalErrorDxNeuronOutput: number;
	private neuronDxNeuronInput: number;
	private neuronInputDxWeight: number[];
	private totalErrorDxWeight: number[];
	private backPropogationDxWeight: number[];

    get Output() {
    	return this.output;
    }

    constructor(size: number) {
        //initialise all arrays and variables
    	this.weight = [];

    	this.totalErrorDxNeuronOutput = 0.0;
    	this.neuronDxNeuronInput = 0.0;
    	this.neuronInputDxWeight = [];
    	this.totalErrorDxWeight = [];

    	this.backPropogationDxWeight = []

    	//initialise synapses
        for(let i = 0; i<size; i++) {
        	this.weight[i] = new Synapse();
        }

        this.bias = new Synapse();
    }

    public fire(data: number[]): number {
    	this.output = 0.0;
    	this.input = data; //reference to previous Layer[i-1].Output[]

        //output is Sigmoid((input[i] * weight[i]).Sum + bias)
    	if(this.input.length == this.weight.length) {
    		for (var i = 0; i < this.input.length; i++) {
    			this.output += (this.input[i] * this.weight[i].WUpdate); //use WUpdate which means it will use the updated value
    		}

    		this.output += (this.bias.W * 1.0);
    	}

    	this.output = Neuron.sigmoid(this.output); //all hidden layer + output layer have sigmoid function. Input layer doesnt use neurons

    	return this.output;
    }

    public train(target: number, outputLayer: boolean, learningRate: number): number[] {
       /* Calculate following for this neuron where k is each weight attached to this neuron:
		*	totalErrorDxNeuronOutput	= total error change Dx with respect to Neuron[this] output
		*	neuronDxNeuronInput			= Neuron[this] output change Dx with respect to Neuron[this] net input 
		*	neuronInputDxWeight[k]		= Neuron[this] net input change Dx with respect to weight[k]
		*	totalErrorDxWeight[k]		= total error change partial derivative with respect to neuron.weight[k]
		*
		* Equations:
		*	totalErrorDxNeuronOutput:	TotalError = (0.5 * (target - actual) ^ 2) =>>= (Dx = -(target - actual))
		*	neuronDxNeuronInput:		NeuronOutput = Sigmoid(NeuronInput) =>>= SigmoidDx(NeuronInput)
		*	neuronInputDxWeight[k]:		NeuronInput[o] = PrevOut[o] * Weight[k] =>>= PrevOut[l] where o is neuron o attached to weight [k]
		*	totalErrorDxWeight[k]:		totalErrorDxNeuronOutput * neuronDxNeuronInput * neuronInputDxWeight[k]
	   */

		if(outputLayer) {
			this.totalErrorDxNeuronOutput = -(target - this.output);
		} else {
			this.totalErrorDxNeuronOutput = target; //the partial derivative is pre-calculated for hidden layers
		}

		this.neuronDxNeuronInput = Neuron.sigmoidDx(this.output);

		for (var k = 0; k < this.input.length; k++) {
			this.neuronInputDxWeight[k] = this.input[k];
			this.totalErrorDxWeight[k] = this.totalErrorDxNeuronOutput * this.neuronDxNeuronInput * this.neuronInputDxWeight[k];

			//.W is old weight, .W will only be updated to WUpdate when TsNet.Fire() is called. Continue to access the old weight while training the network
			this.weight[k].WUpdate = (this.weight[k].W - (this.totalErrorDxWeight[k] * learningRate));

            //back propogate the value totalErrorDxNeuronOutput[o] where o is the neuron attached to weight[k]
			this.backPropogationDxWeight[k] = (this.totalErrorDxNeuronOutput * this.neuronDxNeuronInput * this.weight[k].W);
		}

		return this.backPropogationDxWeight; //backwards error propogation values with respect to weights
    }

    public static sigmoid(x: number): number {
		return 1.0 / (1.0 + Math.exp(-x)); //exp(x) = e^x
	}
	public static sigmoidDx(x: number): number {
		return x * (1 - x); //derivative of sigmoid
	}
}