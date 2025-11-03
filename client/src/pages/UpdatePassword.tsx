import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { UpdatePasswordDataType } from "@/@types";
import toast from "react-hot-toast";
import { useUpdateUserPassword } from "@/hooks/mutations";
import { ERoutes } from "@/@types";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

const UpdatePassword = () => {
  const [updatePasswordData, setUpdatePasswordData] =
    useState<UpdatePasswordDataType>({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  const [showPassword, setShowPassword] = useState(false);

  const {
    updatePasswordMutation,
    isUpdatePasswordLoading,
    updatePasswordError,
  } = useUpdateUserPassword();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatePasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = updatePasswordData;
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all the fields!");
        return;
      }
      if (oldPassword.length < 8 || newPassword.length < 8) {
        toast.error("Password must be at least 6 characters long!");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      await updatePasswordMutation(updatePasswordData);
      navigate(ERoutes.LOGIN);
      setUpdatePasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Update password failed. Please try again.");
    }
  };

  if (isUpdatePasswordLoading) return <Loader />;

  return (
    <div
      className="bg-gray-50 border border-slate-300 rounded-lg shadow-sm 
    overflow-hidden p-4 max-w-3xl mx-auto"
    >
      <div className="px-6 py-4 border-b border-slate-300 bg-gray-50">
        <h3 className="text-2xl font-semibold text-slate-600 mb-2 capitalize">
          update password
        </h3>
        <form onSubmit={handleFormSubmit} className="space-y-8">
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
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                old password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                value={updatePasswordData.oldPassword}
                onChange={handleInputChange}
                className="input bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="your old password ..."
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
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                new password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={updatePasswordData.newPassword}
                onChange={handleInputChange}
                className="input bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="your new password ..."
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
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                confirm password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={updatePasswordData.confirmPassword}
                onChange={handleInputChange}
                className="input bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                placeholder="confirm password.."
              />
            </fieldset>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                disabled={isUpdatePasswordLoading}
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white"
              >
                {isUpdatePasswordLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
          {updatePasswordError && (
            <p className="text-red-500 text-sm">
              {updatePasswordError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
