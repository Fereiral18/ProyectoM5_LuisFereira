import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { FirebaseError } from "firebase/app";

import { auth, db } from "../config/firebase";
import type { AuthUser } from "../types/auth.type";

// ========================= LOGIN =========================
export const loginService = async (email: string, password: string) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          throw new Error("El usuario no existe");

        case "auth/wrong-password":
          throw new Error("La contraseña es incorrecta");

        case "auth/invalid-email":
          throw new Error("El email no es válido");

        case "auth/too-many-requests":
          throw new Error("Demasiados intentos fallidos. Intenta más tarde");
        case "auth/invalid-credential":
        case "auth/invalid-login-credentials":
          throw new Error("Email o contraseña incorrectos");

        default:
          throw new Error("Error al iniciar sesión");
      }
    }

    throw new Error("Error inesperado");
  }
};

// ========================= SIGNUP =========================
export const signupService = async (email: string, password: string) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    //* Guardamos el Rol en Firebase
    const uid = credentials.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      role: "customer",
    });

    return credentials.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("El email ya está registrado");

        case "auth/weak-password":
          throw new Error("La contraseña debe tener al menos 6 caracteres");

        case "auth/invalid-email":
          throw new Error("El email no es válido");

        default:
          throw new Error("Error al registrar usuario");
      }
    }

    throw new Error("Error inesperado");
  }
};

// ========================= LOGOUT =========================
export const logoutService = async () => {
  try {
    await signOut(auth);
  } catch {
    throw new Error("Error al cerrar sesión");
  }
};

// ========================= PROFILE =========================
export const getUserProfile = async (uid: string): Promise<AuthUser | null> => {
  try {
    const snapshot = await getDoc(doc(db, "users", uid));

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return {
      uid,
      email: data.email,
      role: data.role,
    };
  } catch {
    throw new Error("Error al obtener el perfil del usuario");
  }
};