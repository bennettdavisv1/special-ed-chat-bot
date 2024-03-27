async function getChatbotResponse(message, userId) {
  const endpoint = 'http://localhost:5000/chat';
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_input: message, user_id: userId })
  };

  try {
    const response = await fetch(endpoint, payload);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return "Sorry, I couldn't fetch the response. Please try again.";
  }
}

function addMessage(sender, message) {
  const messagesContainer = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('p-3', sender === 'user' ? 'bg-blue-100' : 'bg-green-100', 'rounded', 'text-gray-800');
  let uniqueSpanId;
  if (sender === 'user') {
    messageDiv.textContent = message;
  } else {
    const messageSpan = document.createElement('span');
    uniqueSpanId = 'botMessage' + new Date().getTime();
    messageSpan.id = uniqueSpanId;
    messageDiv.appendChild(messageSpan);
  }
  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
  if (sender === 'bot' && uniqueSpanId) {
    typeText(uniqueSpanId, message, 20);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submitButton');
  const userInput = document.getElementById('userInput');
  const userId = 'exampleUserId';
  submitButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage('user', message);
      const response = await getChatbotResponse(message, userId);
      if (response) {
        addMessage('bot', response);
      } else {
        addMessage('bot', "I'm sorry, I couldn't process your request.");
      }
      userInput.value = '';
    } else {
      addMessage('bot', "Please enter a question.");
    }
  });
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
  textarea.style.height = '';
  textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
}

document.getElementById('userInput').addEventListener('input', function() {
  resizeTextarea('userInput');
});

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function typeText(elementId, text, speed) {
  let index = 0;
  const element = document.getElementById(elementId);
  function type() {
      if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
          setTimeout(type, speed);
      }
  }
  type();
}