document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('title').addEventListener('click', function () {
    window.location.href = 'index.html';
  });
});

document.getElementById('aboutButton').addEventListener('click', function () {
  window.location.href = 'aboutPage.html';
});

function resizeTextarea(id) {
  const textarea = document.getElementById(id);
  textarea.style.height = '';
  textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
}

document.getElementById('userInput')?.addEventListener('input', function () {
  resizeTextarea('userInput');
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu.classList.contains('hidden')) {
    navMenu.classList.remove('hidden');
  } else {
    navMenu.classList.add('hidden');
  }
}