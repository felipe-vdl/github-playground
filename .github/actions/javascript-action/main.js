import core from "@actions/core"
//const github = require('@actions/github');
//const exec = require('@actions/exec');

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