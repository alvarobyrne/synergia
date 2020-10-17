const perlin = require('perlin');
const dgram = require('dgram');
const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
// console.log('perlin: ', perlin);

const p2 = perlin.noise.perlin2(1, 1);
var a=0;
const outport = 41234;
sendHeartbeat = function() {
    const p = 1+perlin.noise.perlin2(1, a);
    console.log('p: ', p);
    a+=0.1;
    var buf;
    buf = osc.toBuffer({
      address: "/heartbeat",
      args: [
        {
          type: "float",
          value: p
        }
      ]
    });
    return udp.send(buf, 0, buf.length, outport, "localhost");
  };
   
  setInterval(sendHeartbeat, 200);