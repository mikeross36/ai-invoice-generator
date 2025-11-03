import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FileCode2, LogOut, X, Menu } from "lucide-react";
import { MENU_ITEMS } from "@/utils/data";
import { ERoutes } from "@/@types";
import { useLogoutUser } from "@/hooks/mutations";
import { useAuthUser } from "@/hooks/queries";
import NavItem from "./NavItem";
import ProfileDropdown from "@/components/ProfileDropdown";

type PropsType = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: PropsType) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const location = useLocation();
  const navigate = useNavigate();
  const { logoutMutation } = useLogoutUser();
  const { authUser } = useAuthUser();

  // Sync active menu item with current route
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setActiveMenuItem(path || "dashboard");
  }, [location]);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavMenu = (itemId?: string): void => {
    if (!itemId) {
      console.warn("Item id is required");
      return;
    }
    navigate(`/${itemId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const sidebarClosed = isMobile && false;

  return (
    <div className="flex h-screen w-full overflow-auto bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out 
          transform bg-slate-50 border border-gray-200 
          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          } ${sidebarClosed ? "w-16" : "w-64"}`}
      >
        <div className="flex items-center h-16 px-6 bg-amber-100 border-b border-gray-200">
          <Link to={ERoutes.HOME} className="flex items-center space-x-3">
            <span className="w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md">
              <FileCode2 className="w-4 h-4 text-white" />
            </span>
            {!sidebarClosed && (
              <span className="text-slate-600 font-bold">
                PDF AI Invoice Generator
              </span>
            )}
          </Link>
        </div>
        <nav className="p-4 space-y-4">
          {MENU_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActiveItem={activeMenuItem === item.id}
              onItemClick={() => handleNavMenu(item.id)}
              sidebarClosed={sidebarClosed}
            >
              {<item.icon />}
              {!sidebarClosed && <span className="ml-3">{item.name}</span>}
            </NavItem>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => logoutMutation()}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg 
            transition-all ease-in-out duration-200 cursor-pointer text-slate-600 hover:bg-emerald-100
            hover:text-slate-800"
          >
            <LogOut className="w-6 h-6 flex-shrink-0 text-emerald-600 text-bold" />
            {!sidebarClosed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 cursor-pointer"
        ></div>
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
        ${isMobile ? "ml-0" : sidebarClosed ? "ml-16" : "ml-64"} `}
      >
        <header
          className="flex items-center justify-between px-2 lg:px-12 py-2 sticky top-0 z-30 bg-amber-100
        backdrop-blur-sm border-b border-slate-200"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-xl hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
              >
                {sidebarOpen ? (
                  <X className="w-8 h-8 text-slate-600 font-extrabold" />
                ) : (
                  <Menu
                    strokeWidth={3}
                    className="w-6 h-6 text-slate-600 font-extrabold"
                  />
                )}
              </button>
            )}
            <div>
              <p className="text-xs sm:text-sm md:text-lg font-semibold text-slate-600">
                Welcome, {authUser.username.split(" ")[0]}
              </p>
              <p className="text-sm text-slate-600 hidden sm:block">
                Here is your invoice overview
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ProfileDropdown
              avatar={authUser?.avatar}
              companyName={authUser?.username || ""}
              email={authUser?.email || ""}
            />
          </div>
        </header>
        <main className="flex-1 py-6 px-4 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
