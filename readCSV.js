const perlin = require('perlin');
const dgram = require('dgram');
const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
// console.log('perlin: ', perlin);
const fs = require('fs');
const args = process.argv;
const fileName = args[2];
const dataString = fs.readFileSync(fileName,'utf8');
// console.log('dataString: ', dataString);
const dataSplitted = dataString.split('\n');
// console.log('dataSplitted: ', dataSplitted);
var data = dataSplitted.map(row => row.split(',').map(f=>+f));
var a=0;
const outport = 41234;
sendHeartbeat = function() {
    const row = data[a];
    // console.log('row: ', row);
    a+=1;
    if(a>data.length-1){
        a=0
    }
    var buf;
    const args = row.map(x=>{return{type:"float",value:x}});
    console.log('args: ', args);
    buf = osc.toBuffer({
      address: "/heartbeat",
      args
    });
    return udp.send(buf, 0, buf.length, outport, "localhost");
  };
   
  setInterval(sendHeartbeat, 100);