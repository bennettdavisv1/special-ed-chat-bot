document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('title').addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  });
  
  document.getElementById('aboutButton').addEventListener('click', function() {
    window.location.href = 'aboutPage.html';
  });
  
  function resizeTextarea(id) {
    const textarea = document.getElementById(id);
    textarea.style.height = '';
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
  }
  
  document.getElementById('userInput')?.addEventListener('input', function() {
    resizeTextarea('userInput');
});