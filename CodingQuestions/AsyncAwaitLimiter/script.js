

const asyncPool = async (tasksList, limit) =>{

    const activeTasks = new Set();
    const results = [];

    for(const task of tasksList){

        const promiseTask = task();

        const signal = promiseTask.then((resp) => {

            results.push(resp);
            activeTasks.delete(signal);

        }).catch((err) => console.log('Task Error:', err));
        

        activeTasks.add(signal);


        if(activeTasks.size == limit){
            await Promise.race(activeTasks);
        }

    }

    await Promise.all(activeTasks);

    return results;
        

}


const sleep = (ms,id) => new Promise((resolve,reject) => {
    console.log(`Task-${id} is started`);

    setTimeout(() => {
        console.log(`Task-${id} is done!`);
        resolve(`Result of Task-${id}`);
    },ms);
})

const tasks = [
    () => sleep(4000,1),
    () => sleep(1000,2),
    () => sleep(2000,3),
    () => sleep(3000,4),
    () => sleep(1500,5),
    () => sleep(2500,6), 
]

asyncPool(tasks,2).then((results) => {
    console.log('All tasks completed:', results);
}).catch((err) => {
    console.log('Error in processing tasks:', err);
});







/* EXPECTED CONSOLE OUTPUT:
--- Starting Pool (Limit: 2) ---
[Start] Task 1 started  <-- Slot 1 occupied
[Start] Task 2 started  <-- Slot 2 occupied (Pool Full)
[Finish] Task 2 done!   <-- Task 2 finishes fast (1s). Slot opens.
[Start] Task 3 started  <-- Task 3 grabs the slot immediately.
...
*/