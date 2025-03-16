const vm = require("vm");

function executeJS(jsCode) {
    try {
        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(jsCode, sandbox);
    } catch (error) {
        console.error("JS Error:", error);
    }
}

module.exports = { executeJS };
