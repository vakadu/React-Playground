"use client";

export default function IndexDB() {
  function addTodo(todo) {
    const request = indexedDB.open("MyDatabase", 1); // version 1

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // This is where the object store should be created
      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;

      // NOW it's safe to access the object store
      const tx = db.transaction("todos", "readwrite");
      const store = tx.objectStore("todos");

      store.add({ ...todo, id: Date.now() });

      tx.oncomplete = () => db.close();
    };

    request.onerror = function (event) {
      console.error("IndexedDB error:", event.target.error);
    };
  }

  return <div onClick={() => addTodo({ name: "test" })}>Add Todo</div>;
}
