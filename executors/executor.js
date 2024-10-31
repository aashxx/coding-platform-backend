const { executePython } = require('./pythonExecutor');
const { executeJava } = require('./javaExecutor');
const { executeCpp } = require('./cppExecutor');
const { executeC } = require('./cExecutor');
const { executeJs } = require('./jsExecutor');
const { executeSql } = require('./sqlExecutor');
const { executeWebCode } = require('./webExecutor');

const executeCode = async (userCode, language, input) => {
    switch (language) {
        case 'python':
            return await executePython(userCode, input);
        case 'java':
            return await executeJava(userCode, input);
        case 'cpp':
            return await executeCpp(userCode, input);
        case 'c':
            return await executeC(userCode, input);
        case 'js':
            return await executeJs(userCode, input);
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
};

module.exports = { executeCode, executeSql, executeWebCode };
