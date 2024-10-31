const axios = require('axios');
const getLanguageId = require('../utils/getLanguageId');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const validateSql = async (req, res) => {
  const { userCode, language, testCases } = req.body;
  const languageId = getLanguageId(language);
  const results = [];

  for (const { input, expectedOutput } of testCases) {
    const payload = {
      language: languageId,
      source: userCode,
      stdin: input,
    };

    try {
      const response = await axios.post('https://your-piston-url.com/api/execute', payload);
      const actualOutput = response.data.run.output.trim();

      results.push({
        input,
        expectedOutput,
        actualOutput,
        pass: actualOutput === expectedOutput,
      });
    } catch (error) {
      console.error('Error communicating with Piston:', error);
      results.push({
        input,
        expectedOutput,
        actualOutput: null,
        pass: false,
        error: 'Error communicating with Piston API',
      });
    }

    await delay(200);
  }

  res.json({ results });
};

module.exports = { validateSql };
