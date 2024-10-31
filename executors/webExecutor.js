const { JSDOM } = require('jsdom');

const executeWebCode = (htmlCode, cssCode, jsCode, input) => {
    return new Promise((resolve) => {
        const dom = new JSDOM(htmlCode, { runScripts: "dangerously" });
        const { window } = dom;
        const script = window.document.createElement('script');
        script.textContent = jsCode;
        window.document.body.appendChild(script);

        const result = window.document.body.textContent || "Execution failed";
        resolve(result.trim());
    });
};

module.exports = { executeWebCode };
