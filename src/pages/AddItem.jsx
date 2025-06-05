import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import AdminHeader from "../components/AdminHeader";

export default function AddItem() {
  const [form, setForm] = useState({ name: "", price: "", description: "", url: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addDoc(collection(db, "burgers"), form);
    alert("Burger added!");
  };

    const handleSubmit2 = async e => {
    e.preventDefault();
    await addDoc(collection(db, "other"), form);
    alert("Item Added!");
  };

  return (
    <div>
    <AdminHeader />
    <br />
    <form className='itemForm'onSubmit={handleSubmit}>
      <h2>Add a Burger</h2>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input name="description" onChange={handleChange} placeholder="Description" />
      <input name="url" onChange={handleChange} placeholder="image url" />
      
      
      <button type="submit">Add Burger</button>
    </form>
    <br />
      <form className='itemForm'onSubmit={handleSubmit2}>
      <h2>Add a different Item</h2>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input name="description" onChange={handleChange} placeholder="Description" />
      <input name="url" onChange={handleChange} placeholder="image url" />
      
      
      <button type="submit">Add Other Item</button>
    </form>
    </div>
  );
}