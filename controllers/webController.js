const { validateWebProblem } = require('../services/webProgrammingService');

const runWebProblem = async (req, res) => {
  const { html, css, js, questionId } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'HTML and test cases are required.' });
  }

  try {
    const testResults = await validateWebProblem(html, css || '', js || '', questionId);
    const allPassed = testResults.every((result) => result.passed);

    res.status(200).json({
      success: true,
      testResults,
      allPassed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { runWebProblem };
