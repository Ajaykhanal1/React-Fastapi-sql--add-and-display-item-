import { useState } from "react";
import axios from "axios";

const Add = ({ onItemAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const response = await axios.post("http://localhost:8000/items", { name });
      setName("");
      onItemAdded(response.data); // pass the new item back to parent
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter item name"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
