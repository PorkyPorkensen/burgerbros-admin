import { logOut } from "../services/authService";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function Dashboard() {
  const navigate = useNavigate();


  return (
    <div className="adminHead">
    <AdminHeader />
    <h2 className="subHead">What would you like to do?</h2>
    <div className="btnDiv">
      <button onClick={() => navigate("/add")}>Add New Item</button>
      <button onClick={() => navigate("/edit")}>Edit an Item</button>
      <button onClick={() => navigate("/admin")}>Manage Users</button>
    </div>
    </div>
  );
}