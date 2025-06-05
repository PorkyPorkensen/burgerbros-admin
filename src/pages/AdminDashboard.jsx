import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import AdminHeader from "../components/AdminHeader";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const toggleAdmin = async (userId, currentStatus) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isAdmin: !currentStatus });

    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, isAdmin: !currentStatus } : user
      )
    );
  };

  return (
    <div className="adminHead">
      <AdminHeader />
      <h2 className="subHead">Admin Dashboard</h2>
    <div className="adminMain">
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "✅" : "❌"}</td>
                <td>
                  <button onClick={() => toggleAdmin(u.id, u.isAdmin)}>
                    {u.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}