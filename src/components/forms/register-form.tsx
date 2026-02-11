"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { postData } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMsg from "../common/error-msg";
import { User, Mail, Phone, MapPin, Home, Globe, Building2, Hash } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  billingAddress: string;
  country: string;
  city: string;
  postalCode?: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  phone: yup.string().required().label("Phone"),
  address: yup.string().required().label("Shipping Address"),
  billingAddress: yup.string().required().label("Billing Address"),
  country: yup.string().required().label("Country"),
  city: yup.string().required().label("City"),
  // postalCode: yup.string().label("Postal Code"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setToastMessage("");

    try {
      const createAccount = await postData(`/customer/auth/register`, {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        billingAddress: data?.billingAddress,
        country: data?.country,
        city: data?.city,
        postalCode: data?.postalCode,
        image: "https://cdn-icons-png.flaticon.com/512/9368/9368192.png",
      });

      if (!createAccount?.success) {
        setToastType("error");
        setToastMessage(
          (createAccount?.message as string) || "Something went wrong. Try again."
        );
        console.log(createAccount?.message);
        return;
      }

      setToastType("success");
      setToastMessage(createAccount?.message as string);
      console.log({ createAccount });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setToastType("error");
      setToastMessage((error as string) || "Internal Server Error");
      console.log(error as string);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          {/* Header */}
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join us and start your shopping journey</p>
          </div>

          <form onSubmit={onSubmit} className="register-form">
            {/* Personal Information Section */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="input-group">
                <label htmlFor="name">
                  <User size={18} />
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  placeholder="Enter your full name"
                  className={errors.name ? "error" : ""}
                />
                <ErrorMsg msg={errors.name?.message!} />
              </div>

              <div className="input-row">
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
                    className={errors.email ? "error" : ""}
                  />
                  <ErrorMsg msg={errors.email?.message!} />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">
                    <Phone size={18} />
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    type="text"
                    placeholder="Enter your phone number"
                    className={errors.phone ? "error" : ""}
                  />
                  <ErrorMsg msg={errors.phone?.message!} />
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="form-section">
              <h3 className="section-title">Address Details</h3>

              <div className="input-group">
                <label htmlFor="address">
                  <Home size={18} />
                  Shipping Address <span className="required">*</span>
                </label>
                <input
                  id="address"
                  {...register("address")}
                  type="text"
                  placeholder="House/Flat, Street, Area"
                  className={errors.address ? "error" : ""}
                />
                <ErrorMsg msg={errors.address?.message!} />
              </div>

              <div className="input-group">
                <label htmlFor="billingAddress">
                  <MapPin size={18} />
                  Billing Address <span className="required">*</span>
                </label>
                <input
                  id="billingAddress"
                  {...register("billingAddress")}
                  type="text"
                  placeholder="House/Flat, Street, Area"
                  className={errors.billingAddress ? "error" : ""}
                />
                <ErrorMsg msg={errors.billingAddress?.message!} />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="country">
                    <Globe size={18} />
                    Country <span className="required">*</span>
                  </label>
                  <input
                    id="country"
                    {...register("country")}
                    type="text"
                    placeholder="Enter your country"
                    className={errors.country ? "error" : ""}
                  />
                  <ErrorMsg msg={errors.country?.message!} />
                </div>

                <div className="input-group">
                  <label htmlFor="city">
                    <Building2 size={18} />
                    City <span className="required">*</span>
                  </label>
                  <input
                    id="city"
                    {...register("city")}
                    type="text"
                    placeholder="Enter your city"
                    className={errors.city ? "error" : ""}
                  />
                  <ErrorMsg msg={errors.city?.message!} />
                </div>
              </div>

              {/* <div className="input-group">
                <label htmlFor="postalCode">
                  <Hash size={18} />
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  {...register("postalCode")}
                  type="text"
                  placeholder="1200"
                />
              </div> */}
            </div>

            {/* Terms Checkbox */}
            <div className="terms-checkbox">
              <input id="remember" type="checkbox" />
              <label htmlFor="remember">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>

            {/* Toast Message */}
            {toastMessage && (
              <div className={`toast-message ${toastType}`}>
                {toastMessage}
              </div>
            )}

            {/* Submit Button */}
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>Already have an account?</span>
            </div>

            {/* Login Link */}
            <Link href="/login" className="login-link">
              Sign In Now
            </Link>
          </form>
        </div>
      </div>

      <style jsx>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: #ffffff;
        }

        .register-card {
          width: 100%;
          max-width: 850px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(62, 39, 35, 0.08);
          overflow: hidden;
          border: 1px solid #f0e8e0;
        }

        .register-header {
          background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
          padding: 40px 32px;
          text-align: center;
          color: #ffffff;
        }

        .register-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.5px;
        }

        .register-header p {
          font-size: 15px;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Poppins', sans-serif;
        }

        .register-form {
          padding: 40px 32px;
          background: #ffffff;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 17px;
          font-weight: 600;
          color: #3e2723;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #f5f1ed;
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.3px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .input-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
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

        .input-group input.error {
          border-color: #d32f2f;
          background: #fff5f5;
        }

        .input-group input::placeholder {
          color: #a1887f;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 24px;
          padding: 14px;
          background: #faf8f6;
          border-radius: 10px;
          border: 1px solid #f0e8e0;
        }

        .terms-checkbox input[type="checkbox"] {
          margin-top: 3px;
          width: 17px;
          height: 17px;
          cursor: pointer;
          accent-color: #5d4037;
          flex-shrink: 0;
        }

        .terms-checkbox label {
          font-size: 13px;
          color: #5d4037;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
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
          to { transform: rotate(360deg); }
        }

        .divider {
          text-align: center;
          margin: 28px 0 20px 0;
          position: relative;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 38%;
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

        .login-link {
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

        .login-link:hover {
          background: #5d4037;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(93, 64, 55, 0.2);
        }

        .login-link:active {
          transform: translateY(0);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .register-container {
            padding: 40px 16px;
          }

          .register-card {
            border-radius: 16px;
          }

          .register-header {
            padding: 32px 24px;
          }

          .register-header h1 {
            font-size: 24px;
          }

          .register-header p {
            font-size: 14px;
          }

          .register-form {
            padding: 32px 24px;
          }

          .form-section {
            margin-bottom: 28px;
          }

          .section-title {
            font-size: 16px;
            margin-bottom: 16px;
          }

          .input-group {
            margin-bottom: 18px;
          }

          .input-group label {
            font-size: 13px;
          }

          .input-group input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .terms-checkbox {
            padding: 12px;
          }

          .terms-checkbox label {
            font-size: 12.5px;
          }

          .submit-btn {
            padding: 14px 20px;
            font-size: 15px;
          }

          .login-link {
            padding: 12px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .register-container {
            padding: 30px 12px;
          }

          .register-header {
            padding: 28px 20px;
          }

          .register-header h1 {
            font-size: 22px;
          }

          .register-header p {
            font-size: 13px;
          }

          .register-form {
            padding: 28px 20px;
          }

          .input-group input {
            padding: 11px 13px;
            font-size: 13.5px;
          }
        }
      `}</style>
    </>
  );
};

export default RegisterForm;