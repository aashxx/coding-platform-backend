const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeJava = (userCode, input) => {
    return new Promise((resolve, reject) => {
        const codeFile = path.join(__dirname, 'Main.java');
        fs.writeFileSync(codeFile, userCode);

        exec(`docker run --rm -v ${codeFile}:/usr/src/app/Main.java openjdk:11 javac /usr/src/app/Main.java && java -cp /usr/src/app Main`, (error, stdout, stderr) => {
            fs.unlinkSync(codeFile);
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executeJava };
