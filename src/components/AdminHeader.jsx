import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";

export default function AdminHeader(){
    const navigate = useNavigate();
    async function handleLogout(){
        try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    }
    return (
        <div className="linkDiv">
            <nav>
            <Link to="/dashboard">Dashboard</Link> |{" "}       
            <Link to="/admin">Manage Users</Link> |{" "}
            <Link to="/add">Add Item</Link> |{" "}
            <Link to="/edit">Edit Item</Link>{" "}
            <button onClick={handleLogout}>Logout</button>
            </nav>
      </div>
    )
}