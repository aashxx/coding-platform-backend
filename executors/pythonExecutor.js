const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executePython = (userCode, input) => {
    return new Promise((resolve, reject) => {
        const codeFile = path.join(__dirname, 'temp.py');
        fs.writeFileSync(codeFile, userCode);

        exec(`docker run --rm -v ${codeFile}:/usr/src/app/temp.py python:3.8 python /usr/src/app/temp.py`, (error, stdout, stderr) => {
            fs.unlinkSync(codeFile);
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executePython };
