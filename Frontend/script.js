// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submitButton');
  const userInput = document.getElementById('userInput');
  const chatbotResponse = document.getElementById('chatbotResponse');

  // Function to simulate sending data to your backend and receiving a response
  async function fetchChatbotResponse(question) {
    try {
      // Replace 'your-backend-endpoint' with the actual endpoint where you're sending the user input
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.answer; // Adjust this depending on the structure of your response
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return "Sorry, I couldn't fetch the response.";
    }
  }

  // Event listener for the submit button
  submitButton.addEventListener('click', async () => {
    const question = userInput.value.trim();
    if (question) {
      const answer = await fetchChatbotResponse(question);
      chatbotResponse.textContent = answer;
    } else {
      chatbotResponse.textContent = "Please enter a question.";
    }
  });
});

document.getElementById('submitButton').addEventListener('click', async function () {
  const userInput = document.getElementById('userInput').value;
  addMessage('user', userInput); // Display user message
  const chatbotResponse = await getChatbotResponse(userInput);
  addMessage('bot', chatbotResponse); // Display chatbot response
  document.getElementById('userInput').value = ''; // Clear input field
});

function addMessage(sender, message) {
  const messagesContainer = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('p-3', sender === 'user' ? 'bg-blue-100' : 'bg-green-100', 'rounded', 'text-gray-800');
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the latest message
}

async function getChatbotResponse(message) {
  try {
    // Specify your Flask backend endpoint for the chatbot
    const endpoint = 'http://localhost:5000/chat'; // Update this URL to match your Flask app's host and port

    // Prepare the request payload
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message })
    };

    // Send the request to your Flask backend
    const response = await fetch(endpoint, payload);

    // Parse the JSON response
    const data = await response.json();

    // Return the chatbot's answer
    return data.answer;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return "Sorry, I couldn't fetch the response. Please try again.";
  }
}
