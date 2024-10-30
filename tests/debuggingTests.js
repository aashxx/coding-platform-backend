
    import runTests from 'C:\Users\Administrator\Documents\programming\webdev\coding-platform\coding-platform-backend\tests\debuggingTests.js';
    const userCode = `function add(a, b) { return a + b; }`;
    const testCases = [{"input":"2, 3","expectedOutput":5},{"input":"10, 20","expectedOutput":30},{"input":"-2, -5","expectedOutput":3}];
    runTests(userCode, testCases);
  