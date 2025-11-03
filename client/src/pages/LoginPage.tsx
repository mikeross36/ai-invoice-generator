import { useState } from "react";
import { useActionState } from "react";
import { loginUser } from "@/actions";
import Loader from "@/components/Loader";
import { FileCode2, Mail, Eye, EyeOff } from "lucide-react";
import { ERoutes } from "@/@types";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formState, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isLoading = isPending;

  if (isLoading) return <Loader />;

  if (formState?.error) {
    console.error("Error while logging in:", formState?.error);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 rounded-md mx-auto mb-6">
            <FileCode2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-600 mb-2">
              Login to your account
            </h2>
            <p className="text-slate-500 text-medium">Welcome back</p>
          </div>
        </div>
        <form action={formAction} className="space-y-4">
          <div className="relative">
            <Mail className="absolute w-5 h-5 top-1/4 transform -translate-y-1/2 right-3 text-slate-400 z-1" />
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600">
                Email
              </legend>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
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
                id="password"
                autoComplete="off"
                className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="your password.."
              />
            </fieldset>
          </div>
          {formState?.error && (
            <p className="text-red-500 text-sm">{formState?.error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-md w-full bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white mt-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="mt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to={ERoutes.REGISTER}
                className="text-slate-700 font-medium hover:underline transition-colors duration-300"
              >
                Register
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
