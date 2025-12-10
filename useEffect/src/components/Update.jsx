import { useState } from "react";
import axios from "axios";

const Update =({onItemUpdated}) =>{
    const [id,setId]= useState("");
    const [name,setName]= useState("");
    const handleUpdate = async(e)=>{
        e.preventDefault();
        if(!id || !name) return;
        try{
            const response = await axios.put(`http://localhost:8000/items/${id}`,{name});
            setId("");
            setName("");
            onItemUpdated(response.data);
        } catch(error){
            console.error("Error updating item:",error);
        }
    };


    return (
        <div>
            <h2>Update Item</h2>
            <form action="" onSubmit={handleUpdate}>
                <input
                type="number"
                value={id}
                onChange={(e)=>setId(e.target.value)}
                placeholder="Enter item ID"
                required />
                <input type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter new name"
                required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;