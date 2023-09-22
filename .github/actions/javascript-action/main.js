const core = require('@actions/core');

console.log('Hello from Node 20!');

console.log(process.env.INPUT_MESSAGE);

core.setOutput('greetings', 'Greetings from the Output!!');