// controllers/sqlController.js
const { executeSQLWithValidation } = require('../services/sqlService');

const runSQLProblem = async (req, res) => {
  
  const { query, testCases } = req.body;

  // Validate input
  if (!query || !testCases || !Array.isArray(testCases)) {
    return res.status(400).json({ error: 'Invalid input. Query and test cases are required.' });
  }

  try {
    // Execute the SQL query against the mock database
    const result = await executeSQLWithValidation(query);

    // Check test cases
    const testResults = testCases.map(testCase => {
      const { expectedRowCount, expectedData } = testCase;

      // Verify row count
      const rowCountMatches = expectedRowCount === result.rowCount;

      // Verify data if expectedData is provided
      let dataMatches = true;
      if (expectedData) {
        dataMatches = JSON.stringify(result.data) === JSON.stringify(expectedData);
      }

      return {
        rowCountMatches,
        dataMatches,
        passed: rowCountMatches && dataMatches,
        actualRowCount: result.rowCount,
        actualData: result.data
      };
    });

    // Determine if all test cases passed
    const allPassed = testResults.every(test => test.passed);

    res.status(200).json({
      success: true,
      query,
      testResults,
      allPassed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { runSQLProblem };
