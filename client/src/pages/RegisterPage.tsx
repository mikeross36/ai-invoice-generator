import { useState, useRef } from "react";
import { useActionState } from "react";
import { registerUser } from "@/actions";
import { ERoutes } from "@/@types";
import toast from "react-hot-toast";
import { FileCode2, User, Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";

const RegisterPage = () => {
  const [formState, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Please accept the terms and conditions!");
      return;
    }
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formAction(formData);
      formRef.current.reset();
    }
  };

  const isLoading = isPending;

  if (formState?.error) {
    console.error("Error while registering:", formState?.error);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 rounded-md mx-auto mb-6">
            <FileCode2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-600 mb-2">
              Create an Account
            </h2>
            <p className="text-slate-500 text-medium">
              Welcome to AI Invoice Generator
            </p>
          </div>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute w-5 h-5 top-1/4 transform -translate-y-1/2 right-3 text-slate-400 z-1" />
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                User Name
              </legend>
              <input
                type="text"
                name="username"
                className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="username.."
              />
            </fieldset>
          </div>
          <div className="relative">
            <Mail className="absolute w-5 h-5 top-1/4 transform -translate-y-1/2 right-3 text-slate-400 z-1" />
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                Email
              </legend>
              <input
                type="text"
                name="email"
                className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="your email.."
              />
            </fieldset>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="w-5 h-5 absolute top-1/4 transform -translate-y-1/2 right-3 text-slate-400 z-1
              hover:text-slate-600 transition-color duration-300 ease-in-out cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                Password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="your password.."
              />
            </fieldset>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="w-5 h-5 absolute top-1/4 transform -translate-y-1/2 right-3 text-slate-400 z-1
              hover:text-slate-600 transition-color duration-300 ease-in-out cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                Confirm Password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="confirm password.."
              />
            </fieldset>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-md bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white mt-2"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
            <fieldset className="fieldset bg-white rounded-box w-44 p-1">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                Terms & Conditions
              </legend>
              <label className="label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="checkbox w-6 h-6 text-slate-700 border-slate-300 rounded bg-slate-50 mr-2"
                />
                I agree to the{" "}
                <Link
                  to={ERoutes.TERMS}
                  className="text-slate-600 font-medium hover:underline transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </label>
            </fieldset>
          </div>
          {formState?.error && (
            <p className="text-red-500 text-sm">{formState?.error}</p>
          )}
          <div className="mt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to={ERoutes.LOGIN}
                className="text-slate-700 font-medium hover:underline transition-colors duration-300"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
