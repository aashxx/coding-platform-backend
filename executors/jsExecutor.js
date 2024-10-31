const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeJs = (userCode, input) => {
    return new Promise((resolve, reject) => {
        const codeFile = path.join(__dirname, 'temp.js');
        fs.writeFileSync(codeFile, userCode);

        exec(`docker run --rm -v ${codeFile}:/usr/src/app/temp.js node:14 node /usr/src/app/temp.js`, (error, stdout, stderr) => {
            fs.unlinkSync(codeFile);
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executeJs };
