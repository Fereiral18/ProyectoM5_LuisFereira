import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

import { getUserProfile, loginService, logoutService, signupService } from "../services/auth.service";
import type { AuthUser } from "../types/auth.type";
import { AuthContext } from "../context/auth.context";


interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  //* 1. ESTADOS:
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    console.log("firebaseUser", firebaseUser);

    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

   const profile = await getUserProfile(firebaseUser.uid);

if (profile) {
  setUser(profile);
} else {
  setUser({
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    role: "customer",
  });
}
    setLoading(false);
  });

  return unsubscribe;
}, []);

  //* firebaseUser: { uid, email, password } | null

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        login: loginService,
        signup: signupService,
        logout: logoutService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};