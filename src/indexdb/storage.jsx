const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore('todos', { keyPath: 'id' });
};

request.onsuccess = function (event) {
  const db = event.target.result;
  console.log('DB opened', db);
};

request.onerror = function (event) {
  console.error('Error opening DB', event);
};

export default request;