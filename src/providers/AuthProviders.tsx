import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../config/firebase";

import {
  getUserProfile,
  loginService,
  logoutService,
  signupService,
} from "../services/auth.service";

import type { AuthUser } from "../types/auth.type";
import { AuthContext } from "../context/auth.context";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Listener Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const profile = await getUserProfile(firebaseUser.uid);

        setUser(
          profile ?? {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.email?.split("@")[0],
            role: "customer",
          }
        );
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // 🔑 LOGIN
  const login = async (email: string, password: string) => {
    const firebaseUser = await loginService(email, password);

    const profile = await getUserProfile(firebaseUser.uid);

    setUser(
      profile ?? {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: email.split("@")[0],
        role: "customer",
      }
    );
  };

  // 📝 SIGNUP (REGISTER)
  const register = async (email: string, password: string) => {
    const firebaseUser = await signupService(email, password);

    const profile = await getUserProfile(firebaseUser.uid);

    setUser(
      profile ?? {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: email.split("@")[0],
        role: "customer",
      }
    );
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};