import core from "@actions/core"
import github from "@actions/github";
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

// @actions/exec — Send commands to the CLI.
const main = async () => {
  const result = await exec.exec('echo "Hello from the exec package!"');
  console.log(result);
}
main();

// @actions/github — Some context objects (but not all of them).
console.log(github.context);

// We can also use the github.octoKit() to communicate with GitHub APIs.
// github.getOctokit()