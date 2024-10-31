const languageMapper = (language) => {
    const languageMap = {
        javascript: 'javascript',
        python: 'python',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        sql: 'sqlite3'  
    };
    return languageMap[language.toLowerCase()];
};

module.exports = { languageMapper };
