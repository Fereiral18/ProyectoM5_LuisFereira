import { useState } from "react";
import { useAuthValidation } from "../../hooks/useAuthValidation";
import "./style.css"

export const AuthCard = ({
  title,
  fields,
  buttonText,
  footerText,
  footerActionText,
  onSubmit
}:{
  title: string;
  fields: any[];
  buttonText: string;
  footerText?: string;
  footerActionText?: {
    text: string;
    onClick: () => void;
  };
onSubmit: (values: any) => void}) => {
  const [values, setValues] = useState({});
  const { errors, validate } = useAuthValidation();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(values);

    if (!isValid) return;

    onSubmit?.(values);
  };

  return (
    <div className="auth-card">
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="input-group" key={field.name}>
            <label>{field.label}</label>

            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className={errors[field.name] ? "input-error" : ""}
            />

            {errors[field.name] && (
              <span className="error-text">
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}

        <button type="submit" className="auth-btn">
          {buttonText}
        </button>

        {(footerText || footerActionText) && (
          <p className="auth-footer">
            {footerText}{" "}
            <span onClick={footerActionText?.onClick}>
              {footerActionText?.text}
            </span>
          </p>
        )}
      </form>
    </div>
  );
};