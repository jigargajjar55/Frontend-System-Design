/*

The Concept: The Observer Pattern An Event Emitter is a mechanism that allows different parts of 
an application to communicate without being directly connected. It is based on the Publish-Subscribe 
(Pub/Sub) pattern.

Think of it like a YouTube Channel:

Subscribe (on): You subscribe to a channel. You are now waiting for updates.

Publish (emit): The creator uploads a video. YouTube notifies everyone who subscribed.

Unsubscribe (off): You get tired of the channel and unsubscribe. You stop receiving notifications.

The Data Structure Strategy To make this work, we need a specific way to store data in memory. We need a "Dictionary" or "Map" where:

Key: The name of the event (e.g., 'click', 'dataReceived').

Value: An Array of functions (callbacks) that should run when that event happens.


*/

class EventEmitter {

    constructor(){
        this.eventMap = new Map();
    }

    //Subscribe to an event
    on(eventName, callbackFn){

        //Edge case
        if(typeof callbackFn !== 'function'){
            throw new TypeError('Callback must be a function');
        }


        if(!this.eventMap.has(eventName)){
            this.eventMap.set(eventName, []);
        }

        this.eventMap.get(eventName).push(callbackFn);

        return this;
    }

    //unsubscribe from an event
    off(eventName, callbackFn){

        if(!this.eventMap.has(eventName)){
            return this;
        }

        const listeners = this.eventMap.get(eventName);

        const filteredListeners = listeners.filter((fn) => fn !== callbackFn);

        this.eventMap.set(eventName, filteredListeners);
        return this;
    }

    //Publish an event
    emit(eventName, ...args){
        
        if(!this.eventMap.has(eventName)){
            return false;
        }

        const listeners = this.eventMap.get(eventName);

        listeners.forEach((currCallBackFn) => {

            currCallBackFn(...args);
            
        });

        return true;

    }
}



//Example Usage:

const eventEmitter = new EventEmitter();

const userJoinedCallback = (username, time) => {
    console.log(`${username} has joined the chat at ${time}`);
}

const userWelcomeCallback = (username) => {

    console.log(`Welcome ${username} to the chat!`);    
}

const userLeftCallback = (username, time) => {
    console.log(`${username} has left the chat at ${time}`);
}



eventEmitter.on("userJoined", userJoinedCallback).on("userJoined", userWelcomeCallback);

eventEmitter.on("userLeft", userLeftCallback);


eventEmitter.emit("userJoined", "Jigar", "10:00 AM");

eventEmitter.emit("userLeft", "Jigar", "10:30 AM");

eventEmitter.off("userJoined", userWelcomeCallback);

eventEmitter.emit("userJoined", "Neel", "11:00 AM");

eventEmitter.emit("userLeft", "Neel", "12:30 PM");

