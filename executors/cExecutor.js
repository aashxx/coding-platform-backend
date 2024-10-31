const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeC = (userCode, input) => {
    return new Promise((resolve, reject) => {
        const codeFile = path.join(__dirname, 'main.c');
        fs.writeFileSync(codeFile, userCode);

        exec(`docker run --rm -v ${codeFile}:/usr/src/app/main.c gcc:latest gcc /usr/src/app/main.c -o /usr/src/app/a.out && /usr/src/app/a.out`, (error, stdout, stderr) => {
            fs.unlinkSync(codeFile);
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executeC };
