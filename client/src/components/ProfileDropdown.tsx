import { Link } from "react-router-dom";
import { ERoutes } from "@/@types";
import { useLogoutUser } from "@/hooks/mutations";

type PropsType = {
  avatar?: string;
  companyName: string;
  email: string;
};

const ProfileDropdown = ({ avatar, companyName, email }: PropsType) => {
  const { logoutMutation } = useLogoutUser();

  return (
    <div className="relative bg-amber-100">
      {/* Profile dropdown content here */}
      <div className="dropdown dropdown-bottom">
        <label
          onClick={(e) => e.stopPropagation()}
          tabIndex={0}
          role="button"
          className="btn btn-ghost m-1 hover:bg-amber-100 active:bg-amber-100 border-0 shadow-none"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-9 h-9 object-cover rounded-xl"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-xl">
              <span className="text-sm text-white font-semibold">
                {companyName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="block text-left">
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              {companyName}
            </p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-sm bg-amber-100 rounded-box w-52 z-1"
        >
          <li>
            <Link
              to={ERoutes.PROFILE}
              className="block px-4 py-2 text-sm text-slate-600 font-semibold
           hover:bg-amber-200 transition-colors duration-200 cursor-pointer capitalize"
            >
              view profile
            </Link>
          </li>
          <li>
            <a
              href="#"
              onClick={() => logoutMutation()}
              className="block px-4 py-2 text-sm text-red-600 font-semibold
            hover:bg-amber-200 transition-color duration-200 cursor-pointer capitalize"
            >
              logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
