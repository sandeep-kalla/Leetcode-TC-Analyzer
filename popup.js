const GEMINI_API_KEY = 'AIzaSyDd4HZP1LCLiMvzRooborJbecaA8N66pyw';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function analyzeComplexity(code, language) {
  // Log the code being analyzed
  console.log('Analyzing code:', code);

  const prompt = `
    You are a code complexity analyzer. Analyze the following ${language} code and provide its time and space complexity.
    Be precise and concise. Focus only on the worst-case complexity.
    Return the response in JSON format with the following structure:
    {
      "timeComplexity": "O(...)",
      "spaceComplexity": "O(...)",
      "explanation": "Brief explanation of the complexity in 1-2 sentences"
    }

    Code:
    ${code}
  `;

  // Log the request being sent
  const requestBody = {
    contents: {
      role: "user",
      parts: [{ text: prompt }]
    },
    generationConfig: {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 200
    }
  };
  console.log('Request body:', requestBody);

  const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Log raw response
  const responseText = await response.text();
  console.log('Raw API Response:', responseText);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}: ${responseText}`);
  }

  try {
    const data = JSON.parse(responseText);
    console.log('API Response:', data);
    
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      throw new Error('No text in API response');
    }
    
    // Remove markdown code block markers from the response
    const cleanText = resultText.replace(/```json\n|\n```/g, '');
    
    const parsedResult = JSON.parse(cleanText.trim());
    console.log('Parsed result:', parsedResult);
    return parsedResult;
  } catch (error) {
    console.error('Failed to parse API response:', error);
    throw new Error(`Invalid response format: ${error.message}`);
  }
}

function updateUI(analysis) {
  document.getElementById('loadingIndicator').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  
  document.getElementById('timeComplexity').textContent = analysis.timeComplexity;
  document.getElementById('spaceComplexity').textContent = analysis.spaceComplexity;
  
  // Split the explanation into time and space parts if possible
  const explanationParts = analysis.explanation.split('.');
  if (explanationParts.length > 1) {
    document.getElementById('timeExplanation').textContent = explanationParts[0].trim() + '.';
    document.getElementById('spaceExplanation').textContent = explanationParts[1].trim() + '.';
  } else {
    document.getElementById('spaceExplanation').textContent = analysis.explanation;
  }
}

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  try {
    document.getElementById('error').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('loadingIndicator').classList.remove('hidden');

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      throw new Error('No active tab found');
    }
    
    // Wrap the sendMessage in a Promise to handle timeout
    const codeData = await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tab.id, { action: 'getCode' }, response => {
        if (chrome.runtime.lastError) {
          reject(new Error('Please refresh the LeetCode page and try again'));
        } else if (!response) {
          reject(new Error('No code found'));
        } else {
          resolve(response);
        }
      });
    });
    
    if (!codeData.code) {
      throw new Error('No code found in editor');
    }

    const analysis = await analyzeComplexity(codeData.code, codeData.language);
    updateUI(analysis);
  } catch (error) {
    console.error('Analysis failed:', error);
    document.getElementById('loadingIndicator').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('error').textContent = error.message || 'Failed to analyze code. Please try again.';
  }
}); 