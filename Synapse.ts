/*
* Synapse.ts
* 2019 Immortal.Digital
* Provides a weight value and the ability to update its value at some point in the future
* While training access W(), update WUpdate. While Firing, access WUpdate to use the updated values
*/

export class Synapse {
    public weight: number; //the weight value for the current training session
    private newWeight: number; //the weight value to use for the next Fire() call

    constructor() {
    	this.weight = Synapse.randomWeight();
    	this.newWeight = this.weight;
    }

    //get the current weight. Use while training (TsNet.train())
    get W() {
    	return this.weight;
    }
    set W(num: number) {
    	this.weight = num;
    	this.newWeight = num;
    }

    //this updates the weight to the new value. Use when updating (when calling TsNet.Fire())
    get WUpdate() {
    	this.weight = this.newWeight;
    	return this.weight;
    }

    //set the updated weight value to use next time we call Fire() (however remember the current weight value while still training)
    set WUpdate(num: number) {
    	this.newWeight = num;
    }

    get ID() {
    	return this.myID;
    }

    //generate random number in range -1.0 to 1.0
    public static randomWeight(): number {
    	return (Math.random() * 2.0) - 1.0;
    }
}