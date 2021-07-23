require('./zone-node.js');

let timer;

const z = Zone.current.fork({
    name: 'z',
    onScheduleTask(delegate, currentZone, targetZone, task) {
        const result = delegate.scheduleTask(targetZone, task);
        const name = task.callback.name;
        console.log(
            Date.now() - timer,
            `task with callback ${name} is added to the task queue`
        );
        return result;
    },
    onInvokeTask(delegate, currentZone, targetZone, task, ...args) {
        const result = delegate.invokeTask(targetZone, task, ...args);
        const name = task.callback.name;
        console.log(
            Date.now() - timer,
            `task with callback ${name} is removed from the task queue`
        );
        return result;
    }
});

/*

const z = Zone.current.fork({
    name: 'z',
    onHasTask(delegate, current, target, hasTaskState) {
        console.log(Date.now() -timer);
        console.log(hasTaskState.change);
        console.log(hasTaskState.macroTask);
    }
});

*/

function a1() {}
function a2() {}

function b() {
    timer = Date.now();
    setTimeout(a1, 2000);
    setTimeout(a2, 4000);
}


z.run(b);

