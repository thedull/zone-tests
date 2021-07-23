require('./zone-node.js');

const z = Zone.current.fork({
    name: 'z',
    onHasTask(delegate, current, target, hasTaskState) {
        console.log(hasTaskState.change);
        console.log(hasTaskState.macroTask);
        console.log(JSON.stringify(hasTaskState));
        console.log(current.name);
        console.log(target.name);
    }
});

function a() {}

function b() {
    setTimeout(a, 2000);
}

z.run(b);
