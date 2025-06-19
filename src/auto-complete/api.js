const data = [
  { id: "apple", label: "Apple" },
  { id: "banana", label: "Banana" },
  { id: "mango", label: "Mango" },
  { id: "kiwi", label: "Kiwi" },
  { id: "grape", label: "Grape" },
  { id: "orange", label: "Orange" },
  { id: "pineapple", label: "Pineapple" },
  { id: "watermelon", label: "Watermelon" },
  { id: "avocado", label: "Avocado" },
  { id: "coconut", label: "Coconut" }
]

export function api() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 300)
    })
}

