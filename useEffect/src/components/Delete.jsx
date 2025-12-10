import { useState } from "react";
import axios from "axios";

const Delete = ({onItemDeleted })=>{
    const [id,setId]= useState("");

    const handleDelete= async (e) => {
        e.preventDefault();
        if (!id) return;
        try{
            await axios.delete(`http://localhost:8000/items/${id}`);
            onItemDeleted(id);
            setId("");
        } catch (error){
            console.error("Error deleting item.",error);
        }
    };

    return (
        <div>
            <h2>Deleted Item</h2>
            <form action="" onSubmit={handleDelete}>
                <input 
                type="number"
                value={id}
                onChange={(e)=>setId(e.target.value)}
                placeholder="Enter item ID"
                required />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
};


export default Delete;