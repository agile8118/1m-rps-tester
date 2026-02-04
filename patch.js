/*
Running this file is like running the following autocannon command:

autocannon -m PATCH \
  --connections 200 --duration 20 --pipelining 20 --workers 60 \
  -H "Content-Type: application/json" \
  -b '{"foo1":"test","foo2":"test","foo3":"test","foo4":"test","foo5":"test","foo6":"test","foo7":"test","foo8":"test","foo9":"test","foo10":"test"}' \
  "http://ec2-3-149-144-133.us-east-2.compute.amazonaws.com:3002/update-something/123/john_doe?value1=abc&value2=xyz"
*/

const autocannon = require("autocannon");
const fs = require("fs");
const { Writable } = require("stream");

// Example usage: node tester-code.js 20 20 5 8 5555 localhost
// Example usage: node tester/patch.js 800 20 5 6 3000 ec2-3-149-144-133.us-east-2.compute.amazonaws.com

const connections = parseInt(process.argv[2]);
const duration = parseInt(process.argv[3]);
const pipelining = parseInt(process.argv[4]);
const workers = parseInt(process.argv[5]);
const port = parseInt(process.argv[6] || 3000);
const dns =
  process.argv[7] || "ec2-3-149-144-133.us-east-2.compute.amazonaws.com";

console.log(
  `Running test with ${connections} connections, ${duration}s duration, ${pipelining} pipelining, ${workers} workers against ${dns}:${port}`,
);

const config = {
  url: `http://${dns}:${port}/update-something/123/john_doe?value1=abc&value2=xyz`,
  method: "PATCH",
  connections: connections,
  workers: workers,
  pipelining: pipelining,
  duration: duration,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    foo1: "test",
    foo2: "test",
    foo3: "test",
    foo4: "test",
    foo5: "test",
    foo6: "test",
    foo7: "test",
    foo8: "test",
    foo9: "test",
    foo10: "test",
  }),
};

autocannon(config, (err, result) => {
  if (err) return;
  const jsonOutput = JSON.stringify(result, null, 2);
  fs.writeFileSync("output.json", jsonOutput);

  const tableOutput = autocannon.printResult(result, {
    outputStream: new Writable(),
  });

  fs.writeFileSync("results.txt", tableOutput);

  // Append some extra stuff to results.txt
  fs.appendFileSync(
    "results.txt",
    `\nTest started at: ${new Date(result.start)}\n`,
  );
  fs.appendFileSync(
    "results.txt",
    `Test finished at: ${new Date(result.finish)}\n`,
  );
  fs.appendFileSync("results.txt", `Connections: ${result.connections}\n`);
  fs.appendFileSync("results.txt", `Pipelining: ${result.pipelining}\n`);
  fs.appendFileSync("results.txt", `Workers: ${result.workers}\n`);
  fs.appendFileSync("results.txt", `Duration: ${result.duration}s \n`);
  fs.appendFileSync("results.txt", `URL: ${result.url} \n`);

  console.log("Test completed. Results saved to output.json and results.txt");
});
