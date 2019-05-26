import {TsNet} from './TsNet.js';

//Useful lil methods for printing to the web page as you would the console. It makes a horrible mess of the HTML but it's fine for testing purposes
class Misc {
	public static Print(t: string) {
		var ele = document.createElement("HTMLParagraphElement");
		ele.id = "delet";
		document.body.appendChild(ele);
		ele.innerText = t + "\n";
	}
	public static Clear() {
		do {
			var ele = <HTMLParagraphElement>document.getElementById("delet");
			if(ele != null) {
				document.body.removeChild(ele);
			}
		} while( ele != null);
	}
}


//Create some interface options
let trainButton = <HTMLButtonElement>document.createElement('button');
let iterationCount = <HTMLInputElement>document.createElement('input');
trainButton.innerText = "Train N Iterations";
iterationCount.style.width = "5em";
document.body.appendChild(iterationCount);
document.body.appendChild(trainButton);
iterationCount.focus();
Misc.Print("");

//declare our training data variablesW
let data: number[][] = [];
let target: number[][] = [];
let error: number[] = [];


//set parameters
let trainIterations = 10000; //I find 10,000 iterations provides good results for this dataset
let learningRate = 0.1; //learningRate should be low (0.02 to 0.5 good, 0.2 common)
let exampleCount = 4;


data[0] = [0, 0]; //each possible 2-digit binary combination
data[1] = [0, 1];
data[2] = [1, 0];
data[3] = [1, 1];
target[0] = [0, 0, 0]; //data0 XORed = 0, AND = 0, OR = 0
target[1] = [1, 0, 1]; //data1 XORed = 1, AND = 0, OR = 1
target[2] = [1, 0, 1]; //data2 XORed = 1, AND = 0, OR = 1
target[3] = [0, 1, 1]; //data3 XORed = 0, AND = 1, OR = 1


trainButton.onclick = () => {
	ChooChoo(); //train :)
}

iterationCount.onkeydown = (v: KeyboardEvent) => {
	if(v.keyCode==13) { ChooChoo(); } //keyCode 13 = Enter key
}


function ChooChoo() { //ima train bitch
	Misc.Clear(); //clear text printed to webpage with our sexy misc.print function
	Misc.Print("");	

	//check the value they entered and use if valid
	let it = parseInt(iterationCount.value);
	if(it > 0) { trainIterations = it; }

	//create Neural Network with some parameter (input layer, {Hidden layerz}, output layer)
	let n = new TsNet(2, 60, 12, 3);

	//Check how the net performs on the data before training
	for(let i=0; i<4; i++)
	{
		n.fire(data[i]);

		//print  a ^ b = Target : NeuralNetOutput (raw output)
		Misc.Print(`${data[i][0]} ^ ${data[i][1]} = ${target[i][0]}: ${Math.floor(n.Output[0] + 0.5)} (${n.Output[0]})`);
		Misc.Print(`${data[i][0]} & ${data[i][1]} = ${target[i][1]}: ${Math.floor(n.Output[1] + 0.5)} (${n.Output[1]}`);
		Misc.Print(`${data[i][0]} | ${data[i][1]} = ${target[i][2]}: ${Math.floor(n.Output[2] + 0.5)} (${n.Output[2]}\n`);
	}

	for (var k = 0; k < trainIterations; k++) {
		var rnd = Math.floor(Math.random()*exampleCount); //train on a random example each time

		//data.length must be the same length as the input layer, target.length as output layer. learningRate should be low (0.02 to 0.5 good, 0.2 common)
		error[k] = n.train(data[rnd], target[rnd], learningRate);
	}

	Misc.Print("After Training:");
	for(let i=0; i<4; i++)
	{
		n.fire(data[i]);

		Misc.Print(`${data[i][0]} ^ ${data[i][1]} = ${target[i][0]}: ${Math.floor(n.Output[0] + 0.5)} (${n.Output[0]})`);
		Misc.Print(`${data[i][0]} & ${data[i][1]} = ${target[i][1]}: ${Math.floor(n.Output[1] + 0.5)} (${n.Output[1]}`);
		Misc.Print(`${data[i][0]} | ${data[i][1]} = ${target[i][2]}: ${Math.floor(n.Output[2] + 0.5)} (${n.Output[2]}\n`);
	}

	Misc.Print(`Error at 0: ` + error[0]);
	Misc.Print(`Error at ${trainIterations*0.25}: ` + error[Math.floor(trainIterations * 0.25)]);
	Misc.Print(`Error at ${trainIterations*0.50}: ` + error[Math.floor(trainIterations * 0.50)]);
	Misc.Print(`Error at ${trainIterations*0.75}: ` + error[Math.floor(trainIterations * 0.75)]);
	Misc.Print(`Error at ${trainIterations-1}: ` + error[trainIterations - 1]);
}