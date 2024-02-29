// Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
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

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            submitButton.click();
        }
    });
});