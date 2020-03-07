const { exec } = require("child_process");

function exec_command(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// Copy opendaylight maven setting
exec_command("cp -n ~/.m2/settings.xml{,.orig} ; wget -q -O - https://raw.githubusercontent.com/opendaylight/odlparent/master/settings.xml > ~/.m2/settings.xml");

let options = "";

if (process.env.INPUT_VERBOSE.toLowerCase() == "false") {
    options += "--quiet ";
}

if (process.env.INPUT_SKIPTESTS.toLowerCase() == "true") {
    options += "-DskipTests ";
}

const maven_command = "mvn clean install " + options;
exec_command(maven_command);