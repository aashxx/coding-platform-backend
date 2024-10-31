const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeCpp = (userCode, input) => {
    return new Promise((resolve, reject) => {
        const codeFile = path.join(__dirname, 'main.cpp');
        fs.writeFileSync(codeFile, userCode);

        exec(`docker run --rm -v ${codeFile}:/usr/src/app/main.cpp gcc:latest g++ /usr/src/app/main.cpp -o /usr/src/app/a.out && /usr/src/app/a.out`, (error, stdout, stderr) => {
            fs.unlinkSync(codeFile);
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executeCpp };
