// This is where it all goes :)

if('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../serviceworker.js');
  });
}

const ready = (func) => {
  /in/.test(document.readyState)?setTimeout('ready('+func+')',9):func()
}

ready(() => {
  const welcomeNode = document.getElementById('welcome');

  welcomeNode.addEventListener('mouseenter', (e) => {
    e.target.style.width = '400px';
    if (window.navigator.platform.toLowerCase().includes('mac')) {
      e.target.textContent = 'Press ctrl + opt + j';
    } else {
      e.target.textContent = 'Press ctrl + shift + j';
    }
  });

  welcomeNode.addEventListener('mouseleave', (e) => {
    e.target.textContent = 'Hello World.';
    e.target.style.width = '200px';
  });
});

