// Function to extract code from Monaco editor
function getCodeFromEditor() {
  try {
    // Get Monaco editor instance
    const editorElement = document.querySelector('.monaco-editor');
    if (!editorElement) return null;

    // Get the code lines
    const codeLines = Array.from(editorElement.querySelectorAll('.view-line'));
    const code = codeLines.map(line => line.textContent).join('\n');
    
    // Get the selected language
    const languageSelector = document.querySelector('[data-cy="lang-select"]');
    const language = languageSelector ? languageSelector.textContent : 'Unknown';

    return {
      code,
      language
    };
  } catch (error) {
    console.error('Error extracting code:', error);
    return null;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCode') {
    const codeData = getCodeFromEditor();
    sendResponse(codeData);
  }
  return true; // Keep the message channel open for async response
}); 