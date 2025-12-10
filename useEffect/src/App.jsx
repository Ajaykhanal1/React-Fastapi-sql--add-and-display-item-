import React, { useState, useEffect } from 'react';
import Add from './components/Add';
import Display from './components/Display';
import axios from 'axios';
import Update from './components/Update';
import Delete from './components/Delete';

const App = () => {
  const [items, setItems] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    axios.get("http://localhost:8000/items")
      .then(res => setItems(res.data.sort((a,b)=>a.id -b.id)))
      .catch(err => console.log("Axios error", err));
  }, []);

  // Callback to add new item to the list
  const handleItemAdded = (newItem) => {
    setItems(prev => [...prev, newItem]); // Add new item to the list
  };

  const handleItemUpdated =(updatedItem) =>{
    setItems( (prev)=>
      prev.map( (item)=>
        item.id===updatedItem.id ? updatedItem : item
      )

    );
  };

  const handleItemDeleted =(deletedId) =>{
    setItems( (prev) => prev.filter(item =>
      item.id !== Number(deletedId)
    )

    )
  }

  return (
    <div>
      <h1>FastAPI + React Items</h1>
      <Add onItemAdded={handleItemAdded} />
      <Update onItemUpdated={handleItemUpdated} />
      <Delete onItemDeleted={handleItemDeleted} />
      <Display items={items} />
    </div>
  );
};

export default App;
