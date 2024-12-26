import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthSide from "../ui/AuthSide";
import toast from "react-hot-toast";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const { isSigningUp, signup } = useAuthStore();
  function validateForm() {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 characters");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  }

  return (
    <div className="flex-grow grid lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center gap-2">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
                >
                  <User className="size-6 text-primary" />
                </div>
                <h1 className="text-primary font-bold text-2xl">Yap!</h1>
              </div>
              <div>
                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                <p className="text-base-content/60">
                  Get started with your free account on Yap
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, email: e.target.value }))
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, fullName: e.target.value }))
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, password: e.target.value }))
                }
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((showPassowrd) => !showPassowrd)}
              >
                {!showPassword ? (
                  <Eye className="opacity-70" />
                ) : (
                  <EyeOff className="opacity-70" />
                )}
              </span>
            </label>
            <button
              className="btn btn-primary w-full no-animation"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  Creating{" "}
                  <span className="loading loading-dots loading-sm"></span>{" "}
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <div className="w-full text-center">
              Already have an account?{" "}
              <Link className="link link-primary" to="/login">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <AuthSide
        title={"Start Yapping Today!"}
        subtitle={
          "Yap makes conversations effortless and fun. Whether with friends, family, or teammates, stay connected anytime, anywhere."
        }
      />
    </div>
  );
}

export default SignupPage;
