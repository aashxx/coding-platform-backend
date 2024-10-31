const { exec } = require('child_process');

const executeSql = (userQuery) => {
    return new Promise((resolve, reject) => {
        exec(`docker exec -i postgres_container psql -U postgres -d mydatabase -c "${userQuery}"`, (error, stdout, stderr) => {
            if (error) {
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { executeSql };
