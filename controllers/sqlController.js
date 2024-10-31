const { executeSql } = require('../executors/sqlExecutor');

const validateSql = async (req, res) => {
    
    const { userQuery, testCases } = req.body;

    const results = await Promise.all(
        testCases.map(async ({ input, expectedOutput }) => {
            const actualOutput = await executeSql(userQuery, input);
            return {
                input,
                expectedOutput,
                actualOutput,
                pass: JSON.stringify(actualOutput) === JSON.stringify(expectedOutput)
            };
        })
    );

    res.json({ results });
};

module.exports = { validateSql };
