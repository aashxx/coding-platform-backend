const axios = require('axios');
require('dotenv').config();

const executeCode = async (language, code, stdin) => {
    try {
        const response = await axios.post(process.env.PISTON_API_URL, {
            language,
            version: '*', 
            files: [{ content: code }],
            stdin: stdin,
        });
        return response.data;
    } catch (error) {
        console.error('Error communicating with Piston API:', error);
        return { error: 'Error communicating with Piston API' };
    }
};

module.exports = { executeCode };
