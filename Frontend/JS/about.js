document.addEventListener('DOMContentLoaded', function () {
    fetch('aboutTheBot.txt')
        .then(response => response.text())
        .then(text => {
          document.getElementById('aboutTheBot').innerText = text;
        })
        .catch(error => {
          console.error('Error loading the About Me text:', error);
          document.getElementById('aboutTheBot').innerText = 'Failed to load content.';
        });
});