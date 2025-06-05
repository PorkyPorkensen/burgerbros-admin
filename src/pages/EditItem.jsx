import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import AdminHeader from "../components/AdminHeader";

export default function EditItem() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", url: "" });

  useEffect(() => {
    const fetchData = async () => {
      const collections = ["burgers", "others"];
      const allItems = [];

      for (const col of collections) {
        const snapshot = await getDocs(collection(db, col));
        snapshot.forEach((docSnap) => {
          allItems.push({ ...docSnap.data(), id: docSnap.id, collection: col });
        });
      }

      setItems(allItems);
    };

    fetchData();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      url: item.url,
    });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (item) => {
    const ref = doc(db, item.collection, item.id);
    await updateDoc(ref, form);
    alert("Item updated!");
    setEditingId(null);
    window.location.reload(); // Refresh to show updated values
  };

  const handleDelete = async (item) => {
    const ref = doc(db, item.collection, item.id);
    await deleteDoc(ref);
    alert("Item deleted!");
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <div>
      <AdminHeader />
      <h2 className="subHead">Edit or Remove Items</h2>
      <div className="itemContainer">
      {items.map((item) => (
        <div key={item.id} className="itemDiv">
          {editingId === item.id ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} />
              <input name="price" value={form.price} onChange={handleChange} />
              <input name="description" value={form.description} onChange={handleChange} />
              <input name="url" value={form.url} onChange={handleChange} />
              <button onClick={() => handleSave(item)}>Save</button>
            </>
          ) : (
            <>
            <div className="itemInfo">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <img src={item.url} alt={item.name} style={{ width: "150px" }} />
            </div>
              <br />
              <div className="itemBtns">
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}