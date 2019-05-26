/*
* TsNet.ts
* 2019 Immortal.Digital
* Provides a list of Layers and links them together
* Fire() takes an input data[] array, feeds it into the InputLayer, takes the output and feeds that into the next layer etc. Returns output of last layer
* Train() Feeds data[] and target[] into LAST layer, takes the returned Back Propogation values and feeds them into the last-1 layer etc until first layer
* 	All updated weights will be stored in the synapses and used next time Fire() is called. While training, only existing weight values are used
*/
import {Layer, InputLayer, ILayer} from './Layer.js';

export class TsNet {
	public layer: ILayer[];
	private lastLayer: number; //value of the final layer. set to layer.length - 1, just more readable this way
	private output: number[];
	private outputError: number[] = [];
	private totalError: number = 0.0;

	get Output() {
		return this.output;
	}

	constructor (...layerSize: number[]) {
		this.layer = [];
		this.outputError = [];
		this.totalError = 0.0;

		if(layerSize.length < 2) {
			throw "Error: Network requires at least 2 layers each with > 0 neurons";
		}

		if(layerSize[0]==0) {
			throw "Error: Input layer must have > 0 neurons";
		}

		//Create input layer with the correct number of neurons
		this.layer[0] = new InputLayer(layerSize[0]);

		//Create all hidden + output layer(s)
		for (var i = 1; i < layerSize.length; i++) {
			if(layerSize[i]==0) {
				throw "Error: Layer " + i + " must have > 0 neurons";
			}
			this.layer[i] = new Layer(layerSize[i], layerSize[i - 1]); //layer size, parent layer size (which will be the weight count for each neuron)
		}

		this.lastLayer = layerSize.length - 1;
	}

	fire(data: number[]): number[] {
		this.output  = data; //reference to data source

		for (var i = 0; i < this.layer.length; i++) {
			this.output = this.layer[i].fire(this.output); //reference to output of each layer
		}

		this.output = [...this.output]; //clone output layer.output into a new array and keep that

		return this.output;
	}

	train(data: number[], target: number[], learningRate: number): number {
		this.fire(data); //first calculate the neuron output values

		let actual = this.layer[this.lastLayer].Output; //reference to the OutputLayer output
		this.totalError = 0.0;
		
		if(target.length != this.layer[this.lastLayer].Output.length) {
			throw ("Target array wrong size (should be " + this.layer[this.lastLayer].Output.length + ")");
		}

		for (var i = 0; i < this.layer[this.lastLayer].Output.length; i++) {
			this.outputError[i] = Math.pow(target[i] - actual[i], 2) * 0.5; //Error function is half of square(target - actual) for each neuron
			this.totalError += this.outputError[i]; //sum total error while we're here
		}

		target = this.layer[this.lastLayer].train(target, true, learningRate);

		for (var i = this.lastLayer - 1; i > 0; i--) { //loop backwards through layers
			target = this.layer[i].train(target, false, learningRate); //layer.train() returns the back propogation values to feed into each hidden layer
		}

		//totalError can be used to exit the training loop early if it's doing well enough (<0.01 is a good error level)
		return this.totalError;
	}
}