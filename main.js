const { exec } = require("child_process");
const core = require('@actions/core');

function exec_command(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            core.error(`error: ${error.message}`);
            core.setFailed(`Action failed with error`);
            return;
        }
        if (stderr) {
            core.error(`stderr: ${stderr}`);
            core.setFailed(`Action failed with error`);
            return;
        }
        core.debug(`stdout: ${stdout}`);
    });
}

// Copy opendaylight maven setting
exec_command("wget -q -O - https://raw.githubusercontent.com/opendaylight/odlparent/master/settings.xml > ~/.m2/settings.xml");

let options = "";

if (core.getInput("verbose").toLowerCase() == "false") {
    options += "--quiet ";
}

if (core.getInput("skipTests").toLowerCase() == "true") {
    options += "-DskipTests ";
}

const maven_command = "mvn clean install " + options;
exec_command(maven_command);