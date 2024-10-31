const { executeCode } = require('../services/pistonService');
const { languageMapper } = require('../services/languageMapper');

const validateDsa = async (req, res) => {
    
    const { userCode, language, testCases } = req.body;
    const pistonLanguage = languageMapper(language);

    if (!pistonLanguage) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    const results = await Promise.all(
        testCases.map(async ({ input, expectedOutput }) => {
            const response = await executeCode(pistonLanguage, userCode, input);
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

module.exports = { validateDsa };
