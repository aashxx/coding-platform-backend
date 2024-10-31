const languageMap = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
  };
  
  const getLanguageId = (language) => {
    return languageMap[language.toLowerCase()] || 'txt';
  };
  
  module.exports = getLanguageId;
  