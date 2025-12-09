import React, { useState, useEffect } from 'react';
import Add from './components/Add';
import Display from './components/Display';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    axios.get("http://localhost:8000/items")
      .then(res => setItems(res.data))
      .catch(err => console.log("Axios error", err));
  }, []);

  // Callback to add new item to the list
  const handleItemAdded = (newItem) => {
    setItems(prev => [...prev, newItem]); // Add new item to the list
  };

  return (
    <div>
      <h1>FastAPI + React Items</h1>
      <Add onItemAdded={handleItemAdded} />
      <Display items={items} />
    </div>
  );
};

export default App;
