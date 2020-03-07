const { spawn } = require("child_process");
const core = require('@actions/core');

function spawn_command(command, options) {

    const spawn_shell = spawn(command, options);

    spawn_shell.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    spawn_shell.stderr.on("data", data => {
        core.error(`stderr: ${data}`);
        core.setFailed(`Action failed with error`);
    });

    spawn_shell.on('error', (error) => {
        core.error(`error: ${error.message}`);
        core.setFailed(`Action failed with error`);
    });

    spawn_shell.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

}

// Copy opendaylight maven setting
spawn_command("mkdir", ["-p", "~\/.m2\/"]);
spawn_command("touch",[ "~\/.m2\/settings.xml"]);
spawn_command("wget", ["-q", "-O", "~\/.m2\/settings.xml","https:\/\/raw.githubusercontent.com\/opendaylight\/odlparent\/master\/settings.xml"]);

let options = ["clean", "install"];

if (core.getInput("verbose").toLowerCase() == "false") {
    options.push("--quiet");
}

if (core.getInput("skipTests").toLowerCase() == "true") {
    options.push("-DskipTests");
}

spawn_command("mvn", options);