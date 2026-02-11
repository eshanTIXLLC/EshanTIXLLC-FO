"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { postData } from "@/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useCookies } from "next-client-cookies";
import { Mail, KeyRound, Shield } from "lucide-react";

const LoginForm = () => {
  const cookies = useCookies();

  const [loading, setLoading] = useState<boolean>(false);
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [timer, setTimer] = useState<number>(30);

  type FormData = {
    email: string;
    otp?: string;
  };

  const schema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    otp: showOtpScreen ? yup.string().required().label("OTP") : yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  useEffect(() => {
    if (timer < 1) setTimer(0);
  }, [timer]);

  useEffect(() => {
    let interval: any;
    if (showOtpScreen && timer < 31) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpScreen, timer]);

  const formatMessage = (msg: any) => {
    if (!msg) return "";
    return typeof msg === "string" ? msg : JSON.stringify(msg);
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setToastMessage("");

    try {
      const createAccount = await postData(`/auth/send-login-otp`, {
        email: data?.email,
      });

      if (!createAccount?.success) {
        setToastType("error");
        setToastMessage(formatMessage(createAccount?.message || "OTP sending failed. Try again."));
        console.log(createAccount?.message);
        return;
      }

      setToastType("success");
      setToastMessage(formatMessage(createAccount?.message));
      console.log({ createAccount });
      setShowOtpScreen(true);
      setTimer(30);
    } catch (error) {
      setToastType("error");
      setToastMessage(formatMessage(error) || "Internal Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onSubmitOtp = handleSubmit(async (data) => {
    setLoading(true);
    setToastMessage("");

    try {
      const createAccount = await postData(`/auth/login-with-otp`, {
        email: data?.email,
        otp: Number(data?.otp),
      });

      if (!createAccount?.success) {
        setToastType("error");
        setToastMessage(formatMessage(createAccount?.message || "Login failed. Try again."));
        console.log(createAccount?.message);
        return;
      }

      setToastType("success");
      setToastMessage(formatMessage(createAccount?.message));
      console.log({ createAccount });

      const { accessToken, ...otherinfo } = createAccount?.data;
      cookies.set("token", accessToken, { path: "/" });
      cookies.set("userinfo", JSON.stringify(otherinfo), { path: "/" });

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1000);
    } catch (error) {
      setToastType("error");
      setToastMessage(formatMessage(error) || "Internal Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>{showOtpScreen ? "Verify OTP" : "Welcome Back"}</h1>
            <p>{showOtpScreen ? "Enter the OTP sent to your email" : "Sign in to continue shopping"}</p>
          </div>

          <form onSubmit={!showOtpScreen ? onSubmit : onSubmitOtp} className="login-form">
            {toastMessage && <div className={`toast-message ${toastType}`}>{toastMessage}</div>}

            <div className="input-group">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="your.email@example.com"
                disabled={showOtpScreen}
                className={errors.email ? "error" : ""}
              />
              <ErrorMsg msg={errors.email?.message!} />
            </div>

            {showOtpScreen && (
              <div className="input-group">
                <label htmlFor="otp">
                  <Shield size={18} />
                  One-Time Password <span className="required">*</span>
                </label>
                <input
                  id="otp"
                  {...register("otp")}
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className={errors.otp ? "error" : ""}
                />
                <ErrorMsg msg={errors.otp?.message!} />
              </div>
            )}

            {showOtpScreen && timer < 31 && (
              <div className="resend-section">
                <p>
                  Didn't receive the code?{" "}
                  <span
                    className={`resend-link ${timer > 0 || loading ? "disabled" : ""}`}
                    onClick={() => (timer > 0 || loading ? {} : onSubmit())}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : loading ? "Sending..." : "Resend OTP"}
                  </span>
                </p>
              </div>
            )}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {showOtpScreen ? "Verifying..." : "Sending OTP..."}
                </>
              ) : showOtpScreen ? (
                <>
                  <KeyRound size={18} />
                  Verify & Login
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send OTP
                </>
              )}
            </button>

            <div className="divider">
              <span>Don't have an account?</span>
            </div>

            <Link href="/register" className="register-link">
              Create Account
            </Link>
          </form>
        </div>
      </div>
        <style jsx>{`
        .login-container {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #ffffff;
        }

        .login-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(62, 39, 35, 0.08);
          overflow: hidden;
          border: 1px solid #f0e8e0;
        }

        .login-header {
          background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
          padding: 40px 32px;
          text-align: center;
          color: #ffffff;
        }

        .login-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.5px;
        }

        .login-header p {
          font-size: 15px;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Poppins', sans-serif;
        }

        .login-form {
          padding: 40px 32px;
          background: #ffffff;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #5d4037;
          margin-bottom: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .required {
          color: #d32f2f;
          font-weight: 700;
        }

        .input-group input {
          width: 100%;
          padding: 13px 16px;
          font-size: 14.5px;
          border: 1.5px solid #e0d5cc;
          border-radius: 10px;
          background: #fafafa;
          color: #3e2723;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          border-color: #5d4037;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(93, 64, 55, 0.08);
        }

        .input-group input:disabled {
          background: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }

        .input-group input.error {
          border-color: #d32f2f;
          background: #fff5f5;
        }

        .input-group input::placeholder {
          color: #a1887f;
        }

        .resend-section {
          margin-bottom: 24px;
          padding: 12px 16px;
          background: #faf8f6;
          border-radius: 10px;
          border: 1px solid #f0e8e0;
        }

        .resend-section p {
          font-size: 13px;
          color: #5d4037;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .resend-link {
          color: #5d4037;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          transition: all 0.2s ease;
        }

        .resend-link:hover:not(.disabled) {
          color: #3e2723;
        }

        .resend-link.disabled {
          color: #a1887f;
          cursor: not-allowed;
          text-decoration: none;
        }

        .toast-message {
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 13.5px;
          font-weight: 500;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          animation: slideIn 0.3s ease;
        }

        .toast-message.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        }

        .toast-message.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #ef9a9a;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .submit-btn {
          width: 100%;
          padding: 15px 24px;
          font-size: 15.5px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.3px;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #2e1b17 0%, #4e342e 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(62, 39, 35, 0.25);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 17px;
          height: 17px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .divider {
          text-align: center;
          margin: 28px 0 20px 0;
          position: relative;
        }

        .divider::before,
        .divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 32%;
          height: 1px;
          background: #e0d5cc;
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .divider span {
          background: #ffffff;
          padding: 0 14px;
          font-size: 13px;
          color: #795548;
          font-family: 'Poppins', sans-serif;
        }

        .register-link {
          display: block;
          width: 100%;
          padding: 13px 24px;
          font-size: 14.5px;
          font-weight: 600;
          color: #5d4037;
          background: transparent;
          border: 1.5px solid #5d4037;
          border-radius: 10px;
          text-align: center;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        .register-link:hover {
          background: #5d4037;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(93, 64, 55, 0.2);
        }

        .register-link:active {
          transform: translateY(0);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .login-container {
            padding: 40px 16px;
          }

          .login-card {
            border-radius: 16px;
          }

          .login-header {
            padding: 32px 24px;
          }

          .login-header h1 {
            font-size: 24px;
          }

          .login-header p {
            font-size: 14px;
          }

          .login-form {
            padding: 32px 24px;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-group label {
            font-size: 13px;
          }

          .input-group input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .submit-btn {
            padding: 14px 20px;
            font-size: 15px;
          }

          .register-link {
            padding: 12px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 30px 12px;
          }

          .login-header {
            padding: 28px 20px;
          }

          .login-header h1 {
            font-size: 22px;
          }

          .login-header p {
            font-size: 13px;
          }

          .login-form {
            padding: 28px 20px;
          }

          .input-group input {
            padding: 11px 13px;
            font-size: 13.5px;
          }

          .divider::before,
          .divider::after {
            width: 28%;
          }
        }
      `}</style>
    </>
  );
};

export default LoginForm;
