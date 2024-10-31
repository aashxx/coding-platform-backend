const { executeWebCode } = require('../executors/webExecutor');

const validateWeb = async (req, res) => {
    
    const { htmlCode, cssCode, jsCode, testCases } = req.body;

    const results = await Promise.all(
        testCases.map(async ({ input, expectedOutput }) => {
            const actualOutput = await executeWebCode(htmlCode, cssCode, jsCode, input);
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

module.exports = { validateWeb };
