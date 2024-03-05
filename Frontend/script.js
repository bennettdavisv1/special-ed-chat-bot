// Define `getChatbotResponse` at the top level so it's accessible everywhere
async function getChatbotResponse(message) {
  const endpoint = 'http://localhost:5000/chat'; // Endpoint variable for easy access
  
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: message })
  };

  try {
    const response = await fetch(endpoint, payload);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.answer; // Assuming the response has an 'answer' property
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return "Sorry, I couldn't fetch the response. Please try again.";
  }
}
  
// Define `addMessage` at the top level as well
function addMessage(sender, message) {
  const messagesContainer = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('p-3', sender === 'user' ? 'bg-blue-100' : 'bg-green-100', 'rounded', 'text-gray-800');
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the latest message
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submitButton');
  const userInput = document.getElementById('userInput');
  const messagesContainer = document.getElementById('messages'); // Moved here, because it's used in `addMessage`

  // Event listener for the submit button
  submitButton.addEventListener('click', async () => {
    const question = userInput.value.trim();
    if (question) {
      addMessage('user', question); // Display user message
      const answer = await getChatbotResponse(question);
      addMessage('bot', answer); // Display chatbot response
      userInput.value = ''; // Clear input field
    } else {
      addMessage('bot', "Please enter a question.");
    }
  });

  // Event listener for pressing Enter in the textarea
  userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitButton.click();
    }
  });
});  

document.getElementById('aboutButton').addEventListener('click', function() {
  window.location.href = 'aboutPage.html';
});

document.getElementById('title').addEventListener('click', function() {
  window.location.href = 'index.html';
});


function resizeTextarea(id) {
  const textarea = document.getElementById(id);
  textarea.style.height = ''; // Reset the height
  textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
}

document.getElementById('userInput').addEventListener('input', function() {
  resizeTextarea('userInput');
});