import { useState } from "react";
import type { AuthErrors } from "../types/authErrors.type";

export const useAuthValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors:AuthErrors = {};

    const email = values.email || "";
    const password = values.password || "";

    // 🔥 EMAIL @gmail.com obligatorio
    if (email && !email.endsWith("@gmail.com")) {
      newErrors.email = "El email debe ser @gmail.com";
    }

    // 🔥 PASSWORD mínimo 6 caracteres
    if (password && password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    // 🔥 MAYÚSCULA
    if (password && !/[A-Z]/.test(password)) {
      newErrors.password =
        "Debe contener al menos una mayúscula";
    }

    // 🔥 CARÁCTER ESPECIAL
    if (
      password &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password =
        "Debe contener un carácter especial";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validate,
    clearErrors
  };
};