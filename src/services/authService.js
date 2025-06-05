import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase"; // ← Make sure db is imported
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Create a document for this user in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    isAdmin: false // default false — set manually in Firestore console later
  });

  return userCredential;
};

export const logIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return await signOut(auth);
};