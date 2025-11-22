if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => console.log('SW registrato'))
      .catch(err => console.log('SW errore:', err));
  });
}
