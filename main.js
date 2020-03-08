const core = require("@actions/core");
const exec = require("@actions/exec");
const io = require("@actions/io");

async function main() {
  // Copy opendaylight maven setting
  try {
    await io.mkdirP(process.env.HOME + "/.m2");
    await exec.exec("touch " + process.env.HOME + "/.m2/settings.xml");
    await exec.exec(
      "wget -q -O " +
        process.env.HOME +
        "/.m2/settings.xml https://raw.githubusercontent.com/opendaylight/odlparent/master/settings.xml"
    );
  } catch (e) {
    core.error("" + e);
    core.setFailed(`Action failed with error`);
    return;
  }

  let options = ["clean", "install"];

  const exec_options = {};
  exec_options.listeners = {
    stdline: data => {
      core.info(data);
    },
    errline: data => {
      core.error(data);
    }
  };

  if (core.getInput("verbose").toLowerCase() == "false") {
    options.push("--quiet");
  }

  if (core.getInput("skipTests").toLowerCase() == "true") {
    options.push("-DskipTests");
  }
  try {
    await exec.exec("mvn " + options.join(" "), null, exec_options);
  } catch (e) {
    core.error("" + e);
    core.setFailed(`Action failed with error`);
    return;
  }
}

main();
