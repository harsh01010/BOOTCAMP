import { useState } from "react";
export default function Form({ onAddItems }) {
  const [description, setDecription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, package: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    //setting the form back to it's initial state
    setDecription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // controlled elemetns
          setQuantity(Number(e.target.value));
          console.log(quantity);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          //controlled elemetns
          setDecription(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
