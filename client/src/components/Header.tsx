import { Link as LinkScroll } from "react-scroll";
import { FileCode2 } from "lucide-react";
import { useAuthUser } from "@/hooks/queries";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "@/@types";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-amber-100
        backdrop-blur-sm shadow-lg border-b border-slate-200"
    >
      <div className="drawer max-w-7xl mx-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-amber-100">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">
              <LinkScroll to="home" smooth={true}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md">
                    <FileCode2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-slate-00">
                    PDF AI Invoce Generator
                  </span>
                </div>
              </LinkScroll>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                <div className="flex items-center space-x-4">
                  {authUser ? (
                    <ProfileDropdown
                      avatar={authUser?.avatarUrl}
                      companyName={authUser?.username}
                      email={authUser?.email}
                    />
                  ) : (
                    <>
                      <Link
                        to={ERoutes.LOGIN}
                        className="text-slate-600 text-lg hover:text-slate-800 font-bold transition-colors 
                      duration-200 cursor-pointer capitalize"
                      >
                        login
                      </Link>
                      <Link
                        to={ERoutes.REGISTER}
                        role="button"
                        className="btn btn-sm btn-primary bg-emerald-600 hover:bg-emerald-800 rounded-md 
                        transition-colors duration-200 capitalize"
                      >
                        register
                      </Link>
                    </>
                  )}
                </div>
                <li>
                  <LinkScroll
                    to="features"
                    smooth={true}
                    className="text-slate-600 text-lg hover:text-slate-800 font-bold
                      transition-colors duration-200 cursor-pointer"
                  >
                    Features
                  </LinkScroll>
                </li>
                <li>
                  <LinkScroll
                    to="testimonials"
                    smooth={true}
                    className="text-slate-600 text-lg hover:text-slate-800 font-bold
                      transition-colors duration-200 cursor-pointer"
                  >
                    Testimonials
                  </LinkScroll>
                </li>
                <li>
                  <LinkScroll
                    to="faq"
                    smooth={true}
                    className="text-slate-600 text-lg hover:text-slate-800 font-bold
                      transition-colors duration-200 cursor-pointer"
                  >
                    FAQ
                  </LinkScroll>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-72 min-h-full bg-amber-100">
            <LinkScroll
              to="features"
              smooth={true}
              className="block px-4 py-2 text-lg text-slate-600 hover:text-slate-800 hover:bg-amber-200 font-bold
              transition-colors duration-200 cursor-pointer capitalize"
            >
              features
            </LinkScroll>
            <LinkScroll
              to="testimonials"
              smooth={true}
              className="block px-4 py-2 text-lg text-slate-600 hover:text-slate-800 hover:bg-amber-200 font-bold
              transition-colors duration-200 cursor-pointer capitalize"
            >
              testimonials
            </LinkScroll>
            <LinkScroll
              to="faq"
              smooth={true}
              className="block px-4 py-2 text-lg text-slate-600 hover:text-slate-800 hover:bg-amber-200 font-bold
              transition-colors duration-200 cursor-pointer capitalize"
            >
              FAQ
            </LinkScroll>
            {authUser ? (
              <div className="flex flex-col items-start p-4 justify-around active:bg-amber-100">
                <button
                  onClick={() => navigate(ERoutes.DASHBOARD)}
                  className="btn btn-sm btn-primary bg-emerald-600 hover:bg-emerald-800 
                    rounded-md transition-colors duration-200 capitalize"
                >
                  Go to Dashboard
                </button>
                <div className="-ml-5 mt-4">
                  <ProfileDropdown
                    avatar={authUser?.avatarUrl}
                    companyName={authUser.username}
                    email={authUser.email}
                  />
                </div>
              </div>
            ) : (
              <>
                <Link
                  to={ERoutes.LOGIN}
                  className="block px-4 py-2 text-lg text-slate-600 hover:text-slate-800 hover:bg-amber-200
                    font-bold transition-colors duration-200 cursor-pointer capitalize"
                >
                  login
                </Link>
                <Link
                  to={ERoutes.REGISTER}
                  className="block px-4 py-3 mt-3 text-white font-bold bg-emerald-600 hover:bg-emerald-800 rounded-md 
                    transition-colors duration-200 capitalize"
                >
                  register
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
