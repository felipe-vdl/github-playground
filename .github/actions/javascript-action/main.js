import core from "@actions/core"
//const github = require('@actions/github');
import exec from "@actions/exec";

console.log('Hello from Node 20!');

// Getting Inputs
// Using env
console.log(process.env.INPUT_MESSAGE);

// Using core
const message = core.getInput('message', {
  required: true,
});
console.log(message);

// Setting Outputs
core.setOutput('greetings', 'Greetings from the Output!!');

exec.exec('echo "Hello from the exec package!"');