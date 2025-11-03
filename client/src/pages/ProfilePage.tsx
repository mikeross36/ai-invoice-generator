import { useState } from "react";
import { useAuthUser } from "@/hooks/queries";
import type { ProfileDataType } from "@/@types";
import { useUpdateUserProfile } from "@/hooks/mutations";
import Loader from "@/components/Loader";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const [profileData, setProfileData] = useState<ProfileDataType>({
    username: authUser?.username || "",
    email: authUser?.email || "",
    businessName: authUser?.businessName || "",
    address: authUser?.address || "",
    phoneNumber: authUser?.phoneNumber || "",
  });
  const { updateProfileMutation, isUpdateProfileLoading, updateProfileError } =
    useUpdateUserProfile();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!profileData) {
        throw new Error("Please fill in all the fields!");
      }
      updateProfileMutation(profileData);
    } catch (err) {
      console.error("Error updating user profile:", err);
    }
  };

  if (isUpdateProfileLoading) return <Loader />;

  return (
    <div
      className="bg-gray-50 border border-slate-300 rounded-lg shadow-sm 
    overflow-hidden p-4 max-w-3xl mx-auto"
    >
      <div className="px-6 py-4 border-b border-slate-300 bg-gray-50">
        <h3 className="text-2xl font-semibold text-slate-600 mb-2">Profile</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-4 py-4 my-4">
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium text-gray-600">
              User Name
            </legend>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              className="input bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
              placeholder="your username.."
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium text-gray-600">
              Email
            </legend>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="input bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
              placeholder="your email.."
            />
          </fieldset>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-600 capitalize">
            business information
          </h4>
          <p className="text-slate-600 text-medium text-sm">
            This will be used to pre-fill the "Bill From" section.
          </p>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium text-gray-700">
              Business Name
            </legend>
            <input
              type="text"
              name="businessName"
              value={profileData.businessName}
              onChange={handleInputChange}
              className="input bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
              placeholder="your business name.."
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset lg:col-span-3">
            <legend className="fieldset-legend text-sm font-medium text-gray-700">
              Address
            </legend>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="textarea  bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
              placeholder="address.."
            ></textarea>
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium text-gray-700">
              Phone Number
            </legend>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              className="input bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
              placeholder="your phone number.."
            />
          </fieldset>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isUpdateProfileLoading}
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white mt-2"
          >
            {isUpdateProfileLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
        {updateProfileError && (
          <p className="text-red-500 text-sm">{updateProfileError.message}</p>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
