export const evaluateUserCode = (userCode, input) => {
  try {
    const mainFunction = new Function('input', `${userCode}; return main(input);`);
    return mainFunction(input);
  } catch (error) {
    return error.message;
  }
};

export const validateCodeWithJest = (userCode, testCases) => {
  const results = testCases.map((testCase, index) => {
    const { input, expectedOutput } = testCase;
    let actualOutput;
    let passed;

    try {
      actualOutput = evaluateUserCode(userCode, input);
      passed = actualOutput === expectedOutput;
    } catch (error) {
      actualOutput = error.message;
      passed = false;
    }

    return {
      testCase: index + 1,
      input,
      expectedOutput,
      actualOutput,
      status: passed ? 'pass' : 'fail',
    };
  });

  const allPassed = results.every(result => result.status === 'pass');

  return {
    success: allPassed,
    results,
  };
};
