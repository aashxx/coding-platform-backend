const { executeCode } = require('../services/pistonService');

const validateSql = async (req, res) => {
    
    const { userCode, testCases } = req.body;

    const results = await Promise.all(
        testCases.map(async ({ input, expectedOutput }) => {
            const response = await executeCode('sqlite3', userCode, input);
            const actualOutput = response?.run?.stdout?.trim() || '';

            return {
                input,
                expectedOutput,
                actualOutput,
                pass: actualOutput === expectedOutput
            };
        })
    );

    res.json({ results });
};

module.exports = { validateSql };
