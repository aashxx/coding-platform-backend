const { executeCode } = require('../services/pistonService');

const runSQLProblem = async (req, res) => {

  const { query, testCases } = req.body;

  const results = await Promise.all(
    testCases.map(async ({ expectedRowCount }) => {
      const output = await executeCode(query, "sqlite3");
      const rowCount = output.split('\n').length - 1; 
      return {
        expectedRowCount,
        rowCount,
        passed: rowCount === expectedRowCount
      };
    })
  );

  res.json(results);
};

module.exports = { runSQLProblem };
