const perlin = require('perlin');
const dgram = require('dgram');
const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
// console.log('perlin: ', perlin);
const fs = require('fs');
const args = process.argv;
const fileName = args[2];
let  rate = args[3];
let isDebugging = +args[4];
if(!rate)
  rate=100;
if(isDebugging===undefined||isDebugging===null)
  isDebugging=true;
const dataString = fs.readFileSync(fileName,'utf8');
const dataSplitted = dataString.split('\n');
var data = dataSplitted.map(row => row.split(',').map(f=>+f));
var a=0;
const outport = 41234;
sendHeartbeat = function() {
    const row = data[a];
    a+=1;
    if(a>data.length-1){
        a=0
    }
    var buf;
    const args = row.map(x=>{return{type:"float",value:x}});
    if(isDebugging)
      console.log(args);
    buf = osc.toBuffer({
      address: "/heartbeat",
      args
    });
    return udp.send(buf, 0, buf.length, outport, "localhost");
  };
   
setInterval(sendHeartbeat, rate);