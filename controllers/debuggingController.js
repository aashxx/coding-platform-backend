const { executeCode } = require('../executors/executor');

const validateDebugging = async (req, res) => {
    
    const { userCode, language, testCases } = req.body;

    const results = await Promise.all(
        testCases.map(async ({ input, expectedOutput }) => {
            const actualOutput = await executeCode(userCode, language, input);
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

module.exports = { validateDebugging };
