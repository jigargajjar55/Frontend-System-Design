/*

Event Bubbling and Capturing are the 2 ways to propogate the events in DOM tree.


Event Bubbling (Bubbling up): Child event to Parent event
Event Capturing (Trickling down): Parent event to Child event

Life Cycle:
First will Capturing -> then Bubbling

addEventListener take 3 arguments:
event, callback function, eventCapture boolean flag

If we pass eventCapture flag: false, it will do Event Bubbling
If we pass eventCapture flag: true, it will do Event Capturing/Trickling

*/

function attachEventHandlers() {
  document.getElementById("grandParent").addEventListener("click", (e) => {
    
    console.log("Grand Parent clicked!");
  },true);  //Event Capturing

  document.querySelector("#parent").addEventListener("click", (e) => {
    
    console.log("Parent clicked!");
  },false); //Event Bubbling

  document.getElementById("child").addEventListener("click", (e) => {
    
    
    console.log("Child clicked!");
  },false); //Event Bubbling
}

attachEventHandlers();



//Event Delegation
/*

Pros:
1) Attach one event handler for its all child elements
2) Less code
3) Dom Manuplation

Cons:
1) Not every event bubbled up:
Ex: Blur, Window resizing

2) If any part of code using stopPropogation, then you need to take care those edge cases

*/
document.querySelector("#category").addEventListener("click", (e)=> {

    console.log(e.target.id);
    window.location.href= "/"+e.target.id;

})

document.querySelector("#form").addEventListener("keyup", (e) => {
    console.log(e.target.dataset);

    if(e.target.dataset.uppercase !== undefined){
        e.target.value = e.target.value.toUpperCase();
    }
});
