require('./zone-node.js');

const zoneBC = Zone.current.fork({ 
    name: 'BC',
    properties: { 
        data: { value: 'initial' }  
    }
});

function c() {
    console.log(Zone.current.get('data'));
    console.log(Zone.current.name);
}

function b() {
    console.log(Zone.current.get('data'));
    console.log(Zone.current.name);
    Zone.current.get('data').value = 'updated';
    setTimeout(c, 2000);
}

function a() {
    console.log(Zone.current.name);
    console.log(Zone.current.get('data'));
    zoneBC.run(b);
}

a();


