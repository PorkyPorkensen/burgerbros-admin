import { use, useState } from "react";
import { logIn, signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = isNew
        ? await signUp(email, password)
        : await logIn(email, password);

      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      const isAdmin = userDoc.exists() && userDoc.data().isAdmin;

      navigate(isAdmin ? "/dashboard" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className='loginDiv' onSubmit={handleSubmit}>
      <h2>{isNew ? "Sign Up" : "Log In"}</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isNew ? "Create Account" : "Log In"}</button>
      <p onClick={() => setIsNew(!isNew)} style={{ cursor: "pointer" }}>
        {isNew ? "Already have an account?" : "New user? Sign up"}
      </p>
    </form>
  );
}