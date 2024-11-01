const { executeCode } = require('../services/pistonService');

const runDSAProblem = async (req, res) => {
  const { code, language, testCases } = req.body;

  const results = [];
  for (const { input, expectedOutput } of testCases) {
    const stdin = input;
    try {
      const output = await executeCode(code, language, stdin);
      results.push({
        input,
        expectedOutput,
        output,
        passed: output.trim() === expectedOutput.trim()
      });
    } catch (error) {
      console.error("Error executing test case:", error);
      results.push({
        input,
        expectedOutput,
        output: "Error executing code",
        passed: false
      });
    }
  }

  res.json(results);
};

module.exports = { runDSAProblem };
