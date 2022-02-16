// Promise Exec
const util = require('util');
const exec_ = require('child_process').exec;
const exec = util.promisify(exec_);

/**
 * @method getIP
 * Get your local IPv4 adress 
 * 
 * @returns IPv4 adress as a string
 */
const getIP = async () => {
  let ret = await exec('ipconfig | findstr /c:"IPv4"');
  if (ret.err !== null) {
    let lines = ret.stdout.split('\n');
    let ans = '';
    for (let i = lines.length - 1; i > 0; i--) {
      if (!(lines[i].length == 0)) {
        ans = lines[i];
        break;
      }
    }
    ans = ans.replace('\r', '');
    let ip = ans.split(':')[1].trimStart();
    return ip;
  }
};
// TODO: Add support for `ifconfig` on linux (for raspberry pi's especially)

module.exports = getIP;