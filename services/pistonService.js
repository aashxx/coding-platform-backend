const axios = require('axios');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const executeCode = async (code, language, stdin) => {
  const payload = {
    language,
    version: "*",
    files: [{ content: code }],
    stdin
  };

  await delay(300);
  
  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);
    return response.data.run.stdout;
  } catch (error) {
    console.error("Piston API error:", error);
    throw new Error("Failed to execute code.");
  }
};

module.exports = { executeCode };
