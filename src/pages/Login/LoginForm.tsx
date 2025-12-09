import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./LoginForm.css";

const loginSchema = z.object({
  email: z.string().email("Email phải đúng định dạng"),
  password: z.string().min(6, "Password tối thiểu 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Login always succeeds
      console.log("Login successful:", data);

      // Store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email);

      // Redirect to home
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setLoginError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Đăng Nhập</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email..."
            {...register("email")}
            className="form-input"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Nhập password..."
            {...register("password")}
            className="form-input"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        {loginError && (
          <div className="error-message" style={{ textAlign: "center" }}>
            {loginError}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isLoggingIn}
          className="submit-button"
        >
          {isLoggingIn ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>
    </div>
  );
};
